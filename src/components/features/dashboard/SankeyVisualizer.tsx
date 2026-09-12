import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Recycle, ArrowUpRight, Truck, ShieldCheck, CheckCircle2, X, FileCheck, Sparkles, Building } from 'lucide-react';
import { ViewMode } from '../../../types';

export interface SankeyVisualizerProps {
  viewMode?: ViewMode;
}

export const SankeyVisualizer: React.FC<SankeyVisualizerProps> = ({ viewMode = 'carbon' }) => {
  const [selectedFlow, setSelectedFlow] = useState<number | null>(0);
  const [contractModalItem, setContractModalItem] = useState<any | null>(null);
  const [executedContracts, setExecutedContracts] = useState<Record<number, boolean>>({});
  const isFinancial = viewMode === 'financial';

  const matches = [
    {
      id: 0,
      flowName: 'Off-Cut LLDPE Polymer Trim Scrap',
      from: 'Apex Packaging Pvt. Ltd. (Factory A)',
      to: 'Apex HDPE Pipe Mfg (Factory B)',
      volume: '12 Tons / Month',
      discount: '30% Feedstock Cost Cut',
      distance: '18 km (Local Pune Industrial Belt)',
      avoidedCO2: '21.6 tCO₂e / Year',
      netSavingsINR: '₹3,00,000 / Year',
      matchScore: 98,
      terms: {
        settlement: 'Monthly Off-take Ledger',
        spec: 'Virgin-equivalent clean extrusion off-cut',
        compliance: 'SEBI BRSR Principle 6 Core Verified',
      },
    },
    {
      id: 1,
      flowName: 'Industrial Wood Waste & Agricultural Husk',
      from: 'GreenFuel Agro Biomass',
      to: 'Apex Packaging Furnace Unit (Factory A)',
      volume: '50 Tons / Month',
      discount: '44% Thermal Fuel Cost Cut',
      distance: '32 km (Chakan Zone)',
      avoidedCO2: '253.0 tCO₂e / Year',
      netSavingsINR: '₹4,20,000 / Year',
      matchScore: 94,
      terms: {
        settlement: 'Biomass Briquette Delivery Contract',
        spec: 'Calorific value > 4,200 kcal/kg',
        compliance: 'ISO 14064 Scope 1 Abatement Ready',
      },
    },
    {
      id: 2,
      flowName: 'Post-Consumer Recycled (PCR) Resin',
      from: 'ResinTech Circular Synthetics',
      to: 'Apex Polymer Blending Line (Factory A)',
      volume: '20 Tons / Month',
      discount: '25% Resin Cost Cut',
      distance: '65 km (Vapi Belt)',
      avoidedCO2: '48.0 tCO₂e / Year',
      netSavingsINR: '₹2,40,000 / Year',
      matchScore: 91,
      terms: {
        settlement: 'Certified Secondary Polymer Off-Take',
        spec: '99.2% Melt Flow Index Purity',
        compliance: 'EPR Certificate Credit Transferred',
      },
    },
  ];

  const handleExecuteContract = (item: any) => {
    setContractModalItem(item);
  };

  const handleConfirmContract = () => {
    if (contractModalItem) {
      setExecutedContracts((prev) => ({ ...prev, [contractModalItem.id]: true }));
      setContractModalItem(null);
    }
  };

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Recycle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>B2B Circular Waste Stream Sankey Visualizer</span>
            </CardTitle>
            <CardDescription>
              Interactive waste-to-feedstock flow paths mapping industrial byproduct diversion across regional SME clusters.
            </CardDescription>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-500/30">
            ESG Circular Economy Engine
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Interactive SVG Sankey Diagram */}
        <div className="relative p-6 rounded-2xl bg-slate-50/90 dark:bg-[#08101e] border border-slate-200/80 dark:border-slate-800 mb-8 shadow-xl overflow-x-auto">
          <div className="min-w-[700px] relative py-4">
            <h4 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
              <span>SUPPLIER SOURCE NODES</span>
              <span className="text-emerald-600 dark:text-emerald-400">CIRCULAR BYPRODUCT STREAMS (DUAL GRADIENT)</span>
              <span>RECEIVING CONSUMER NODES</span>
            </h4>

            {/* SVG Sankey Flow Lines */}
            <div className="relative h-64 flex items-center justify-between">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  {/* Stream 0 Dual Color Gradient (Emerald to Cyan Half Section Shift) */}
                  <linearGradient id="sankeyGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#10b981" stopOpacity="0.85" />
                    <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Stream 1 Dual Color Gradient */}
                  <linearGradient id="sankeyGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.85" />
                  </linearGradient>

                  {/* Stream 2 Dual Color Gradient */}
                  <linearGradient id="sankeyGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Stream 0 Path (B2B Circular Trim with Half Section Color Transition) */}
                <path
                  d="M 180 40 C 350 40, 350 180, 520 180"
                  stroke="url(#sankeyGrad0)"
                  strokeWidth={selectedFlow === 0 ? '14' : '7'}
                  strokeDasharray={selectedFlow === 0 ? '8 4' : undefined}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(0)}
                />

                {/* Stream 1 Path */}
                <path
                  d="M 180 120 C 350 120, 350 40, 520 40"
                  stroke="url(#sankeyGrad1)"
                  strokeWidth={selectedFlow === 1 ? '14' : '6'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(1)}
                />

                {/* Stream 2 Path */}
                <path
                  d="M 180 200 C 350 200, 350 120, 520 120"
                  stroke="url(#sankeyGrad2)"
                  strokeWidth={selectedFlow === 2 ? '14' : '6'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(2)}
                />
              </svg>

              {/* Node Column Left */}
              <div className="flex flex-col space-y-6 z-10 w-48">
                <div
                  onClick={() => setSelectedFlow(0)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 0
                      ? 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-500 shadow-lg shadow-emerald-500/20'
                      : 'bg-white/95 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block">Apex Packaging</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">12T Trim Scrap/mo (Seller)</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(1)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 1
                      ? 'bg-amber-50 dark:bg-amber-950/90 border-amber-500 shadow-lg shadow-amber-500/20'
                      : 'bg-white/95 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block">GreenFuel Agro</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">50T Biomass/mo (Supplier)</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(2)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 2
                      ? 'bg-blue-50 dark:bg-blue-950/90 border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'bg-white/95 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block">ResinTech Synthetics</span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">20T PCR Granules/mo</span>
                </div>
              </div>

              {/* Node Column Right */}
              <div className="flex flex-col space-y-6 z-10 w-48 text-right">
                <div
                  onClick={() => setSelectedFlow(1)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 1
                      ? 'bg-amber-50 dark:bg-amber-950/90 border-amber-500 shadow-lg'
                      : 'bg-white/95 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block">Apex Furnace Unit</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Biomass Receiver (Factory A)</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(2)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 2
                      ? 'bg-blue-50 dark:bg-blue-950/90 border-blue-500 shadow-lg'
                      : 'bg-white/95 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block">Apex Blending Line</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">PCR Feedstock Receiver</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(0)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 0
                      ? 'bg-cyan-50 dark:bg-cyan-950/90 border-cyan-500 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/95 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block">Apex Pipe Mfg</span>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">Scrap Buyer (Factory B)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {matches.map((item) => {
            const isSelected = selectedFlow === item.id;
            const isExecuted = executedContracts[item.id];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedFlow(item.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800/90 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                      {item.matchScore}% Match
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.discount}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 font-heading">
                    {item.flowName}
                  </h4>

                  <div className="space-y-2 text-xs py-3 border-y border-slate-200 dark:border-slate-700/60">
                    <div className="flex justify-between">
                      <span className="text-slate-500">From Node:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                        {item.from}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">To Node:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                        {item.to}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-1">
                      <span className="flex items-center space-x-1 text-slate-500">
                        <Truck className="w-3 h-3 text-slate-400" />
                        <span>{item.distance}</span>
                      </span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {isFinancial ? item.netSavingsINR : item.avoidedCO2}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <Button
                    variant={isExecuted ? 'secondary' : isSelected ? 'primary' : 'outline'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExecuteContract(item);
                    }}
                    className="w-full flex items-center justify-center space-x-1 font-bold"
                  >
                    {isExecuted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Contract Active & Deployed</span>
                      </>
                    ) : (
                      <>
                        <span>Execute Stream Contract</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Interactive Execute Stream Contract Modal */}
      {contractModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Execute Circular Stream Contract
                </h3>
              </div>
              <button
                onClick={() => setContractModalItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="text-slate-500">Material Stream:</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {contractModalItem.flowName}
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  <span>Monthly Off-Take Volume:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{contractModalItem.volume}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 block">Carbon Abatement</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {contractModalItem.avoidedCO2}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 block">Annual Financial ROI</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {contractModalItem.netSavingsINR}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
                <div className="font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO 14064 & SEBI BRSR Principle 6 Protocol</span>
                </div>
                <div>Automated cryptographic telemetry ledger deployment with verified recipient audit logs.</div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setContractModalItem(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmContract} className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sign & Deploy Contract to Ledger</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
