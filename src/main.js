import { App } from './App.js';
import { initChartInstances } from './components/ChartsPanel.js';

const API_BASE = 'http://localhost:5000/api';

let appState = {
  kpiData: {
    baselineMonthlyCO2: 100,
    monthlyCO2SavedTons: 28.8,
    co2ReductionPercentage: 28.8,
    financialSavings: { totalNetSavingsDisplay: "₹6,50,000 / year" }
  },
  stages: [],
  sliderInputs: {
    fuelShiftPct: 50,
    tempReductionPct: 5,
    pcrResinPct: 20,
    scrapRecyclePct: 100
  },
  copilotData: {},
  roadmapData: []
};

// Render App
function render() {
  const root = document.getElementById('app');
  if (root) {
    root.innerHTML = App(appState);
    attachEventListeners();
    setTimeout(initChartInstances, 50);
  }
}

// Fetch Initial Baseline Data
async function init() {
  try {
    const res = await fetch(`${API_BASE}/facility/baseline`);
    if (res.ok) {
      const data = await res.json();
      appState.stages = data.data?.processStages || [];
    }
  } catch (e) {
    console.warn('Backend API offline, using baseline fallback dataset:', e);
  }
  render();
}

// Attach Event Listeners
function attachEventListeners() {
  // Tab Navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      e.currentTarget.classList.add('active');
      const contentEl = document.getElementById(targetTab);
      if (contentEl) contentEl.classList.add('active');

      if (targetTab === 'tab-whatif') {
        setTimeout(initChartInstances, 50);
      }
    });
  });

  // Slider Input Listeners
  const bindSlider = (id, badgeId, key) => {
    const el = document.getElementById(id);
    const badge = document.getElementById(badgeId);
    if (el) {
      el.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        appState.sliderInputs[key] = val;
        if (badge) badge.innerText = `${val}% ${key.includes('temp') ? 'Cut' : key.includes('pcr') ? 'PCR' : key.includes('scrap') ? 'Diverted' : 'Shift'}`;
        triggerSimulationRecalculation();
      });
    }
  };

  bindSlider('slider-fuel', 'val-fuel', 'fuelShiftPct');
  bindSlider('slider-temp', 'val-temp', 'tempReductionPct');
  bindSlider('slider-pcr', 'val-pcr', 'pcrResinPct');
  bindSlider('slider-scrap', 'val-scrap', 'scrapRecyclePct');

  // Preset Buttons
  const presetBaseline = document.getElementById('btn-preset-baseline');
  if (presetBaseline) presetBaseline.addEventListener('click', () => applyPreset(0, 0, 0, 0));

  const presetModerate = document.getElementById('btn-preset-moderate');
  if (presetModerate) presetModerate.addEventListener('click', () => applyPreset(50, 5, 20, 100));

  const presetAggressive = document.getElementById('btn-preset-aggressive');
  if (presetAggressive) presetAggressive.addEventListener('click', () => applyPreset(80, 10, 40, 100));

  // PDF Download Handlers
  const pdfBtnHeader = document.getElementById('btn-download-pdf');
  if (pdfBtnHeader) pdfBtnHeader.addEventListener('click', handlePDFDownload);

  const pdfBtnRoadmap = document.getElementById('btn-download-pdf-roadmap');
  if (pdfBtnRoadmap) pdfBtnRoadmap.addEventListener('click', handlePDFDownload);

  // AI Copilot Ask Button
  const askBtn = document.getElementById('btn-copilot-ask');
  if (askBtn) askBtn.addEventListener('click', handleCopilotQuery);
}

// 1-Click ESG PDF Generator
function handlePDFDownload() {
  const element = document.getElementById('esg-report-printable');
  if (!element) return;

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       0.4,
      filename:     'Apex_Packaging_ESG_Audit_Report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  } else {
    // Fallback: Open browser print dialog
    window.print();
  }
}

// Apply Preset Demo Scenarios
function applyPreset(fuel, temp, pcr, scrap) {
  appState.sliderInputs = {
    fuelShiftPct: fuel,
    tempReductionPct: temp,
    pcrResinPct: pcr,
    scrapRecyclePct: scrap
  };
  triggerSimulationRecalculation();
}

// Trigger Live What-If Recalculation API
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
      render();
    }
  } catch (e) {
    console.warn('Simulation calculation failed:', e);
  }
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
      render();
      const copilotTabBtn = document.querySelector('[data-tab="tab-copilot"]');
      if (copilotTabBtn) copilotTabBtn.click();
    }
  } catch (e) {
    console.warn('Copilot query failed:', e);
  }
}

document.addEventListener('DOMContentLoaded', init);
