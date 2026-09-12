export function renderCopilotPanel(copilotData = {}) {
  const defaultActionPlan = {
    aiTitle: "Live AI Copilot Operational Scenario Case Study",
    summary: "AI engine continuously monitoring facility throughput, energy mix, and scrap production against global emission databases (IPCC, CEA India).",
    actionItems: [
      {
        step: 1,
        title: "Reduce furnace thermal overshoot by 5%",
        co2Impact: "CO₂ Reduction: -9%",
        financialImpact: "Annual Energy Savings: ₹3,50,000 / year"
      },
      {
        step: 2,
        title: "Substitute 20% virgin resin with certified PCR scrap",
        co2Impact: "CO₂ Reduction: -7%",
        financialImpact: "Financial Impact: Cost-Neutral Material Shift"
      },
      {
        step: 3,
        title: "Route 12T/mo off-cut scrap to Factory B via Circular Network",
        co2Impact: "CO₂ Reduction: -5%",
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
        <div class="card-title-left">
          <span class="card-icon">🤖</span>
          <span>Functionality 3: AI Workflow Monitoring & Sustainability Copilot</span>
        </div>
        <span class="badge-purple">
          IPCC & CEA INDIA DATABASES
        </span>
      </div>
      <div class="card-subtitle">
        Context-aware natural language AI assistant embedded directly inside the dashboard. Translates plant operational queries into costed, ROI-evaluated circular action plans for Apex Packaging.
      </div>

      <div class="copilot-interface">
        <!-- Preset Prompt Pills -->
        <div class="preset-pills-container">
          <span class="pills-label">💡 Recommended Operational Scenarios:</span>
          <div class="preset-pills">
            <button class="pill-btn" onclick="document.getElementById('copilot-query').value='How can I reduce plant emissions by 20% without increasing net operational cost?'">
              🎯 Reduce emissions by 20% cost-neutrally?
            </button>
            <button class="pill-btn" onclick="document.getElementById('copilot-query').value='What is the capital payback for switching 50% furnace fuel to PNG/Biomass?'">
              🔥 Payback for 50% PNG/Biomass fuel shift?
            </button>
            <button class="pill-btn" onclick="document.getElementById('copilot-query').value='How much scrap waste can we monetize through B2B circular network?'">
              🔄 B2B scrap monetization potential?
            </button>
          </div>
        </div>

        <!-- Input Row -->
        <div class="copilot-input-box">
          <input 
            type="text" 
            id="copilot-query" 
            class="copilot-input" 
            value="How can I reduce plant emissions by 20% without increasing net operational cost?" 
            placeholder="Ask Copilot any plant operational query..." 
          />
          <button class="btn-primary" id="btn-copilot-ask">
            <span>✨ Ask AI Copilot</span>
          </button>
        </div>

        <!-- Action Plan Result Box -->
        <div class="action-plan-container" id="copilot-results-container">
          <div class="plan-header">
            <div class="plan-title-group">
              <span class="plan-badge">AI GENERATED ACTION PLAN</span>
              <h3 class="plan-title">${data.aiTitle}</h3>
            </div>
            <span class="plan-source">Verified against IPCC & CEA India Factors</span>
          </div>

          <p class="plan-summary">${data.summary}</p>

          <div class="action-steps-list">
            ${(data.actionItems || []).map(item => `
              <div class="action-step-card">
                <div class="step-badge">${item.step}</div>
                <div class="step-content">
                  <h4 class="step-title">${item.title}</h4>
                  <div class="step-impacts">
                    <span class="impact-co2">${item.co2Impact}</span>
                    <span class="impact-divider">•</span>
                    <span class="impact-finance">${item.financialImpact}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Total Integrated Result Banner -->
          <div class="integrated-result-banner">
            <div class="result-item">
              <span class="result-label">TOTAL INTEGRATED PLAN RESULT</span>
              <span class="result-val green">${data.totalImpact?.co2ReductionPct || '21% Total CO₂ Reduction'}</span>
            </div>
            <div class="result-divider"></div>
            <div class="result-item">
              <span class="result-label">NET PROFIT IMPACT</span>
              <span class="result-val cyan">${data.totalImpact?.annualProfitIncrease || '+₹6,50,000 / year Net Operational Profit Increase'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
