import { renderHeader } from './components/Header.js';
import { renderProcessSimulation } from './components/ProcessSimulation.js';
import { renderWhatIfSliders } from './components/WhatIfSliders.js';
import { renderChartsPanel } from './components/ChartsPanel.js';
import { renderCopilotPanel } from './components/CopilotPanel.js';
import { renderCircularNetwork } from './components/CircularNetwork.js';
import { renderRoadmapTable } from './components/RoadmapTable.js';
import { renderDemoTourModal } from './components/DemoTour.js';

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
          🏭 Process Heatmap & Red Alert
        </button>
        <button class="tab-btn" data-tab="tab-whatif">
          🎛️ What-If Scale & Empirical Charts
        </button>
        <button class="tab-btn" data-tab="tab-copilot">
          🤖 AI Sustainability Copilot
        </button>
        <button class="tab-btn" data-tab="tab-circular">
          🔄 B2B Waste Exchange Network
        </button>
        <button class="tab-btn" data-tab="tab-roadmap">
          📊 Financial ROI Matrix & ESG Report
        </button>
      </nav>

      <main class="main-container">
        <!-- Tab 1: Overview & Heatmap -->
        <div id="tab-overview" class="tab-content active">
          ${renderProcessSimulation(stages)}
        </div>

        <!-- Tab 2: What-If Scale & Charts -->
        <div id="tab-whatif" class="tab-content">
          ${renderWhatIfSliders(sliderInputs)}
          ${renderChartsPanel()}
          ${renderProcessSimulation(stages)}
        </div>

        <!-- Tab 3: AI Copilot -->
        <div id="tab-copilot" class="tab-content">
          ${renderCopilotPanel(copilotData)}
        </div>

        <!-- Tab 4: B2B Circular Network -->
        <div id="tab-circular" class="tab-content">
          ${renderCircularNetwork()}
        </div>

        <!-- Tab 5: Decarbonization Roadmap & ESG Report -->
        <div id="tab-roadmap" class="tab-content">
          ${renderRoadmapTable(roadmapData, state)}
        </div>
      </main>

      ${renderDemoTourModal()}
    </div>
  `;
}
