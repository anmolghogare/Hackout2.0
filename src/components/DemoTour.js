export function renderDemoTourModal() {
  return `
    <div id="demo-tour-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(7, 13, 25, 0.85); backdrop-filter:blur(10px); z-index:1000; align-items:center; justify-content:center;">
      <div style="background:var(--bg-card); border:2px solid var(--primary); border-radius:var(--radius-lg); padding:32px; max-width:600px; width:90%; box-shadow:0 0 40px var(--primary-glow); position:relative;">
        <button id="btn-close-tour" style="position:absolute; top:16px; right:16px; background:none; border:none; color:var(--text-muted); font-size:20px; cursor:pointer;">✕</button>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span style="font-size:12px; color:var(--primary); font-weight:800; text-transform:uppercase; letter-spacing:1px;" id="tour-step-badge">STEP 1 OF 5</span>
          <span style="font-size:12px; color:var(--text-muted);">ByteMe Hackathon Pitch Tour</span>
        </div>

        <h3 style="font-size:20px; font-weight:800; color:var(--text-main); margin-bottom:8px;" id="tour-title">1. Apex Packaging Baseline & Red Alerts</h3>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.6; margin-bottom:24px;" id="tour-desc">
          We begin by inspecting Apex Packaging Pvt. Ltd. baseline operational data. The Red Alert Rule Engine automatically flags Furnace Thermal Energy (48%) and Scrap Waste (17%) as Priority 1 & 2 hotspots breaching the 15% threshold.
        </p>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="pill-btn" id="btn-tour-prev" style="visibility:hidden;">← Previous</button>
          <button class="btn-primary" id="btn-tour-next">Next Step →</button>
        </div>
      </div>
    </div>
  `;
}

export const tourSteps = [
  {
    step: 1,
    tab: 'tab-overview',
    badge: 'STEP 1 OF 5: BASELINE DIAGNOSTIC',
    title: '1. Apex Packaging Baseline & Red Alerts',
    desc: 'Inspect Apex Packaging baseline operational data. The Red Alert Rule Engine automatically flags Furnace Thermal Energy (48%) and Scrap Waste (17%) as Priority 1 & 2 hotspots breaching the 15% threshold.'
  },
  {
    step: 2,
    tab: 'tab-whatif',
    badge: 'STEP 2 OF 5: WHAT-IF REGRESSION MODELING',
    title: '2. Empirical What-If Scale & Charts',
    desc: 'Move interactive sliders to test fuel substitution and raw material blends. Chart.js empirical regression curves model real-time CO₂ reductions and energy cost savings in INR (₹).'
  },
  {
    step: 3,
    tab: 'tab-copilot',
    badge: 'STEP 3 OF 5: AI SUSTAINABILITY COPILOT',
    title: '3. Conversational AI Plant Assistant',
    desc: 'Ask real-time operational questions. Backed by IPCC & CEA India datasets, the Copilot generates step-by-step costed action plans with net operational profit increases.'
  },
  {
    step: 4,
    tab: 'tab-circular',
    badge: 'STEP 4 OF 5: B2B CIRCULAR NETWORK',
    title: '4. AI Waste-to-Resource Matcher',
    desc: 'Replaces landfill dumping with an active B2B exchange network, connecting Factory A (Apex Packaging) ➔ Factory B (Pipe Manufacturer) to generate +₹3,00,000/year scrap sales revenue.'
  },
  {
    step: 5,
    tab: 'tab-roadmap',
    badge: 'STEP 5 OF 5: FINANCIAL ROI & ESG AUDIT REPORT',
    title: '5. Decarbonization Matrix & 1-Click ESG Report',
    desc: 'View the integrated roadmap (₹20.3L capital cost, 195 tCO₂e cut, ~10.5 months payback) and click "Download ESG Audit PDF" to export the official verified compliance report!'
  }
];
