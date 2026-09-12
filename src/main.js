import { App } from './App.js';
import Chart from 'chart.js/auto';

const API_BASE = 'http://localhost:5000/api';

let chartInstances = {};

let appState = {
  kpiData: {
    baselineMonthlyCO2: 100,
    monthlyCO2SavedTons: 28.8,
    co2ReductionPercentage: 28.8,
    financialSavings: { totalNetSavingsDisplay: "+₹6,50,000 / year" }
  },
  stages: [
    { name: "1. RAW MATERIAL", desc: "Virgin Polymer Resin (100T/mo)", currentMonthlyCO2: 10, sharePercentage: 10, status: "NORMAL" },
    { name: "2. FURNACE HEATING", desc: "Heavy Furnace Oil (1400°C)", currentMonthlyCO2: 48, sharePercentage: 48, status: "RED ALERT", alertPriority: "PRIORITY 1" },
    { name: "3. PROCESSING LINE", desc: "Extrusion Line Operations", currentMonthlyCO2: 25, sharePercentage: 25, status: "EVALUATE" },
    { name: "4. WASTE SCRAP", desc: "Off-cut Trim Scrap (12T/mo)", currentMonthlyCO2: 17, sharePercentage: 17, status: "RED ALERT", alertPriority: "PRIORITY 2" }
  ],
  sliderInputs: {
    fuelShiftPct: 50,
    tempReductionPct: 5,
    pcrResinPct: 20,
    scrapRecyclePct: 100
  },
  copilotData: {},
  roadmapData: []
};

// Render App & Initialize Charts
function render() {
  const root = document.getElementById('app');
  if (root) {
    root.innerHTML = App(appState);
    attachEventListeners();
    setTimeout(initCharts, 50);
  }
}

// Fetch Initial Baseline Data from Backend API with client fallback
async function init() {
  try {
    const res = await fetch(`${API_BASE}/facility/baseline`);
    if (res.ok) {
      const data = await res.json();
      if (data.data?.processStages) {
        appState.stages = data.data.processStages;
      }
    }
  } catch (e) {
    console.warn('Backend API offline, operating with client fallback state:', e);
  }
  render();
}

// Attach Tab Navigation & Interactive Slider Event Listeners
function attachEventListeners() {
  // Tab Navigation Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      e.currentTarget.classList.add('active');
      const contentEl = document.getElementById(targetTab);
      if (contentEl) {
        contentEl.classList.add('active');
        // Re-render charts when switching tabs
        setTimeout(initCharts, 50);
      }
    });
  });

  // Slider Input Event Binding
  const bindSlider = (id, badgeId, key, suffix) => {
    const el = document.getElementById(id);
    const badge = document.getElementById(badgeId);
    if (el) {
      el.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        appState.sliderInputs[key] = val;
        if (badge) badge.innerText = `${val}% ${suffix}`;
        triggerSimulationRecalculation();
      });
    }
  };

  bindSlider('slider-fuel', 'val-fuel', 'fuelShiftPct', 'Shift');
  bindSlider('slider-temp', 'val-temp', 'tempReductionPct', 'Temp Cut');
  bindSlider('slider-pcr', 'val-pcr', 'pcrResinPct', 'PCR');
  bindSlider('slider-scrap', 'val-scrap', 'scrapRecyclePct', 'Diverted');

  // AI Copilot Query Button
  const askBtn = document.getElementById('btn-copilot-ask');
  if (askBtn) {
    askBtn.addEventListener('click', handleCopilotQuery);
  }

  const queryInput = document.getElementById('copilot-query');
  if (queryInput) {
    queryInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCopilotQuery();
    });
  }
}

// Trigger Live What-If Simulation Recalculation API
async function triggerSimulationRecalculation() {
  try {
    const res = await fetch(`${API_BASE}/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appState.sliderInputs)
    });
    if (res.ok) {
      const data = await res.json();
      const results = data.results;
      
      appState.kpiData = {
        baselineMonthlyCO2: results.baselineMonthlyCO2,
        monthlyCO2SavedTons: results.monthlyCO2SavedTons,
        co2ReductionPercentage: results.co2ReductionPercentage,
        financialSavings: results.financialSavings
      };
      
      appState.stages = results.updatedStages || [];
      updateUIWithoutFullReload();
    } else {
      fallbackLocalSimulation();
    }
  } catch (e) {
    fallbackLocalSimulation();
  }
}

// Client-side fallback calculation if API offline
function fallbackLocalSimulation() {
  const { fuelShiftPct, tempReductionPct, pcrResinPct, scrapRecyclePct } = appState.sliderInputs;
  
  const rawMaterialTons = 10 * (1 - (pcrResinPct / 50) * 0.40);
  const furnaceTons = 48 * (1 - (fuelShiftPct / 100) * 0.44 - (tempReductionPct / 20) * 0.18);
  const processingTons = 25;
  const scrapTons = 17 * (1 - (scrapRecyclePct / 100) * 0.85);

  const newTotal = rawMaterialTons + furnaceTons + processingTons + scrapTons;
  const saved = 100 - newTotal;
  const cutPct = saved;

  const energySavings = Math.round(350000 * (fuelShiftPct / 50 + tempReductionPct / 5) / 2);
  const materialSavings = Math.round(240000 * (pcrResinPct / 20));
  const scrapRevenue = Math.round(300000 * (scrapRecyclePct / 100));
  const totalSavings = energySavings + materialSavings + scrapRevenue;

  appState.kpiData = {
    baselineMonthlyCO2: 100,
    monthlyCO2SavedTons: Number(saved.toFixed(1)),
    co2ReductionPercentage: Number(cutPct.toFixed(1)),
    financialSavings: { totalNetSavingsDisplay: `+₹${totalSavings.toLocaleString('en-IN')} / year` }
  };

  appState.stages = [
    { name: "1. RAW MATERIAL", desc: "Virgin Polymer Resin (100T/mo)", currentMonthlyCO2: Number(rawMaterialTons.toFixed(1)), sharePercentage: Number(((rawMaterialTons/newTotal)*100).toFixed(1)), status: ((rawMaterialTons/newTotal)*100) > 15 ? "RED ALERT" : "NORMAL" },
    { name: "2. FURNACE HEATING", desc: "Heavy Furnace Oil (1400°C)", currentMonthlyCO2: Number(furnaceTons.toFixed(1)), sharePercentage: Number(((furnaceTons/newTotal)*100).toFixed(1)), status: ((furnaceTons/newTotal)*100) > 15 ? "RED ALERT" : "NORMAL", alertPriority: "PRIORITY 1" },
    { name: "3. PROCESSING LINE", desc: "Extrusion Line Operations", currentMonthlyCO2: Number(processingTons.toFixed(1)), sharePercentage: Number(((processingTons/newTotal)*100).toFixed(1)), status: ((processingTons/newTotal)*100) > 15 ? "EVALUATE" : "NORMAL" },
    { name: "4. WASTE SCRAP", desc: "Off-cut Trim Scrap (12T/mo)", currentMonthlyCO2: Number(scrapTons.toFixed(1)), sharePercentage: Number(((scrapTons/newTotal)*100).toFixed(1)), status: ((scrapTons/newTotal)*100) > 15 ? "RED ALERT" : "NORMAL", alertPriority: "PRIORITY 2" }
  ];

  updateUIWithoutFullReload();
}

function updateUIWithoutFullReload() {
  render();
}

// Handle AI Copilot Natural Language Query
async function handleCopilotQuery() {
  const inputEl = document.getElementById('copilot-query');
  const query = inputEl ? inputEl.value : '';
  if (!query) return;

  try {
    const res = await fetch(`${API_BASE}/copilot/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query })
    });
    if (res.ok) {
      const data = await res.json();
      appState.copilotData = data;
    }
  } catch (e) {
    console.warn('Copilot query offline fallback:', e);
  }

  // Switch to Copilot tab to view output
  const copilotTabBtn = document.querySelector('[data-tab="tab-copilot"]');
  if (copilotTabBtn) copilotTabBtn.click();
}

// Initialize Chart.js Instances for Hotspot Split Pie & Empirical Regression Models
function initCharts() {
  // 1. Hotspot Pie Chart
  const pieCtx = document.getElementById('chart-hotspot-pie');
  if (pieCtx) {
    if (chartInstances.hotspotPie) chartInstances.hotspotPie.destroy();
    
    chartInstances.hotspotPie = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Virgin Polymer Resin (62%)', 'Furnace Thermal Energy (28%)', 'Unrecycled Scrap Waste (10%)'],
        datasets: [{
          data: [62, 28, 10],
          backgroundColor: ['#1e40af', '#dc2626', '#10b981'],
          borderColor: '#0f172a',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#94a3b8', font: { size: 12, weight: 'bold' } }
          }
        }
      }
    });
  }

  // 2. Material Regression Line Chart
  const matCtx = document.getElementById('chart-material-regression');
  if (matCtx) {
    if (chartInstances.matReg) chartInstances.matReg.destroy();

    chartInstances.matReg = new Chart(matCtx, {
      type: 'line',
      data: {
        labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        datasets: [
          {
            label: 'Baseline Virgin Resin (2.80 tCO₂e/Ton)',
            data: [28, 56, 84, 112, 140, 168, 196, 224, 252, 280],
            borderColor: '#ef4444',
            borderDash: [6, 6],
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.1
          },
          {
            label: 'Circular PCR Blend (1.40 tCO₂e/Ton - 50% Cut Target)',
            data: [14, 28, 42, 56, 70, 84, 98, 112, 126, 140],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.1,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Raw Material Input (Tons/Month)', color: '#94a3b8' },
            ticks: { color: '#64748b' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          y: {
            title: { display: true, text: 'Output Carbon Footprint (tCO₂e/Mo)', color: '#94a3b8' },
            ticks: { color: '#64748b' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        },
        plugins: {
          legend: { labels: { color: '#cbd5e1' } }
        }
      }
    });
  }

  // 3. Fuel Transition Line Chart
  const fuelCtx = document.getElementById('chart-fuel-regression');
  if (fuelCtx) {
    if (chartInstances.fuelReg) chartInstances.fuelReg.destroy();

    chartInstances.fuelReg = new Chart(fuelCtx, {
      type: 'line',
      data: {
        labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        datasets: [
          {
            label: 'Furnace Oil ➔ Biomass / Solar Electric (-88% max)',
            data: [0, 8.8, 17.6, 26.4, 35.2, 44.0, 52.8, 61.6, 70.4, 79.2, 88.0],
            borderColor: '#10b981',
            borderWidth: 3,
            tension: 0.1
          },
          {
            label: 'Furnace Oil ➔ Biomass Briquettes (-70% max)',
            data: [0, 7.0, 14.0, 21.0, 28.0, 35.0, 42.0, 49.0, 56.0, 63.0, 70.0],
            borderColor: '#06b6d4',
            borderDash: [5, 5],
            tension: 0.1
          },
          {
            label: 'Furnace Oil ➔ Piped Natural Gas (PNG) (-30% max)',
            data: [0, 3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 27.0, 30.0],
            borderColor: '#f59e0b',
            borderDash: [2, 2],
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Fuel Source Transition Percentage (%)', color: '#94a3b8' },
            ticks: { color: '#64748b' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          y: {
            title: { display: true, text: 'Thermal Carbon Emission Reduction (%)', color: '#94a3b8' },
            ticks: { color: '#64748b' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        },
        plugins: {
          legend: { labels: { color: '#cbd5e1' } }
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
