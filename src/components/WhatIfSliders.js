export function renderWhatIfSliders(currentInputs = {}) {
  const {
    fuelShiftPct = 50,
    tempReductionPct = 5,
    pcrResinPct = 20,
    scrapRecyclePct = 100
  } = currentInputs;

  return `
    <div class="dashboard-card">
      <div class="card-title">
        <div class="card-title-left">
          <span class="card-icon">🎛️</span>
          <span>Functionality 4: Raw Material & Fuel Substitution What-If Scale</span>
        </div>
        <span class="badge-secondary">
          EMPIRICAL REGRESSION MODELING
        </span>
      </div>
      <div class="card-subtitle">
        Evaluate raw material blend adjustments and fuel source transitions using interactive What-If scale sliders. Calculates exact mathematical relationships between operational inputs and output emission reductions.
      </div>

      <!-- Sliders Control Grid -->
      <div class="sliders-grid">
        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">🔥 Fuel Shift (Furnace Oil ➔ PNG/Biomass)</span>
            <span class="slider-value-badge" id="val-fuel">${fuelShiftPct}% Shift</span>
          </div>
          <input type="range" id="slider-fuel" min="0" max="100" value="${fuelShiftPct}" step="5" />
          <div class="slider-footnote">Target: 50% Green Shift = -44% Thermal CO₂ Cut</div>
        </div>

        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">🌡️ Thermal Overshoot Temp Reduction</span>
            <span class="slider-value-badge" id="val-temp">${tempReductionPct}% Temp Cut</span>
          </div>
          <input type="range" id="slider-temp" min="0" max="20" value="${tempReductionPct}" step="1" />
          <div class="slider-footnote">Target: 5% Temp Cut = ₹3,50,000/yr Energy Savings</div>
        </div>

        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">♻️ PCR Polymer Resin Blend Substitution</span>
            <span class="slider-value-badge" id="val-pcr">${pcrResinPct}% PCR</span>
          </div>
          <input type="range" id="slider-pcr" min="0" max="50" value="${pcrResinPct}" step="5" />
          <div class="slider-footnote">Target: 40% PCR Blend = 120 tCO₂e/yr Saved</div>
        </div>

        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">🔄 Off-Cut Trim Scrap B2B Diversion</span>
            <span class="slider-value-badge" id="val-scrap">${scrapRecyclePct}% Diverted</span>
          </div>
          <input type="range" id="slider-scrap" min="0" max="100" value="${scrapRecyclePct}" step="10" />
          <div class="slider-footnote">Target: 100% Diversion = +₹3,00,000/yr Scrap Revenue</div>
        </div>
      </div>

      <!-- Empirical Regression Scatter & Line Charts (Slide 8) -->
      <div class="regression-charts-grid">
        <div class="chart-container-card">
          <div class="chart-header-row">
            <h4 class="chart-title">Raw Material Throughput vs. Carbon Footprint</h4>
            <span class="chart-tag">Baseline vs. 40% PCR Blend</span>
          </div>
          <div class="canvas-wrapper">
            <canvas id="chart-material-regression"></canvas>
          </div>
          <div class="chart-insight-pill green-insight">
            💡 50% Slope Reduction: Baseline (2.80 tCO₂e/Ton) ➔ Circular PCR Blend (1.40 tCO₂e/Ton)
          </div>
        </div>

        <div class="chart-container-card">
          <div class="chart-header-row">
            <h4 class="chart-title">Fuel Substitution (%) vs. Output CO₂ Reduction (%)</h4>
            <span class="chart-tag">Thermal Energy Fuel Pathways</span>
          </div>
          <div class="canvas-wrapper">
            <canvas id="chart-fuel-regression"></canvas>
          </div>
          <div class="chart-insight-pill cyan-insight">
            🔥 50% Green Fuel Shift = -44% Thermal CO₂ Cut (Biomass/Solar Electric & PNG)
          </div>
        </div>
      </div>
    </div>
  `;
}
