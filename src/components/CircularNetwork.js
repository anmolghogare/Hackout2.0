export function renderCircularNetwork() {
  return `
    <div class="dashboard-card">
      <div class="card-title">
        <span>🔄 Functionality 5: AI-Powered Waste-to-Resource Circular Network</span>
        <span style="font-size:12px; color:var(--primary); background:rgba(16, 185, 129, 0.15); padding:4px 10px; border-radius:12px; border:1px solid var(--primary);">
          ACTIVE B2B BY-PRODUCT MATCHER
        </span>
      </div>
      <div class="card-subtitle">
        Replaces the traditional linear route (Factory ➔ Waste ➔ Landfill) with an active B2B waste-to-resource exchange network.
      </div>

      <div style="display:grid; grid-template-columns: 1fr auto 1fr; gap:20px; align-items:center; margin:24px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border:2px solid var(--danger); border-radius:var(--radius-md); padding:20px;">
          <h4 style="color:var(--danger); font-size:16px; margin-bottom:8px;">FACTORY A (Apex Packaging)</h4>
          <p style="font-size:13px; color:var(--text-main);"><strong>By-Product:</strong> 12 Tons/month Polymer Trim Scrap</p>
          <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Old Path: Landfill Dumping</p>
          <p style="font-size:12px; color:var(--danger); margin-top:2px;">Disposal Fee Paid: ₹1,500 / Ton</p>
        </div>

        <div style="text-align:center;">
          <div style="background:linear-gradient(135deg, #10b981, #06b6d4); color:#000; font-weight:800; padding:12px 18px; border-radius:30px; font-size:12px; letter-spacing:0.5px;">
            🤖 AI MATCH ENGINE<br/>Waste-to-Resource
          </div>
          <div style="font-size:24px; color:var(--primary); margin-top:8px;">➔ ➔ ➔</div>
        </div>

        <div style="background:rgba(6, 182, 212, 0.08); border:2px solid var(--secondary); border-radius:var(--radius-md); padding:20px;">
          <h4 style="color:var(--secondary); font-size:16px; margin-bottom:8px;">FACTORY B (Pipe Manufacturer)</h4>
          <p style="font-size:13px; color:var(--text-main);"><strong>Secondary Feedstock:</strong> Buys Feedstock @ 30% Discount</p>
          <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">New Path: Circular Product Input</p>
          <p style="font-size:12px; color:var(--primary); margin-top:2px;">Cuts Virgin Polymer Material Costs</p>
        </div>
      </div>

      <div style="background:rgba(15, 23, 42, 0.9); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:18px; text-align:center;">
        <h4 style="color:var(--primary); font-size:15px; margin-bottom:6px;">ECOSYSTEM IMPACT & REVENUE CREATION</h4>
        <div style="font-size:20px; font-weight:800; color:var(--text-main);">
          Disposal Cost Saved + Sales Revenue = <span style="color:var(--primary);">+₹3,00,000 / year</span>
        </div>
        <div style="display:flex; justify-content:center; gap:24px; font-size:13px; color:var(--text-muted); margin-top:8px;">
          <span>📉 Raw Material Cost ↓ 30%</span>
          <span>🗑️ Landfill Waste ↓ 85%</span>
          <span>🌱 Net Carbon Footprint ↓ 42%</span>
        </div>
      </div>
    </div>
  `;
}
