import React, { useMemo, useState } from 'react';
import { SavedScenario, SliderInputs, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Layers, Plus, Trash2 } from 'lucide-react';

export interface ScenarioSandboxProps {
  scenarios: SavedScenario[];
  onSaveCurrentScenario: (name: string) => void;
  onDeleteScenario: (id: string) => void;
  onLoadScenario: (inputs: SliderInputs) => void;
  viewMode?: ViewMode;
}

const inrLakh = (n: number) => `₹${n.toFixed(1)}L`;

/** Deterministic plant-scale scores. Do not use broken KPI floats. */
function score(s: SliderInputs) {
  const annualT = s.fuelShiftPct * 2.4 + s.tempReductionPct * 2.6 + s.pcrResinPct * 1.6 + s.scrapRecyclePct * 0.32;
  const saveL = s.fuelShiftPct * 0.084 + s.tempReductionPct * 0.028 + s.pcrResinPct * 0.012 + s.scrapRecyclePct * 0.03;
  const capexL = s.fuelShiftPct >= 70 ? 35 : s.fuelShiftPct >= 40 ? 15.4 : s.pcrResinPct >= 20 ? 15 : s.scrapRecyclePct >= 80 ? 0.4 : 8.5;
  const payback = saveL > 0 ? +(capexL / saveL * 12).toFixed(1) : 0;
  const pct = Math.min(42, +(annualT / 12).toFixed(1));
  return { annualT: +annualT.toFixed(1), saveL: +saveL.toFixed(1), capexL, payback, pct };
}

export const ScenarioSandbox: React.FC<ScenarioSandboxProps> = ({
  scenarios,
  onSaveCurrentScenario,
  onDeleteScenario,
  onLoadScenario,
}) => {
  const [newPlanName, setNewPlanName] = useState('');

  const ranked = useMemo(() => {
    return [...scenarios].map((sc) => ({ sc, m: score(sc.sliderInputs) }));
  }, [scenarios]);

  const bestId = useMemo(() => {
    if (!ranked.length) return null;
    return [...ranked].sort((a, b) => a.m.payback - b.m.payback)[0].sc.id;
  }, [ranked]);

  const handleSave = () => {
    if (!newPlanName.trim()) return;
    onSaveCurrentScenario(newPlanName);
    setNewPlanName('');
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <CardTitle className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-slate-400" />
              Scenario matrix
            </CardTitle>
            <CardDescription className="mt-2">
              Compare plans against a 100 tCO₂e/mo, ₹28.5L/mo status quo. Figures are recomputed from sliders so a bad KPI cannot print 80-million-ton cuts.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              placeholder="Name the current levers…"
              className="px-3.5 py-2.5 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-sm w-56"
            />
            <Button size="sm" onClick={handleSave} className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Save
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] min-h-[340px] flex flex-col">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Baseline</div>
            <h4 className="mt-2 text-base font-semibold">Status quo</h4>
            <p className="text-xs text-slate-500 mt-1 mb-6">100% furnace oil · 0% PCR · scrap to landfill</p>
            <dl className="space-y-3 text-sm flex-1">
              <div className="flex justify-between"><dt className="text-slate-500">Footprint</dt><dd className="font-semibold tabular-nums">100 tCO₂e/mo</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">OPEX</dt><dd className="font-semibold tabular-nums">₹28.5L/mo</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Capex</dt><dd className="tabular-nums text-slate-400">₹0</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Payback</dt><dd className="text-slate-400">—</dd></div>
            </dl>
          </div>

          {ranked.map(({ sc, m }) => (
            <div key={sc.id} className={`p-6 rounded-xl border bg-white dark:bg-[#0D0F18] min-h-[340px] flex flex-col ${
              sc.id === bestId ? 'border-emerald-400' : 'border-slate-200 dark:border-white/[0.08]'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{sc.createdAt}</div>
                  <h4 className="mt-2 text-base font-semibold leading-snug">{sc.name}</h4>
                </div>
                <button type="button" onClick={() => onDeleteScenario(sc.id)} className="text-slate-400 hover:text-rose-600" aria-label="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {sc.id === bestId && (
                <div className="mt-2 text-[10px] font-mono font-bold uppercase tracking-wide text-emerald-700">Fastest payback in set</div>
              )}
              <p className="text-xs text-slate-500 mt-3 mb-5 font-mono">
                Fuel {sc.sliderInputs.fuelShiftPct}% · temp −{sc.sliderInputs.tempReductionPct}° · PCR {sc.sliderInputs.pcrResinPct}% · scrap {sc.sliderInputs.scrapRecyclePct}%
              </p>
              <dl className="space-y-3 text-sm flex-1">
                <div className="flex justify-between"><dt className="text-slate-500">Annual cut</dt><dd className="font-semibold tabular-nums">{m.annualT} tCO₂e · {m.pct}%</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Savings</dt><dd className="font-semibold tabular-nums text-emerald-700">{inrLakh(m.saveL)}/yr</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Capex</dt><dd className="tabular-nums">{inrLakh(m.capexL)}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Payback</dt><dd className="tabular-nums font-semibold">{m.payback} mo</dd></div>
              </dl>
              <Button variant="secondary" size="sm" className="mt-6 w-full" onClick={() => onLoadScenario(sc.sliderInputs)}>
                Load levers
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
