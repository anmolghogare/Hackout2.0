import React from 'react';
import { SliderInputs } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { SlidersHorizontal, RotateCcw, Zap, Thermometer, Flame, Recycle } from 'lucide-react';

export interface WhatIfSlidersProps {
  sliderInputs: SliderInputs;
  onSliderChange: (key: keyof SliderInputs, value: number) => void;
  onReset?: () => void;
}

export const WhatIfSliders: React.FC<WhatIfSlidersProps> = ({
  sliderInputs,
  onSliderChange,
  onReset,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
              <span>What-If Empirical Decarbonization Controls</span>
            </CardTitle>
            <CardDescription>
              Adjust fuel transitions, thermal efficiency, PCR resin substitution, and scrap circularity in real time.
            </CardDescription>
          </div>
          {onReset && (
            <Button variant="outline" size="sm" onClick={onReset} className="flex items-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider 1: Fuel Transition */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Furnace Oil ➔ Biomass / PNG Fuel Shift</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {sliderInputs.fuelShiftPct}% Shift
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={sliderInputs.fuelShiftPct}
              onChange={(e) => onSliderChange('fuelShiftPct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0% (100% Furnace Oil)</span>
              <span>50% Hybrid</span>
              <span>100% Biomass/Solar</span>
            </div>
          </div>

          {/* Slider 2: Temp Cut */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Thermometer className="w-4 h-4 text-amber-500" />
                <span>Furnace Temperature Optimization</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                -{sliderInputs.tempReductionPct}°C Cut
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={sliderInputs.tempReductionPct}
              onChange={(e) => onSliderChange('tempReductionPct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0°C (1400°C Standard)</span>
              <span>10°C Cut</span>
              <span>20°C Cut (Max Efficiency)</span>
            </div>
          </div>

          {/* Slider 3: PCR Polymer */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Zap className="w-4 h-4 text-cyan-500" />
                <span>Post-Consumer Recycled (PCR) Polymer Blend</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {sliderInputs.pcrResinPct}% PCR Blend
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={sliderInputs.pcrResinPct}
              onChange={(e) => onSliderChange('pcrResinPct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0% (Virgin Resin)</span>
              <span>25% Standard Blend</span>
              <span>50% Max Structural Capacity</span>
            </div>
          </div>

          {/* Slider 4: Scrap Recycle */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Recycle className="w-4 h-4 text-emerald-500" />
                <span>Scrap Diversion & Closed-Loop Recycling</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {sliderInputs.scrapRecyclePct}% Diverted
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={sliderInputs.scrapRecyclePct}
              onChange={(e) => onSliderChange('scrapRecyclePct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0% (Landfill Waste)</span>
              <span>50% Partial Loop</span>
              <span>100% Zero Scrap Waste</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
