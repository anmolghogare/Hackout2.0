import React from 'react';
import { ProcessStage } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Flame, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export interface ProcessSimulationProps {
  stages: ProcessStage[];
}

export const ProcessSimulation: React.FC<ProcessSimulationProps> = ({ stages }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <span>Process Leak-Point Hotspots & Red Alert System</span>
            </CardTitle>
            <CardDescription>
              Live breakdown of manufacturing stages, carbon share, and high-emission alert flags.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/30 flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5" />
              <span>⚡ AI Telemetry Leak Monitor</span>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, idx) => {
            const isRedAlert = stage.status === 'RED ALERT';
            const isEvaluate = stage.status === 'EVALUATE';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isRedAlert
                    ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/40 hover:border-rose-500'
                    : isEvaluate
                    ? 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/40 hover:border-amber-500'
                    : 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {stage.name}
                  </span>
                  <Badge
                    variant={
                      isRedAlert ? 'alert' : isEvaluate ? 'warning' : 'normal'
                    }
                  >
                    {stage.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3 min-h-[32px]">
                  {stage.desc}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Monthly Footprint</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {stage.currentMonthlyCO2} tCO₂e
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isRedAlert
                          ? 'bg-rose-500'
                          : isEvaluate
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, stage.sharePercentage * 2)}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                    <span>Emission Share</span>
                    <span className="font-mono font-semibold">{stage.sharePercentage}%</span>
                  </div>
                </div>

                {stage.alertPriority && (
                  <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center space-x-1.5 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{stage.alertPriority}: Action Required</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
