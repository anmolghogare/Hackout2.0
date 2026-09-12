export function renderReportTemplate(state = {}) {
  const { kpiData = {}, stages = [] } = state;
  const timestamp = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return `
    <div id="esg-report-printable" style="background:#ffffff; color:#0f172a; padding:40px; font-family:sans-serif; border-radius:12px; margin-top:24px;">
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; border-bottom:3px solid #10b981; padding-bottom:16px; margin-bottom:24px;">
        <div>
          <h2 style="color:#0f172a; font-size:22px; font-weight:800; margin:0;">OFFICIAL ESG & DECARBONIZATION COMPLIANCE AUDIT</h2>
          <p style="color:#10b981; font-weight:700; font-size:13px; margin-top:4px;">AUTOMATED INDUSTRIAL DECISION INTELLIGENCE SYSTEM</p>
        </div>
        <div style="text-align:right;">
          <p style="font-size:12px; color:#64748b; margin:0;">Ref ID: <strong>BYTEME-ESG-2026-APEX</strong></p>
          <p style="font-size:12px; color:#64748b; margin-top:2px;">Audit Date: <strong>${timestamp}</strong></p>
          <p style="font-size:12px; color:#10b981; font-weight:700; margin-top:2px;">Status: VERIFIED AUDIT</p>
        </div>
      </div>

      <!-- Facility Profile -->
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin-bottom:24px;">
        <h4 style="font-size:14px; color:#0f172a; margin-top:0; margin-bottom:8px;">1. Target Implementation Facility Context</h4>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px; color:#334155;">
          <div><strong>Facility Name:</strong> Apex Packaging Pvt. Ltd.</div>
          <div><strong>Industry Sector:</strong> SME Plastics & Packaging</div>
          <div><strong>Operational Profile:</strong> 100 Tons/mo Resin Processing</div>
          <div><strong>Primary Energy:</strong> Heavy Furnace Oil (1400°C)</div>
        </div>
      </div>

      <!-- Hotspot Breakdown Table -->
      <div style="margin-bottom:24px;">
        <h4 style="font-size:14px; color:#0f172a; margin-bottom:8px;">2. Diagnosed Carbon Hotspots & Red Alert Audit</h4>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead>
            <tr style="background:#0f172a; color:#ffffff;">
              <th style="padding:8px 12px; text-align:left;">Operational Stage</th>
              <th style="padding:8px 12px; text-align:left;">Description</th>
              <th style="padding:8px 12px; text-align:center;">Monthly CO₂</th>
              <th style="padding:8px 12px; text-align:center;">Footprint Share</th>
              <th style="padding:8px 12px; text-align:center;">Audit Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px 12px; font-weight:700;">1. Raw Material</td>
              <td style="padding:10px 12px;">Virgin Polymer Resin (100T/mo)</td>
              <td style="padding:10px 12px; text-align:center;">10 tCO₂e</td>
              <td style="padding:10px 12px; text-align:center;">10%</td>
              <td style="padding:10px 12px; text-align:center; color:#10b981; font-weight:700;">NORMAL</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0; background:#fef2f2;">
              <td style="padding:10px 12px; font-weight:700;">2. Furnace Heating</td>
              <td style="padding:10px 12px;">Heavy Furnace Oil (1400°C)</td>
              <td style="padding:10px 12px; text-align:center; font-weight:700; color:#ef4444;">48 tCO₂e</td>
              <td style="padding:10px 12px; text-align:center; font-weight:700; color:#ef4444;">48%</td>
              <td style="padding:10px 12px; text-align:center; color:#ef4444; font-weight:800;">PRIORITY 1 RED ALERT</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px 12px; font-weight:700;">3. Processing Line</td>
              <td style="padding:10px 12px;">Extrusion Line Operations</td>
              <td style="padding:10px 12px; text-align:center;">25 tCO₂e</td>
              <td style="padding:10px 12px; text-align:center;">25%</td>
              <td style="padding:10px 12px; text-align:center; color:#f59e0b; font-weight:700;">EVALUATE</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0; background:#fef2f2;">
              <td style="padding:10px 12px; font-weight:700;">4. Scrap Waste</td>
              <td style="padding:10px 12px;">Off-cut Polymer Scrap (12T/mo)</td>
              <td style="padding:10px 12px; text-align:center; font-weight:700; color:#ef4444;">17 tCO₂e</td>
              <td style="padding:10px 12px; text-align:center; font-weight:700; color:#ef4444;">17%</td>
              <td style="padding:10px 12px; text-align:center; color:#ef4444; font-weight:800;">PRIORITY 2 RED ALERT</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Financial Matrix -->
      <div style="margin-bottom:24px;">
        <h4 style="font-size:14px; color:#0f172a; margin-bottom:8px;">3. Recommended Decarbonization & Payback Matrix</h4>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead>
            <tr style="background:#06b6d4; color:#ffffff;">
              <th style="padding:8px 12px; text-align:left;">Action Item</th>
              <th style="padding:8px 12px; text-align:center;">Est. Capital Cost</th>
              <th style="padding:8px 12px; text-align:center;">Annual CO₂ Cut</th>
              <th style="padding:8px 12px; text-align:center;">Payback Period</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:8px 12px;">40% PCR Resin Substitution</td>
              <td style="padding:8px 12px; text-align:center;">₹10,00,000</td>
              <td style="padding:8px 12px; text-align:center;">120 tCO₂e/yr</td>
              <td style="padding:8px 12px; text-align:center;">14 Months</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:8px 12px;">50% PNG/Biomass Fuel Transition</td>
              <td style="padding:8px 12px; text-align:center;">₹3,30,000</td>
              <td style="padding:8px 12px; text-align:center;">30 tCO₂e/yr</td>
              <td style="padding:8px 12px; text-align:center;">6 Months</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:8px 12px;">B2B Waste Exchange Matchmaking</td>
              <td style="padding:8px 12px; text-align:center;">₹7,00,000</td>
              <td style="padding:8px 12px; text-align:center;">45 tCO₂e/yr</td>
              <td style="padding:8px 12px; text-align:center;">9 Months</td>
            </tr>
            <tr style="background:#ecfdf5; font-weight:700; color:#065f46;">
              <td style="padding:10px 12px;">TOTAL INTEGRATED PLAN</td>
              <td style="padding:10px 12px; text-align:center;">₹20,30,000</td>
              <td style="padding:10px 12px; text-align:center;">195 tCO₂e/yr</td>
              <td style="padding:10px 12px; text-align:center;">~10.5 Months Avg</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Verification Footer -->
      <div style="display:flex; justify-content:space-between; border-top:2px solid #e2e8f0; padding-top:20px; margin-top:30px; font-size:12px; color:#64748b;">
        <div>
          <strong>System Auditor:</strong> Team ByteMe AI Engine<br/>
          <strong>Framework:</strong> IPCC & CEA India Emission Standards
        </div>
        <div style="text-align:right;">
          <div style="border-bottom:1px solid #94a3b8; width:140px; margin-bottom:4px;"></div>
          <strong>Authorized Officer Stamp</strong>
        </div>
      </div>
    </div>
  `;
}
