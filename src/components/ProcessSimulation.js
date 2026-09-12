export function renderProcessSimulation(stages = []) {
  const defaultStages = [
    { name: "1. Raw Material", desc: "Virgin Polymer Resin (100T/mo)", monthly: 10, share: 10, status: "NORMAL" },
    { name: "2. Furnace Heating", desc: "Heavy Furnace Oil (1400°C)", monthly: 48, share: 48, status: "RED ALERT", priority: "PRIORITY 1" },
    { name: "3. Processing Line", desc: "Extrusion Line Operations", monthly: 25, share: 25, status: "EVALUATE" },
    { name: "4. Scrap Waste", desc: "Off-cut Trim Scrap (12T/mo)", monthly: 17, share: 17, status: "RED ALERT", priority: "PRIORITY 2" }
  ];

  const displayStages = stages.length > 0 ? stages : defaultStages;

  return `
    <div class="dashboard-card">
      <div class="card-title">
        <span>🏭 Functionality 1 & 2: Digital Factory Process Simulation & Red Alert Heatmap</span>
        <span style="font-size:12px; color:var(--danger); background:rgba(239, 68, 68, 0.15); padding:4px 10px; border-radius:12px; border:1px solid var(--danger);">
          RED ALERT RULE ENGINE (>15% HOTSPOT)
        </span>
      </div>
      <div class="card-subtitle">
        Activity-based carbon emission breakdown mapping Apex Packaging operational stages: Raw Material ➔ Furnace Heating ➔ Extrusion ➔ Scrap Waste.
      </div>

      <div class="process-flow-container">
        ${displayStages.map(stage => {
          const statusClass = (stage.status || "").toLowerCase().replace(" ", "-");
          return `
            <div class="process-stage-card ${statusClass}">
              <div class="stage-badge ${statusClass}">
                ${stage.alertPriority ? `${stage.alertPriority}: ${stage.status}` : stage.status}
              </div>
              <div class="stage-name">${stage.name}</div>
              <div class="stage-desc">${stage.desc || stage.description || ''}</div>
              <div class="stage-emission-value">
                ${stage.currentMonthlyCO2 || stage.monthly || stage.monthlyEmissionsTCO2e} <span style="font-size:13px; font-weight:normal;">tCO₂e/mo</span>
              </div>
              <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
                ${stage.sharePercentage || stage.share}% of Total Facility Footprint
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:16px;">
        <h4 style="color:var(--primary); font-size:14px; margin-bottom:6px;">⚡ Automated Diagnostic Takeaway:</h4>
        <p style="font-size:13px; color:var(--text-muted);">
          Furnace Thermal Energy (48 tCO₂e) and Scrap Waste (17 tCO₂e) breach the 15% threshold and are automatically flagged for <strong>Priority 1 & Priority 2 Red Alert Interventions</strong>.
        </p>
      </div>
    </div>
  `;
}
