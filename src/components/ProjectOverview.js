export function renderProjectOverview(data = {}) {
  return `
    <div class="dashboard-card hero-overview-card">
      <div class="overview-banner">
        <div class="overview-tag-row">
          <span class="badge-accent">TEAM: ByteMe</span>
          <span class="badge-outline">Hackout 2.0 • Industrial Carbon Decision Intelligence</span>
        </div>
        <h2 class="overview-headline">Target Implementation & Demo Entity Context</h2>
        <p class="overview-lead">
          <strong>Apex Packaging Pvt. Ltd.</strong> — Mid-Size SME Plastics & Packaging Facility (India Context)
        </p>
      </div>

      <div class="overview-grid">
        <div class="overview-box baseline-box">
          <div class="box-icon">🏭</div>
          <h3>Baseline Facility Operational Profile</h3>
          <ul class="overview-list">
            <li><strong>Raw Material Processing:</strong> Processes <span>100 Tons/month</span> of virgin polymer resin</li>
            <li><strong>Thermal Heating:</strong> Consumes heavy furnace oil for thermal heating (<span>1400°C</span>)</li>
            <li><strong>Industrial Scrap Waste:</strong> Generates <span>12 Tons/month</span> of off-cut polymer trim scrap</li>
            <li><strong>Disposal Cost:</strong> Pays <span>₹1,500 / Ton</span> landfill dumping fee</li>
          </ul>
        </div>

        <div class="overview-box mission-box">
          <div class="box-icon">🎯</div>
          <h3>Executive Project Overview & Mission</h3>
          <ul class="overview-list">
            <li><strong>Core Mission:</strong> Automated industrial carbon decision intelligence platform designed specifically for SMEs in India.</li>
            <li><strong>Operational Focus:</strong> Bridges corporate sustainability goals and plant profitability by transforming operational inputs into costed, ROI-evaluated circular interventions.</li>
            <li><strong>Value Proposition:</strong> Eliminates capital-intensive ESG consulting fees (<span>₹10–25 Lakhs</span>) and hardware IoT deployment barriers, delivering software-only carbon decision intelligence in Indian Rupees (INR ₹).</li>
          </ul>
        </div>
      </div>

      <div class="impact-cards-row">
        <div class="impact-mini-card">
          <div class="impact-icon">💻</div>
          <div class="impact-title">Zero-Hardware Architecture</div>
          <div class="impact-desc">Software-Only Cloud App ingesting standard utility bills & material logs with zero IoT sensor deployment cost.</div>
        </div>

        <div class="impact-mini-card">
          <div class="impact-icon">🗑️</div>
          <div class="impact-title">85% Landfill Diversion</div>
          <div class="impact-desc">Replaces linear waste disposal with active B2B waste-to-resource exchange network.</div>
        </div>

        <div class="impact-mini-card">
          <div class="impact-icon">🏷️</div>
          <div class="impact-title">30% Raw Material Savings</div>
          <div class="impact-desc">Provides secondary feedstock to recipient buyers at a 30% discount below virgin polymer rates.</div>
        </div>

        <div class="impact-mini-card">
          <div class="impact-icon">📉</div>
          <div class="impact-title">42% Net Footprint Cut</div>
          <div class="impact-desc">Reduces overall facility carbon intensity through integrated material and thermal energy interventions.</div>
        </div>
      </div>
    </div>
  `;
}
