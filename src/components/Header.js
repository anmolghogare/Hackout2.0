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
