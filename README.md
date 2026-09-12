# 🏭 ByteMe — Industrial Emission Leak-Point Detector & Circular Alternative Recommender

> **HackOut'26 Hackathon Submission** | **Track**: Automated Industrial Carbon Decision Intelligence for SMEs  
> **Team**: ByteMe (*Anmol Ghogare, Divyanshu, Rohan Gohil, Riyan Mansuri*)  
> **Target Implementation Entity**: Apex Packaging Pvt. Ltd. (*Mid-Size SME Plastics & Packaging Facility, India Context*)

---

## 📌 Executive Summary

Small and Medium-sized Manufacturing Enterprises (SMEs) face high friction in isolating exact carbon emission leak-points. Traditional ESG consulting costs **₹10–25 Lakhs** per audit, while standard software produces static PDF reports without connecting carbon footprints to financial ROI.

**ByteMe** is a zero-hardware, cloud-native decision intelligence platform that transforms raw operational inputs into costed, ROI-evaluated circular interventions in Indian Rupees (**INR ₹**).

---

## 🏆 Key Features & Core Functionalities (5 / 5 Complete)

### 1. 🏭 Digital Factory Process Simulation & Red Alert Heatmap
- Activity-based carbon emission breakdown mapping Apex Packaging operational stages: `Raw Material` ➔ `Furnace Heating` ➔ `Extrusion Line` ➔ `Scrap Waste`.
- **Red Alert Rule Engine**: Automatically flags any operational stage exceeding **>15%** of total facility emissions (*Furnace Heating 48% [Priority 1] & Scrap Waste 17% [Priority 2]*).

### 2. 🎛️ Empirical What-If Scale & Chart.js Regression Visualizations
- Interactive range sliders for real-time mathematical modeling:
  - **Fuel Shift**: Furnace Oil ➔ PNG/Biomass (50% shift = -44% thermal CO₂)
  - **Thermal Overshoot**: Furnace temperature reduction (5% cut = ₹3,50,000/yr saved)
  - **PCR Blend**: Post-Consumer Recycled polymer substitution (40% blend = 120 tCO₂e/yr saved)
  - **Scrap Diversion**: 100% off-cut scrap diverted from landfill ➔ B2B exchange
- **Chart.js Empirical Visualizations**: Donut Hotspot Split, Material Throughput vs Carbon Footprint Curve, and Fuel Transition Regression Curves (*matching Page 8 of presentation deck*).

### 3. 🤖 AI Workflow Monitoring & Sustainability Copilot
- Context-aware natural language assistant powered by global emission factor databases (**IPCC & CEA India**).
- Answers plant operational queries (e.g., *"How can I reduce plant emissions by 20% without increasing net operational cost?"*) with step-by-step costed action plans and net profit impact.

### 4. 🔄 AI-Powered Waste-to-Resource Circular Network
- Active B2B by-product matcher replacing traditional linear route (`Factory ➔ Waste ➔ Landfill`).
- Links **Factory A** (*Apex Packaging, 12T/mo polymer trim scrap*) ➔ **AI Matcher** ➔ **Factory B** (*Pipe Manufacturer, secondary feedstock @ 30% discount*).
- Generates **+₹3,00,000 / year** scrap sales revenue, cuts landfill waste by **85%**, and reduces net facility carbon footprint by **42%**.

### 5. 📊 Integrated Decarbonization Roadmap & Financial Matrix
- Economically self-sustaining roadmap converting capital investment into rapid payback:
  - **Total Roadmap Capital Investment**: ₹20,30,000 (~20.3 Lakhs INR)
  - **Annual CO₂ Footprint Cut**: 195 tCO₂e / year (21% total facility footprint)
  - **Average Capital Payback Period**: **~10.5 Months**

### 6. 📄 1-Click Downloadable ESG Compliance Audit Report (PDF)
- Generates an official, verifiable ESG Audit Report (`Apex_Packaging_ESG_Audit_Report.pdf`) ready for regulatory submission or investor compliance.

### 7. 🎬 Pitch & Demo Guided Tour Stepper
- 5-step interactive presentation modal (**"🎬 Pitch Tour"**) designed for smooth live demonstrations to hackathon judges.

---

## 🛠️ Tech Stack & Architecture

```text
               +-------------------------------------------------+
               |             Frontend Interface                  |
               | (Vanilla JS + Glassmorphism CSS + Chart.js)     |
               +-----------------------+-------------------------+
                                       |
                                       v
               +-------------------------------------------------+
               |            Zero-Dependency Backend              |
               | (Node.js Native REST APIs - server/server.js)   |
               +-----------------------+-------------------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
                   v                                       v
    +------------------------------+       +------------------------------+
    | Baseline & Simulation Engine |       |    AI Copilot & B2B Matcher   |
    |  (Scope 1, 2, 3 Calculations)|       |   (IPCC & CEA India Data)    |
    +------------------------------+       +------------------------------+
```

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend UI** | Modern Vanilla JS + CSS3 + Chart.js + html2pdf | High-performance vector rendering for sliders, hotspot donut charts, regression plots, and PDF exports |
| **Backend API** | Node.js (Native HTTP Module) | Zero-dependency, sub-millisecond API response time for scenario recalculations |
| **Data Models** | JSON Schema / IPCC & CEA India Factors | Activity-based emission factor tables, regional buyer registries, and facility logs |

---

## ⚡ Quick Start & Running Locally

### Option A: One-Click Executable Script (Recommended)
```bash
./start.sh
```

### Option B: Node.js CLI
```bash
node server/server.js
```

The server will start on `http://localhost:5000`. Open [`index.html`](file:///Users/anmolghogare/Desktop/hackout2.0/index.html) in your browser to view the application live!

---

## 👥 Team ByteMe
- **Anmol Ghogare**
- **Divyanshu**
- **Rohan Gohil**
- **Riyan Mansuri**

---
