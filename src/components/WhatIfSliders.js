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
        <span>🎛️ Functionality 4: Raw Material & Fuel Substitution What-If Scale</span>
        <span style="font-size:12px; color:var(--secondary); background:rgba(6, 182, 212, 0.15); padding:4px 10px; border-radius:12px; border:1px solid var(--secondary);">
          EMPIRICAL REGRESSION SCALE
        </span>
      </div>
      <div class="card-subtitle">
        Adjust operational variables using interactive sliders to observe real-time mathematical impact on thermal energy, carbon footprint, and INR savings.
      </div>

      <div class="sliders-grid">
        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">🔥 Fuel Shift (Furnace Oil → PNG/Biomass)</span>
            <span class="slider-value-badge" id="val-fuel">${fuelShiftPct}% Shift</span>
          </div>
          <input type="range" id="slider-fuel" min="0" max="100" value="${fuelShiftPct}" step="5" />
          <div style="font-size:11px; color:var(--text-dim); margin-top:6px;">Target: 50% Shift = -44% Thermal CO₂</div>
        </div>

        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">🌡️ Furnace Thermal Overshoot Reduction</span>
            <span class="slider-value-badge" id="val-temp">${tempReductionPct}% Cut</span>
          </div>
          <input type="range" id="slider-temp" min="0" max="20" value="${tempReductionPct}" step="1" />
          <div style="font-size:11px; color:var(--text-dim); margin-top:6px;">Target: 5% Temp Cut = ₹3,50,000/yr Energy Saved</div>
        </div>

        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">♻️ PCR Polymer Resin Substitution</span>
            <span class="slider-value-badge" id="val-pcr">${pcrResinPct}% PCR</span>
          </div>
          <input type="range" id="slider-pcr" min="0" max="50" value="${pcrResinPct}" step="5" />
          <div style="font-size:11px; color:var(--text-dim); margin-top:6px;">Target: 40% Blend = 120 tCO₂e/yr Saved</div>
        </div>

        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">🔄 Off-Cut Trim Scrap B2B Diversion</span>
            <span class="slider-value-badge" id="val-scrap">${scrapRecyclePct}% Diverted</span>
          </div>
          <input type="range" id="slider-scrap" min="0" max="100" value="${scrapRecyclePct}" step="10" />
          <div style="font-size:11px; color:var(--text-dim); margin-top:6px;">Target: 100% Diversion = +₹3,00,000/yr Scrap Sales</div>
        </div>
      </div>
    </div>
  `;
}
