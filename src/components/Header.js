export function renderHeader(kpiData = {}) {
  const {
    baselineMonthlyCO2 = 100,
    monthlyCO2SavedTons = 21,
    co2ReductionPercentage = 21.0,
    financialSavings = { totalNetSavingsDisplay: "+₹6,50,000 / year" }
  } = kpiData;

  return `
    <header class="app-header">
      <div class="header-top">
        <div>
          <div class="header-badge-row">
            <span class="team-badge">TEAM: ByteMe</span>
            <span class="sub-badge">Problem Statement Track: Automated Industrial Carbon Decision Intelligence for SMEs</span>
          </div>
          <h1 class="project-title">Industrial Emission Leak-Point Detector & Circular Alternative Recommender</h1>
          <div class="entity-subtitle">
            Target Implementation Entity: <span class="entity-tag">Apex Packaging Pvt. Ltd.</span> • Mid-Size SME Plastics & Packaging Facility (India Context)
          </div>
        </div>
        <div class="team-members-pill">
          <span class="member-name">Divyanshu</span>
          <span class="member-name">Anmol Ghogare</span>
          <span class="member-name">Rohan Gohil</span>
          <span class="member-name">Riyan Mansuri</span>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-label">Baseline Facility CO₂</span>
            <span class="kpi-badge neutral">100 tCO₂e/mo</span>
          </div>
          <div class="kpi-value">${baselineMonthlyCO2} <span class="kpi-unit">tCO₂e/mo</span></div>
          <div class="kpi-subtext">1,200 tCO₂e Annual Operational Baseline</div>
        </div>

        <div class="kpi-card highlight-green">
          <div class="kpi-header">
            <span class="kpi-label">Target Carbon Reduction</span>
            <span class="kpi-badge success">-${co2ReductionPercentage}% CUT</span>
          </div>
          <div class="kpi-value green">-${co2ReductionPercentage}%</div>
          <div class="kpi-subtext">-${monthlyCO2SavedTons} tCO₂e/mo (${Math.round(monthlyCO2SavedTons * 12)} tCO₂e/yr saved)</div>
        </div>

        <div class="kpi-card highlight-cyan">
          <div class="kpi-header">
            <span class="kpi-label">Net Financial Savings (INR ₹)</span>
            <span class="kpi-badge cyan">ROI POSITIVE</span>
          </div>
          <div class="kpi-value cyan">${financialSavings.totalNetSavingsDisplay || "+₹6,50,000 / year"}</div>
          <div class="kpi-subtext">Thermal Energy + Material Shift + Scrap Revenue</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-label">Average Capital Payback</span>
            <span class="kpi-badge purple">FAST PAYBACK</span>
          </div>
          <div class="kpi-value purple">~10.5 <span class="kpi-unit">Months</span></div>
          <div class="kpi-subtext">₹20.3 Lakhs Total Roadmap Investment</div>
        </div>
      </div>
    </header>
  `;
}
