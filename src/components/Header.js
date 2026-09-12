export function renderHeader(kpiData = {}) {
  const {
    baselineMonthlyCO2 = 100,
    monthlyCO2SavedTons = 21,
    co2ReductionPercentage = 21.0,
    financialSavings = { totalNetSavingsDisplay: "₹6,50,000 / year" }
  } = kpiData;

  return `
    <header class="app-header">
      <div class="header-top">
        <div>
          <div class="team-badge">TEAM: ByteMe • HackOut'26</div>
          <h1 class="project-title">Industrial Emission Leak-Point Detector & Circular Alternative Recommender</h1>
          <div class="entity-subtitle">
            Target Implementation Entity: <span class="entity-tag">Apex Packaging Pvt. Ltd.</span> (Mid-Size SME Plastics & Packaging, India)
          </div>
        </div>

        <div style="display:flex; gap:8px; align-items:center;">
          <button class="btn-primary" id="btn-download-pdf" style="font-size:12px; padding:8px 16px; background:linear-gradient(135deg, #06b6d4, #3b82f6); color:#fff;">
            📥 Download ESG Audit PDF
          </button>
          <button class="pill-btn" id="btn-preset-baseline" style="background:rgba(239, 68, 68, 0.15); color:var(--danger); border-color:var(--danger);">
            🚨 Baseline (Red Alert)
          </button>
          <button class="pill-btn" id="btn-preset-moderate" style="background:rgba(6, 182, 212, 0.15); color:var(--secondary); border-color:var(--secondary);">
            ⚡ Moderate (-21%)
          </button>
          <button class="pill-btn" id="btn-preset-aggressive" style="background:rgba(16, 185, 129, 0.15); color:var(--primary); border-color:var(--primary);">
            🌱 Aggressive (-42%)
          </button>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Baseline CO₂ Footprint</div>
          <div class="kpi-value">${baselineMonthlyCO2} <span style="font-size:14px;">tCO₂e/mo</span></div>
          <div class="kpi-subtext">1,200 tCO₂e Annual Baseline</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Target CO₂ Reduction</div>
          <div class="kpi-value green">-${co2ReductionPercentage}%</div>
          <div class="kpi-subtext">-${monthlyCO2SavedTons} tCO₂e/month saved</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Net Financial Savings (INR)</div>
          <div class="kpi-value green">${financialSavings.totalNetSavingsDisplay || "₹6,50,000 / year"}</div>
          <div class="kpi-subtext">Energy, Material & Scrap Sales</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Average Payback Period</div>
          <div class="kpi-value">~10.5 <span style="font-size:14px;">Months</span></div>
          <div class="kpi-subtext">₹20.3L Total Roadmap Investment</div>
        </div>
      </div>
    </header>
  `;
}
