import React from 'react';
import { Button } from '../../ui/Button';
import { Rocket, Play, ChevronRight, X, Sparkles } from 'lucide-react';
import { TabId } from '../../../types';

export interface JudgeTourBannerProps {
  isActive: boolean;
  currentStep: number;
  steps: { tab: TabId; title: string; desc: string }[];
  onStart: () => void;
  onNext: () => void;
  onStop: () => void;
}

export const JudgeTourBanner: React.FC<JudgeTourBannerProps> = ({
  isActive,
  currentStep,
  steps,
  onStart,
  onNext,
  onStop,
}) => {
  if (!isActive) {
    return (
      <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-[#141724] border border-slate-200/80 dark:border-white/[0.08] shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold font-heading text-slate-900 dark:text-white text-base">
                Interactive Judge Walkthrough Mode
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-extrabold border border-emerald-500/25">
                3-Min Demo Flow
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Auto-guided walkthrough: Telemetry Intake ➔ Digital Twin Canvas ➔ What-If Sandbox ➔ B2B Match ➔ BRSR Export
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={onStart}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center space-x-2 font-bold shadow-md shadow-emerald-500/15"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>🚀 Run 3-Min Judge Demo Flow</span>
        </Button>
      </div>
    );
  }

  const stepInfo = steps[currentStep] || steps[0];

  return (
    <div className="mb-6 p-5 rounded-2xl bg-emerald-600 dark:bg-emerald-600 text-white shadow-xl border border-emerald-500/50 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm shrink-0 font-mono">
            {currentStep + 1}/{steps.length}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold font-heading text-white text-base">
                {stepInfo.title}
              </span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <p className="text-xs text-emerald-100 mt-0.5">{stepInfo.desc}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={onNext}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 transition-all"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish & Open BRSR Export' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onStop}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Exit Demo Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

