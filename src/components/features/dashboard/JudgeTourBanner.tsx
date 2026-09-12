import React from 'react';
import { Button } from '../../ui/Button';
import { Rocket, Play, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
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
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-slate-900/90 to-cyan-900/40 border border-emerald-500/40 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg animate-pulse shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold font-heading text-slate-900 dark:text-white text-base">
                Interactive Judge Walkthrough Mode
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                3-Min Demo Flow
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Auto-guided walkthrough: OCR Intake ➔ Digital Twin Canvas ➔ What-If Sandbox ➔ B2B Match ➔ BRSR Export
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={onStart}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>🚀 Run 3-Min Judge Demo Flow</span>
        </Button>
      </div>
    );
  }

  const stepInfo = steps[currentStep] || steps[0];

  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-700 text-white shadow-2xl backdrop-blur-xl border border-white/20 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-base shrink-0 font-mono">
            {currentStep + 1}/{steps.length}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold font-heading text-white text-base">
                {stepInfo.title}
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </div>
            <p className="text-xs text-emerald-100">{stepInfo.desc}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={onNext}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-xs shadow-lg flex items-center justify-center space-x-1.5 transition-all"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish & Open BRSR Export' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onStop}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Exit Demo Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
