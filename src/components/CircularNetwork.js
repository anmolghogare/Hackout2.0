export function renderCircularNetwork() {
  return `
    <div class="dashboard-card">
      <div class="card-title">
        <div class="card-title-left">
          <span class="card-icon">🔄</span>
          <span>Functionality 5: AI-Powered Waste-to-Resource Circular Network</span>
        </div>
        <span class="badge-primary">
          ACTIVE B2B BY-PRODUCT MATCHER
        </span>
      </div>
      <div class="card-subtitle">
        Replaces the traditional linear route (Factory ➔ Waste ➔ Landfill) with an active B2B waste-to-resource exchange network. Automatically analyzes industrial by-products and matches recipient industries.
      </div>

      <!-- Interactive Flow Visualizer Diagram -->
      <div class="circular-diagram-container">
        <!-- Factory A Node -->
        <div class="network-node seller-node">
          <div class="node-badge danger">FACTORY A (SELLER)</div>
          <h3 class="node-title">Apex Packaging Pvt. Ltd.</h3>
          <div class="node-detail-item">
            <span class="detail-label">Industrial By-Product:</span>
            <span class="detail-val">12 Tons/month Polymer Scrap</span>
          </div>
          <div class="node-detail-item">
            <span class="detail-label">Old Linear Route:</span>
            <span class="detail-val danger">Landfill Dumping</span>
          </div>
          <div class="node-detail-item">
            <span class="detail-label">Disposal Fee Paid:</span>
            <span class="detail-val danger">₹1,500 / Ton (₹2,16,000/yr)</span>
          </div>
        </div>

        <!-- AI Matcher Connector Node -->
        <div class="network-connector">
          <div class="ai-pulse-orb">
            <span class="orb-icon">🤖</span>
            <span class="orb-text">AI MATCHER ENGINE</span>
            <span class="orb-sub">Waste-to-Resource</span>
          </div>
          <div class="connector-arrows">
            <span class="arrow-line"></span>
            <span class="arrow-head">▶</span>
          </div>
        </div>

        <!-- Factory B Node -->
        <div class="network-node buyer-node">
          <div class="node-badge cyan">FACTORY B (BUYER)</div>
          <h3 class="node-title">Regional Pipe Manufacturer</h3>
          <div class="node-detail-item">
            <span class="detail-label">Secondary Feedstock:</span>
            <span class="detail-val">Buys Polymer Feedstock @ 30% Discount</span>
          </div>
          <div class="node-detail-item">
            <span class="detail-label">New Circular Route:</span>
            <span class="detail-val success">Circular Product Input</span>
          </div>
          <div class="node-detail-item">
            <span class="detail-label">Cost Advantage:</span>
            <span class="detail-val success">30% Below Virgin Polymer Rates</span>
          </div>
        </div>
      </div>

      <!-- Financial & Environmental Ecosystem Impact Box -->
      <div class="ecosystem-impact-banner">
        <div class="impact-banner-header">
          <span class="banner-tag">ECOSYSTEM IMPACT</span>
          <h3>Disposal Cost Saved ➔ Sales Revenue Creation</h3>
          <div class="impact-revenue-pill">+₹3,00,000 / year Net Scrap Revenue (+₹5,16,000 Total Value Created)</div>
        </div>

        <div class="impact-metrics-trio">
          <div class="trio-metric">
            <span class="trio-val">↓ 30%</span>
            <span class="trio-label">Raw Material Cost Savings for Buyer</span>
          </div>
          <div class="trio-metric">
            <span class="trio-val">↓ 85%</span>
            <span class="trio-label">Landfill Waste Diversion Rate</span>
          </div>
          <div class="trio-metric">
            <span class="trio-val">↓ 42%</span>
            <span class="trio-label">Net Carbon Footprint Cut</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
