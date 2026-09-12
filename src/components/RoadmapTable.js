export function renderRoadmapTable(roadmapData = []) {
  const defaultRoadmap = [
    {
      diagnosedHotspot: "Virgin Polymer Resin (62% Footprint)",
      recommendedAction: "Substitute 40% virgin resin with PCR polymer blend.",
      capitalCostDisplay: "₹10,00,000 (~10 Lakhs)",
      annualCO2ReductionTons: 120,
      paybackMonths: 14
    },
    {
      diagnosedHotspot: "Furnace Thermal Energy (28% Footprint)",
      recommendedAction: "Optimize heating cycles & switch 50% fuel to PNG/Biomass.",
      capitalCostDisplay: "₹3,30,000 (~3.3 Lakhs)",
      annualCO2ReductionTons: 30,
      paybackMonths: 6
    },
    {
      diagnosedHotspot: "Unrecycled Scrap Waste (10% Footprint)",
      recommendedAction: "Inline scrap re-granulation + B2B waste matchmaking.",
      capitalCostDisplay: "₹7,00,000 (~7 Lakhs)",
      annualCO2ReductionTons: 45,
      paybackMonths: 9
    }
  ];

  const items = roadmapData.length > 0 ? roadmapData : defaultRoadmap;

  return `
    <div class="dashboard-card">
      <div class="card-title">
        <div class="card-title-left">
          <span class="card-icon">📊</span>
          <span>Integrated Decarbonization Roadmap & Financial Matrix</span>
        </div>
        <span class="badge-success">
          ~10.5 MONTHS AVERAGE PAYBACK
        </span>
      </div>
      <div class="card-subtitle">
        Economically self-sustaining decarbonization roadmap converting capital investment into rapid financial payback and auditable carbon reductions in Indian Rupees (INR ₹).
      </div>

      <div class="table-responsive-container">
        <table class="roadmap-table">
          <thead>
            <tr>
              <th>Diagnosed Hotspot</th>
              <th>Recommended Circular Action</th>
              <th>Est. Capital Cost (INR ₹)</th>
              <th>Annual CO₂ Reduction</th>
              <th>Payback Period</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(row => `
              <tr>
                <td class="col-hotspot">
                  <div class="hotspot-title">${row.diagnosedHotspot}</div>
                </td>
                <td class="col-action">
                  <div class="action-desc">${row.recommendedAction}</div>
                </td>
                <td class="col-cost">
                  <span class="cost-value">${row.capitalCostDisplay || `₹${(row.capitalCostINR || 0).toLocaleString('en-IN')}`}</span>
                </td>
                <td class="col-co2">
                  <span class="co2-value">${row.annualCO2ReductionTons} tCO₂e / yr</span>
                </td>
                <td class="col-payback">
                  <span class="payback-badge">${row.paybackMonths} Months</span>
                </td>
              </tr>
            `).join('')}
            <tr class="total-roadmap-row">
              <td class="col-hotspot">
                <span class="total-tag">TOTAL INTEGRATED PLAN</span>
              </td>
              <td class="col-action">
                <strong>Combined Circular & Energy Efficiency Roadmap</strong>
              </td>
              <td class="col-cost">
                <strong class="cyan-text">₹20,30,000 (~20.3 Lakhs)</strong>
              </td>
              <td class="col-co2">
                <strong class="green-text">195 tCO₂e / yr</strong>
              </td>
              <td class="col-payback">
                <span class="payback-badge total-badge">~10.5 Months Avg</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Financial ROI Takeaway Box -->
      <div class="financial-takeaway-box">
        <div class="takeaway-header">
          <span class="takeaway-icon">💡</span>
          <h4>Core Economic Thesis & ROI Takeaway</h4>
        </div>
        <p class="takeaway-text">
          Every recommended circular intervention is <strong>economically self-sustaining</strong>. For a total capital investment of <strong>₹20.3 Lakhs</strong>, Apex Packaging eliminates <strong>195 tons of annual CO₂</strong> (21% total facility footprint) while fully recovering capital in <strong>~10.5 months</strong>.
        </p>
      </div>
    </div>
  `;
}
