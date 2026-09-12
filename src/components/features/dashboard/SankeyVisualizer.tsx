import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Recycle, ArrowUpRight, Truck, ShieldCheck, CheckCircle2, X, FileCheck } from 'lucide-react';
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Recycle className="w-5 h-5 text-emerald-500" />
              </div>
              <span>B2B Circular Waste Stream Sankey Visualizer</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Interactive waste-to-feedstock flow paths mapping industrial byproduct diversion across regional SME manufacturing clusters.
            </CardDescription>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 font-mono self-start sm:self-center">
            Circular Economy Engine
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Interactive SVG Sankey Diagram */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-50/90 dark:bg-[#0C0E17] border border-slate-200/80 dark:border-white/[0.08] shadow-xs overflow-x-auto">
          <div className="min-w-[700px] relative py-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center justify-between">
              <span>SUPPLIER SOURCE NODES</span>
              <span className="text-emerald-600 dark:text-emerald-400">CIRCULAR BYPRODUCT FLOW STREAMS</span>
              <span>RECEIVING CONSUMER NODES</span>
            </h4>

            {/* SVG Sankey Flow Lines */}
            <div className="relative h-64 flex items-center justify-between">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="sankeyGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="sankeyGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="sankeyGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Stream 0 Path */}
                <path
                  d="M 180 40 C 350 40, 350 180, 520 180"
                  stroke="url(#sankeyGrad0)"
                  strokeWidth={selectedFlow === 0 ? '10' : '5'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(0)}
                />

                {/* Stream 1 Path */}
                <path
                  d="M 180 120 C 350 120, 350 40, 520 40"
                  stroke="url(#sankeyGrad1)"
                  strokeWidth={selectedFlow === 1 ? '10' : '5'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(1)}
                />

                {/* Stream 2 Path */}
                <path
                  d="M 180 200 C 350 200, 350 120, 520 120"
                  stroke="url(#sankeyGrad2)"
                  strokeWidth={selectedFlow === 2 ? '10' : '5'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(2)}
                />
              </svg>

              {/* Node Column Left */}
              <div className="flex flex-col space-y-6 z-10 w-48">
                <div
                  onClick={() => setSelectedFlow(0)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 0
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/30'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block font-heading">Apex Packaging</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">12T Trim Scrap/mo (Seller)</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(1)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 1
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/30'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block font-heading">GreenFuel Agro</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">50T Biomass/mo (Supplier)</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(2)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 2
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/30'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block font-heading">ResinTech Synthetics</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">20T PCR Granules/mo</span>
                </div>
              </div>

              {/* Node Column Right */}
              <div className="flex flex-col space-y-6 z-10 w-48 text-right">
                <div
                  onClick={() => setSelectedFlow(1)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 1
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/30'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block font-heading">Apex Furnace Unit</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Biomass Receiver (Factory A)</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(2)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 2
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/30'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block font-heading">Apex Blending Line</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">PCR Feedstock Receiver</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(0)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 0
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/30'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white block font-heading">Apex Pipe Mfg</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Scrap Buyer (Factory B)</span>
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
                    ? 'bg-white dark:bg-[#0D0F18] border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                    : 'bg-slate-50/80 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {item.matchScore}% Match
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.discount}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 font-heading">
                    {item.flowName}
                  </h4>

                  <div className="space-y-2 text-xs py-3 border-y border-slate-200/80 dark:border-white/[0.06]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">From Node:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                        {item.from}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">To Node:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                        {item.to}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-1">
                      <span className="flex items-center space-x-1 text-slate-400">
                        <Truck className="w-3.5 h-3.5" />
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
                    className="w-full flex items-center justify-center space-x-1.5 font-bold"
                  >
                    {isExecuted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Contract Deployed</span>
                      </>
                    ) : (
                      <>
                        <span>Execute Stream Contract</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0D0F18] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] pb-3">
              <div className="flex items-center space-x-2.5">
                <FileCheck className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  Execute Circular Stream Contract
                </h3>
              </div>
              <button
                onClick={() => setContractModalItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] space-y-1.5">
                <div className="text-slate-400">Material Stream:</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {contractModalItem.flowName}
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-300">
                  <span>Monthly Off-Take Volume:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{contractModalItem.volume}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
                  <span className="text-slate-400 block">Carbon Abatement</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {contractModalItem.avoidedCO2}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
                  <span className="text-slate-400 block">Annual Financial ROI</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {contractModalItem.netSavingsINR}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
                <div className="font-bold flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO 14064 & SEBI BRSR Principle 6 Protocol</span>
                </div>
                <div>Automated cryptographic telemetry ledger deployment with verified recipient audit logs.</div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200/80 dark:border-white/[0.08]">
              <Button variant="outline" size="sm" onClick={() => setContractModalItem(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmContract} className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Deploy to Ledger</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
