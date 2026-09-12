import React, { useState } from 'react';
import { SliderInputs, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { SlidersHorizontal, RotateCcw, Zap, Thermometer, Flame, Recycle, Sparkles } from 'lucide-react';

export interface WhatIfSlidersProps {
  sliderInputs: SliderInputs;
  onSliderChange: (key: keyof SliderInputs, value: number) => void;
  onReset?: () => void;
  viewMode?: ViewMode;
}

export const WhatIfSliders: React.FC<WhatIfSlidersProps> = ({
  sliderInputs,
  onSliderChange,
  onReset,
  viewMode = 'carbon',
}) => {
  const [activeThresholdFlash, setActiveThresholdFlash] = useState<string | null>(null);

  const triggerHapticFlash = (label: string) => {
    setActiveThresholdFlash(label);
    setTimeout(() => setActiveThresholdFlash(null), 1200);
  };

  const handleSliderUpdate = (key: keyof SliderInputs, value: number) => {
    onSliderChange(key, value);
    if (key === 'fuelShiftPct' && value === 50) {
      triggerHapticFlash('🌱 50% Biomass Green Shift Milestone Achieved!');
    }
    if (key === 'scrapRecyclePct' && value === 100) {
      triggerHapticFlash('🌟 100% Zero-Waste Closed-Loop Scrap Diverted!');
    }
  };

  const isFinancial = viewMode === 'financial';

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
              </div>
              <span>What-If Empirical Decarbonization Controls</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Real-time thermal fuel shift, burner temperature optimization, PCR substitution, and scrap recycling sliders.
            </CardDescription>
          </div>
          {onReset && (
            <Button variant="outline" size="sm" onClick={onReset} className="flex items-center space-x-1.5 self-start sm:self-center">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Haptic Threshold Flash Banner */}
        {activeThresholdFlash && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center space-x-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>{activeThresholdFlash}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Slider 1: Fuel Shift */}
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 font-heading">
                <Flame className="w-4 h-4 text-emerald-500" />
                <span>Furnace Oil ➔ Biomass / PNG Fuel Shift</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {sliderInputs.fuelShiftPct}% {isFinancial ? 'Cost Cut' : 'Shift'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={sliderInputs.fuelShiftPct}
              onChange={(e) => handleSliderUpdate('fuelShiftPct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0% Heavy Oil</span>
              <span className="text-emerald-500 font-semibold">50% Hybrid Target</span>
              <span>100% PNG/Biomass</span>
            </div>
          </div>

          {/* Slider 2: Temp Cut */}
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 font-heading">
                <Thermometer className="w-4 h-4 text-emerald-500" />
                <span>Furnace Burner Thermal Optimization</span>
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
              onChange={(e) => handleSliderUpdate('tempReductionPct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0°C (1400°C Std)</span>
              <span>-10°C Nominal</span>
              <span>-20°C Max Optimization</span>
            </div>
          </div>

          {/* Slider 3: PCR Resin */}
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 font-heading">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span>Post-Consumer Recycled (PCR) Resin Blend</span>
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
              onChange={(e) => handleSliderUpdate('pcrResinPct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0% Virgin Resin</span>
              <span>25% Standard Target</span>
              <span>50% Max Capacity</span>
            </div>
          </div>

          {/* Slider 4: Scrap Diversion */}
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 font-heading">
                <Recycle className="w-4 h-4 text-emerald-500" />
                <span>Off-Cut Scrap Diversion & Closed-Loop Trade</span>
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
              onChange={(e) => handleSliderUpdate('scrapRecyclePct', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0% Landfill</span>
              <span>50% Partial Loop</span>
              <span className="text-emerald-500 font-semibold">100% Zero Landfill</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
