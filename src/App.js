import { renderHeader } from './components/Header.js';
import { renderProjectOverview } from './components/ProjectOverview.js';
import { renderProcessSimulation } from './components/ProcessSimulation.js';
import { renderWhatIfSliders } from './components/WhatIfSliders.js';
import { renderCopilotPanel } from './components/CopilotPanel.js';
import { renderCircularNetwork } from './components/CircularNetwork.js';
import { renderRoadmapTable } from './components/RoadmapTable.js';

export function App(state = {}) {
  const {
    kpiData = {},
    stages = [],
    sliderInputs = { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 },
    copilotData = {},
    roadmapData = []
  } = state;

  return `
    <div class="app-layout">
      ${renderHeader(kpiData)}

      <nav class="nav-tabs">
        <button class="tab-btn active" data-tab="tab-overview">
          📌 Project Context & Mission
        </button>
        <button class="tab-btn" data-tab="tab-simulation">
          🏭 Process Heatmap & Red Alert
        </button>
        <button class="tab-btn" data-tab="tab-whatif">
          🎛️ What-If Scale & Substitution
        </button>
        <button class="tab-btn" data-tab="tab-copilot">
          🤖 AI Sustainability Copilot
        </button>
        <button class="tab-btn" data-tab="tab-circular">
          🔄 B2B Waste Exchange Network
        </button>
        <button class="tab-btn" data-tab="tab-roadmap">
          📊 Financial ROI Matrix & Roadmap
        </button>
      </nav>

      <main class="main-container">
        <!-- Tab 1: Executive Overview & Entity Profile -->
        <div id="tab-overview" class="tab-content active">
          ${renderProjectOverview()}
          ${renderProcessSimulation(stages)}
        </div>

        <!-- Tab 2: Digital Factory Process Simulation & Red Alert System -->
        <div id="tab-simulation" class="tab-content">
          ${renderProcessSimulation(stages)}
        </div>

        <!-- Tab 3: What-If Scale & Empirical Regression Sliders -->
        <div id="tab-whatif" class="tab-content">
          ${renderWhatIfSliders(sliderInputs)}
        </div>

        <!-- Tab 4: AI Copilot -->
        <div id="tab-copilot" class="tab-content">
          ${renderCopilotPanel(copilotData)}
        </div>

        <!-- Tab 5: B2B Circular Network -->
        <div id="tab-circular" class="tab-content">
          ${renderCircularNetwork()}
        </div>

        <!-- Tab 6: Decarbonization Roadmap & Financial Matrix -->
        <div id="tab-roadmap" class="tab-content">
          ${renderRoadmapTable(roadmapData)}
        </div>
      </main>
    </div>
  `;
}
