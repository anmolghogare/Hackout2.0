export function renderProcessSimulation(stages = []) {
  const defaultStages = [
    { name: "1. RAW MATERIAL", desc: "Virgin Polymer Resin (100T/mo)", monthly: 10, share: 10, status: "NORMAL" },
    { name: "2. FURNACE HEATING", desc: "Heavy Furnace Oil (1400°C)", monthly: 48, share: 48, status: "RED ALERT", priority: "PRIORITY 1" },
    { name: "3. PROCESSING LINE", desc: "Extrusion Line Operations", monthly: 25, share: 25, status: "EVALUATE" },
    { name: "4. WASTE SCRAP", desc: "Off-cut Trim Scrap (12T/mo)", monthly: 17, share: 17, status: "RED ALERT", priority: "PRIORITY 2" }
  ];

  const displayStages = stages.length > 0 ? stages : defaultStages;

  return `
    <div class="dashboard-card">
      <div class="card-title">
        <div class="card-title-left">
          <span class="card-icon">🏭</span>
          <span>Functionality 1 & 2: Digital Factory Process Simulation & Emission Red Alert System</span>
        </div>
        <span class="rule-engine-tag">
          🚨 RED ALERT RULE ENGINE (>15% THRESHOLD)
        </span>
      </div>
      <div class="card-subtitle">
        Digital process representation mapping Apex Packaging floor stages: Raw Material ➔ Furnace Heating ➔ Processing Line ➔ Scrap Waste with automated activity-level carbon diagnostics.
      </div>

      <!-- Process Stage Cards Flow -->
      <div class="process-flow-container">
        ${displayStages.map((stage, idx) => {
          const statusClass = (stage.status || "").toLowerCase().replace(" ", "-");
          const isRed = statusClass === 'red-alert';
          const isEval = statusClass === 'evaluate';
          
          return `
            <div class="process-stage-card ${statusClass}">
              <div class="stage-header">
                <span class="stage-number">0${idx + 1}</span>
                <span class="stage-badge ${statusClass}">
                  ${stage.alertPriority ? `${stage.alertPriority}: ${stage.status}` : stage.status}
                </span>
              </div>
              <div class="stage-name">${stage.name}</div>
              <div class="stage-desc">${stage.desc || stage.description || ''}</div>
              
              <div class="stage-metric-row">
                <div class="stage-emission-value ${isRed ? 'danger-text' : isEval ? 'warning-text' : 'primary-text'}">
                  ${stage.currentMonthlyCO2 || stage.monthly || stage.monthlyEmissionsTCO2e} 
                  <span class="unit-text">tCO₂e/mo</span>
                </div>
                <div class="stage-share-badge">
                  ${stage.sharePercentage || stage.share}% Share
                </div>
              </div>

              <!-- Progress bar indicator -->
              <div class="stage-progress-bar">
                <div class="stage-progress-fill ${statusClass}" style="width: ${Math.min(100, (stage.sharePercentage || stage.share || 10) * 1.8)}%;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Hotspot Split Pie Chart & Red Alert Rule Breakdown -->
      <div class="process-analytics-row">
        <div class="chart-container-card">
          <h4 class="chart-title">Apex Packaging: Baseline Emission Hotspot Split</h4>
          <div class="canvas-wrapper">
            <canvas id="chart-hotspot-pie"></canvas>
          </div>
        </div>

        <div class="alert-engine-card">
          <div class="engine-header">
            <span class="engine-icon">⚡</span>
            <h4>Automated Diagnostic & Priority Alert Rule Engine</h4>
          </div>
          <p class="engine-desc">
            The system continuously measures activity-level carbon scores across operational stages. Any stage exceeding <strong>15% of total facility emissions</strong> triggers an automated Red Alert for urgent priority intervention.
          </p>
          
          <div class="alert-item priority-1">
            <div class="alert-item-header">
              <span class="alert-tag p1">PRIORITY 1 RED ALERT</span>
              <span class="alert-stage">2. Furnace Thermal Energy (48 tCO₂e)</span>
            </div>
            <div class="alert-details">Heating at 1400°C using heavy furnace oil generates 48% of facility emissions. Action: Switch 50% fuel mix to PNG/Biomass.</div>
          </div>

          <div class="alert-item priority-2">
            <div class="alert-item-header">
              <span class="alert-tag p2">PRIORITY 2 RED ALERT</span>
              <span class="alert-stage">4. Scrap Waste Stream (17 tCO₂e)</span>
            </div>
            <div class="alert-details">12 Tons/month of off-cut trim scrap. Action: Inline re-granulation & B2B Waste-to-Resource matching.</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
