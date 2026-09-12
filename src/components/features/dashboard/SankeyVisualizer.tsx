import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Recycle, ArrowUpRight, MapPin, Building2, Truck, DollarSign, Leaf, ShieldCheck } from 'lucide-react';
import { ViewMode } from '../../../types';
import { formatINR } from '../../../lib/utils';

export interface SankeyVisualizerProps {
  viewMode?: ViewMode;
}

export const SankeyVisualizer: React.FC<SankeyVisualizerProps> = ({ viewMode = 'carbon' }) => {
  const [selectedFlow, setSelectedFlow] = useState<number | null>(0);
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
    },
  ];

  const activeMatch = selectedFlow !== null ? matches[selectedFlow] : matches[0];

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Recycle className={`w-5 h-5 ${isFinancial ? 'text-purple-500' : 'text-emerald-500'}`} />
              <span>B2B Circular Waste Stream Sankey Visualizer</span>
            </CardTitle>
            <CardDescription>
              Interactive waste-to-feedstock flow paths mapping industrial byproduct diversion across regional SME clusters.
            </CardDescription>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            ESG Circular Economy Engine
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Interactive SVG Sankey Diagram */}
        <div className="relative p-6 rounded-2xl bg-slate-900 dark:bg-[#08101e] border border-slate-800 mb-8 shadow-2xl overflow-x-auto">
          <div className="min-w-[700px] relative py-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
              <span>SUPPLIER SOURCE NODES</span>
              <span>CIRCULAR BYPRODUCT STREAMS</span>
              <span>RECEIVING CONSUMER NODES</span>
            </h4>

            {/* SVG Sankey Flow Lines */}
            <div className="relative h-64 flex items-center justify-between">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="sankeyGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="sankeyGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="sankeyGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Stream 0 Path */}
                <path
                  d="M 180 40 C 350 40, 350 180, 520 180"
                  stroke={selectedFlow === 0 ? '#10b981' : 'rgba(16, 185, 129, 0.25)'}
                  strokeWidth={selectedFlow === 0 ? '12' : '6'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(0)}
                />

                {/* Stream 1 Path */}
                <path
                  d="M 180 120 C 350 120, 350 40, 520 40"
                  stroke={selectedFlow === 1 ? '#f59e0b' : 'rgba(245, 158, 11, 0.25)'}
                  strokeWidth={selectedFlow === 1 ? '12' : '6'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(1)}
                />

                {/* Stream 2 Path */}
                <path
                  d="M 180 200 C 350 200, 350 120, 520 120"
                  stroke={selectedFlow === 2 ? '#3b82f6' : 'rgba(59, 130, 246, 0.25)'}
                  strokeWidth={selectedFlow === 2 ? '12' : '6'}
                  fill="none"
                  className="transition-all duration-300 pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedFlow(2)}
                />
              </svg>

              {/* Node Column Left */}
              <div className="flex flex-col space-y-6 z-10 w-44">
                <div
                  onClick={() => setSelectedFlow(0)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 0
                      ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-white block">Apex Packaging</span>
                  <span className="text-[10px] text-emerald-400">12T Trim Scrap/mo</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(1)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 1
                      ? 'bg-amber-950/80 border-amber-500 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-white block">GreenFuel Agro</span>
                  <span className="text-[10px] text-amber-400">50T Biomass/mo</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(2)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 2
                      ? 'bg-blue-950/80 border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-white block">ResinTech Synthetics</span>
                  <span className="text-[10px] text-blue-400">20T PCR Granules/mo</span>
                </div>
              </div>

              {/* Node Column Right */}
              <div className="flex flex-col space-y-6 z-10 w-44 text-right">
                <div
                  onClick={() => setSelectedFlow(1)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 1
                      ? 'bg-amber-950/80 border-amber-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-white block">Apex Furnace Unit</span>
                  <span className="text-[10px] text-amber-400">Biomass Fuel Receiver</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(2)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 2
                      ? 'bg-blue-950/80 border-blue-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-white block">Apex Blending Line</span>
                  <span className="text-[10px] text-blue-400">PCR Polymer Feedstock</span>
                </div>

                <div
                  onClick={() => setSelectedFlow(0)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFlow === 0
                      ? 'bg-emerald-950/80 border-emerald-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-white block">Apex Pipe Mfg</span>
                  <span className="text-[10px] text-emerald-400">Scrap Polymer Consumer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matches.map((item) => {
            const isSelected = selectedFlow === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFlow(item.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-slate-800/90 border-emerald-500 shadow-xl shadow-emerald-500/10 scale-102'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={item.matchScore > 95 ? 'normal' : 'info'}>
                      {item.matchScore}% Match
                    </Badge>
                    <span className="text-xs font-mono font-bold text-emerald-500">
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
                    variant={isSelected ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full flex items-center justify-center space-x-1"
                  >
                    <span>Execute Stream Contract</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
