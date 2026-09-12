export function renderChartsPanel() {
  return `
    <div class="dashboard-card">
      <div class="card-title">
        <span>📈 Functionality 4 Empirical Scale Charts & Hotspot Split</span>
        <span style="font-size:12px; color:var(--secondary); background:rgba(6, 182, 212, 0.15); padding:4px 10px; border-radius:12px; border:1px solid var(--secondary);">
          EMPIRICAL REGRESSION MODELING
        </span>
      </div>
      <div class="card-subtitle">
        Mathematical relationships between material/fuel inputs and output emission reductions based on empirical regression models.
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap:24px; margin-top:20px;">
        <!-- Chart 1: Donut Hotspot Split -->
        <div style="background:rgba(15, 23, 42, 0.8); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:16px;">
          <h4 style="font-size:14px; color:var(--text-main); margin-bottom:12px; text-align:center;">Apex Packaging: Baseline Hotspot Split</h4>
          <div style="height:260px; position:relative;">
            <canvas id="chart-hotspots"></canvas>
          </div>
        </div>

        <!-- Chart 2: Raw Material Throughput vs Carbon Footprint -->
        <div style="background:rgba(15, 23, 42, 0.8); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:16px;">
          <h4 style="font-size:14px; color:var(--text-main); margin-bottom:12px; text-align:center;">Raw Material Throughput vs. Carbon Footprint</h4>
          <div style="height:260px; position:relative;">
            <canvas id="chart-material"></canvas>
          </div>
        </div>

        <!-- Chart 3: Fuel Substitution vs Output CO2 Reduction -->
        <div style="background:rgba(15, 23, 42, 0.8); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:16px;">
          <h4 style="font-size:14px; color:var(--text-main); margin-bottom:12px; text-align:center;">Fuel Substitution (%) vs. Output CO₂ Reduction (%)</h4>
          <div style="height:260px; position:relative;">
            <canvas id="chart-fuel"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initChartInstances() {
  if (typeof Chart === 'undefined') return;

  // 1. Donut Hotspots Chart
  const ctx1 = document.getElementById('chart-hotspots');
  if (ctx1) {
    if (window.hotspotsChartInstance) window.hotspotsChartInstance.destroy();
    window.hotspotsChartInstance = new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Virgin Polymer Resin (62%)', 'Furnace Thermal Energy (28%)', 'Unrecycled Scrap Waste (10%)'],
        datasets: [{
          data: [62, 28, 10],
          backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
          borderWidth: 2,
          borderColor: '#0f172a'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } }
        }
      }
    });
  }

  // 2. Material Throughput Regression Chart
  const ctx2 = document.getElementById('chart-material');
  if (ctx2) {
    if (window.materialChartInstance) window.materialChartInstance.destroy();
    window.materialChartInstance = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        datasets: [
          {
            label: 'Baseline Virgin Resin (2.80 tCO₂e/Ton)',
            data: [28, 56, 84, 112, 140, 168, 196, 224, 252, 280],
            borderColor: '#ef4444',
            borderDash: [5, 5],
            backgroundColor: '#ef4444',
            pointRadius: 4
          },
          {
            label: 'Circular PCR Blend (1.40 tCO₂e/Ton - 50% Target)',
            data: [14, 28, 42, 56, 70, 84, 98, 112, 126, 140],
            borderColor: '#10b981',
            backgroundColor: '#10b981',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Raw Material Input (Tons/Month)', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
          y: { title: { display: true, text: 'Output Carbon Footprint (tCO₂e/Mo)', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
        },
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } }
        }
      }
    });
  }

  // 3. Fuel Substitution Regression Chart
  const ctx3 = document.getElementById('chart-fuel');
  if (ctx3) {
    if (window.fuelChartInstance) window.fuelChartInstance.destroy();
    window.fuelChartInstance = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        datasets: [
          {
            label: 'Furnace Oil ➔ Biomass / Solar Electric',
            data: [0, 8.5, 17, 25.5, 34, 44, 52, 61, 70, 78, 87],
            borderColor: '#10b981',
            backgroundColor: '#10b981',
            pointRadius: 4
          },
          {
            label: 'Furnace Oil ➔ Biomass Briquettes',
            data: [0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
            borderColor: '#06b6d4',
            borderDash: [4, 4],
            backgroundColor: '#06b6d4',
            pointRadius: 4
          },
          {
            label: 'Furnace Oil ➔ Piped Natural Gas (PNG)',
            data: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
            borderColor: '#f59e0b',
            borderDash: [2, 2],
            backgroundColor: '#f59e0b',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Fuel Source Transition Percentage (%)', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
          y: { title: { display: true, text: 'Thermal Carbon Emission Reduction (%)', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
        },
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } }
        }
      }
    });
  }
}
