import { renderReportTemplate } from './ReportGenerator.js';

export function renderRoadmapTable(roadmapData = [], state = {}) {
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
        <span>📊 Integrated Decarbonization Roadmap & Financial Matrix</span>
        <button class="btn-primary" id="btn-download-pdf-roadmap" style="font-size:12px; padding:6px 14px; background:linear-gradient(135deg, #10b981, #059669); color:#000;">
          📥 Download ESG Compliance Audit Report (PDF)
        </button>
      </div>
      <div class="card-subtitle">
        Economically self-sustaining decarbonization roadmap converting capital investment into rapid payback and measurable carbon cuts.
      </div>

      <table class="roadmap-table">
        <thead>
          <tr>
            <th>Diagnosed Hotspot</th>
            <th>Recommended Circular Action</th>
            <th>Est. Capital Cost (INR ₹)</th>
            <th>Annual CO₂ Cut</th>
            <th>Payback Period</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(row => `
            <tr>
              <td style="font-weight:700; color:var(--text-main);">${row.diagnosedHotspot}</td>
              <td style="color:var(--text-muted);">${row.recommendedAction}</td>
              <td style="font-weight:700; color:var(--secondary);">${row.capitalCostDisplay || `₹${(row.capitalCostINR || 0).toLocaleString('en-IN')}`}</td>
              <td style="font-weight:700; color:var(--primary);">${row.annualCO2ReductionTons} tCO₂e / yr</td>
              <td><span class="table-badge">${row.paybackMonths} Months</span></td>
            </tr>
          `).join('')}
          <tr style="background:rgba(16, 185, 129, 0.08); font-weight:800; border-top:2px solid var(--primary);">
            <td style="color:var(--primary);">TOTAL INTEGRATED PLAN</td>
            <td style="color:var(--text-main);">Combined Circular & Energy Efficiency Roadmap</td>
            <td style="color:var(--secondary);">₹20,30,000 (~20.3 Lakhs)</td>
            <td style="color:var(--primary);">195 tCO₂e / yr</td>
            <td><span class="table-badge" style="background:var(--primary); color:#000;">~10.5 Months Avg</span></td>
          </tr>
        </tbody>
      </table>

      <!-- Embedded Official ESG Compliance Report Preview -->
      <div style="margin-top:32px;">
        <h3 style="color:var(--primary); font-size:16px; margin-bottom:8px;">📄 Official ESG Audit Document Preview</h3>
        ${renderReportTemplate(state)}
      </div>
    </div>
  `;
}
