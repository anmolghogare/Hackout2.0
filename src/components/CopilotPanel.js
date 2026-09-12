export function renderCopilotPanel(copilotData = {}) {
  const defaultActionPlan = {
    aiTitle: "Live AI Copilot Operational Scenario Plan",
    summary: "Context-aware AI assistant monitoring Apex Packaging throughput against global emission factor databases (IPCC, CEA India).",
    actionItems: [
      {
        step: 1,
        title: "Reduce furnace thermal overshoot by 5%",
        co2Impact: "-9% CO₂ Reduction",
        financialImpact: "Annual Energy Savings: ₹3,50,000 / year"
      },
      {
        step: 2,
        title: "Substitute 20% virgin resin with certified PCR scrap",
        co2Impact: "-7% CO₂ Reduction",
        financialImpact: "Cost-Neutral Material Shift"
      },
      {
        step: 3,
        title: "Route 12T/mo off-cut scrap to Factory B via Circular Network",
        co2Impact: "-5% CO₂ Reduction",
        financialImpact: "Scrap Sales Revenue: +₹3,00,000 / year"
      }
    ],
    totalImpact: {
      co2ReductionPct: "21% Total CO₂ Reduction",
      annualProfitIncrease: "+₹6,50,000 / year Net Operational Profit Increase"
    }
  };

  const data = copilotData.data || defaultActionPlan;

  return `
    <div class="dashboard-card">
      <div class="card-title">
        <span>🤖 Functionality 3: AI Workflow Monitoring & Sustainability Copilot</span>
        <span style="font-size:12px; color:var(--accent-purple); background:rgba(139, 92, 246, 0.15); padding:4px 10px; border-radius:12px; border:1px solid var(--accent-purple);">
          IPCC & CEA INDIA DATASETS
        </span>
      </div>
      <div class="card-subtitle">
        Ask real-time plant operational queries to generate costed, ROI-evaluated circular action plans for Apex Packaging.
      </div>

      <div class="copilot-chat-container">
        <div class="preset-pills">
          <button class="pill-btn" onclick="document.getElementById('copilot-query').value='How can I reduce plant emissions by 20% without increasing net operational cost?'">
            💡 Reduce emissions by 20% without cost increase?
          </button>
          <button class="pill-btn" onclick="document.getElementById('copilot-query').value='What is the capital payback for switching 50% furnace fuel to PNG/Biomass?'">
            💰 Payback for 50% PNG/Biomass fuel shift?
          </button>
          <button class="pill-btn" onclick="document.getElementById('copilot-query').value='How much scrap waste can we monetize through B2B circular network?'">
            🔄 B2B scrap monetization potential?
          </button>
        </div>

        <div class="copilot-input-row">
          <input type="text" id="copilot-query" class="copilot-input" value="How can I reduce plant emissions by 20% without increasing net operational cost?" placeholder="Ask Copilot a plant operational question..." />
          <button class="btn-primary" id="btn-copilot-ask">Ask AI Copilot</button>
        </div>

        <div class="action-plan-card" id="copilot-results-container">
          <h4 style="color:var(--primary); font-size:16px; margin-bottom:4px;">${data.aiTitle}</h4>
          <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">${data.summary}</p>

          ${(data.actionItems || []).map(item => `
            <div class="action-step">
              <div class="step-num">${item.step}</div>
              <div>
                <div style="font-weight:700; font-size:14px; color:var(--text-main);">${item.title}</div>
                <div style="font-size:13px; color:var(--primary); margin-top:2px;">
                  ${item.co2Impact} &nbsp;|&nbsp; <span style="color:var(--secondary);">${item.financialImpact}</span>
                </div>
              </div>
            </div>
          `).join('')}

          <div style="margin-top:16px; padding-top:16px; border-top:1px dashed var(--border-card); font-weight:800; color:var(--text-main); font-size:14px; display:flex; justify-content:space-between;">
            <span style="color:var(--primary);">${data.totalImpact?.co2ReductionPct || '21% Total CO₂ Reduction'}</span>
            <span style="color:var(--secondary);">${data.totalImpact?.annualProfitIncrease || '+₹6,50,000 / year Profit Increase'}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
