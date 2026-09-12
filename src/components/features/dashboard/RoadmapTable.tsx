import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { BarChart3, Calendar, Plus, User } from 'lucide-react';
import { ViewMode, SliderInputs } from '../../../types';

type Status = 'Planned' | 'In Progress' | 'Blocked' | 'Done';

interface PhaseRow {
  id: string;
  phase: string;
  timeline: string;
  stream: string;
  initiative: string;
  owner: string;
  role: string;
  source: string;
  investmentLakh: number;
  savingsLakh: number;
  tco2e: number;
  paybackMo: number;
  status: Status;
  gate: string;
  sliderInputs: SliderInputs;
  custom?: boolean;
}

const SEED: PhaseRow[] = [
  {
    id: 'p1',
    phase: 'Phase 1',
    timeline: 'Q1 · 0–90 days',
    stream: 'Trim scrap',
    initiative: 'B2B offtake contract for 12T/mo LLDPE trim (Apex Pipe cluster)',
    owner: 'Priya Kulkarni',
    role: 'Plant ops',
    source: 'Circular model · 12T × ₹25k',
    investmentLakh: 0.4,
    savingsLakh: 3.0,
    tco2e: 32,
    paybackMo: 1.6,
    status: 'In Progress',
    gate: 'Signed offtake PO',
    sliderInputs: { fuelShiftPct: 0, tempReductionPct: 0, pcrResinPct: 0, scrapRecyclePct: 100 },
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    timeline: 'Q2 · 90–180 days',
    stream: 'Virgin resin',
    initiative: '20% PCR blend with qualified local supplier',
    owner: 'Rahul Deshmukh',
    role: 'Procurement',
    source: 'Simulator · PCR slider 20%',
    investmentLakh: 15,
    savingsLakh: 2.4,
    tco2e: 48,
    paybackMo: 7.5,
    status: 'Planned',
    gate: 'PCR COA + trial lot',
    sliderInputs: { fuelShiftPct: 0, tempReductionPct: 0, pcrResinPct: 20, scrapRecyclePct: 100 },
  },
  {
    id: 'p3',
    phase: 'Phase 3',
    timeline: 'Q3 · 180–270 days',
    stream: 'Furnace oil',
    initiative: 'Burner PID + 50% biomass / PNG shift (fixes 1,418°C leak)',
    owner: 'Sanjay Patil',
    role: 'Maintenance',
    source: 'Thermal diagnostics · 48 tCO₂e/mo leak',
    investmentLakh: 35,
    savingsLakh: 4.2,
    tco2e: 253,
    paybackMo: 10,
    status: 'Planned',
    gate: 'OEM quote + shutdown window',
    sliderInputs: { fuelShiftPct: 50, tempReductionPct: 10, pcrResinPct: 20, scrapRecyclePct: 100 },
  },
  {
    id: 'p4',
    phase: 'Phase 4',
    timeline: 'Q4 · 270–365 days',
    stream: 'Extruder motors',
    initiative: 'VFDs + insulation jacket on two largest drives',
    owner: 'Meera Joshi',
    role: 'ESG / energy',
    source: 'Scope 2 · 32,500 kWh/mo',
    investmentLakh: 8.5,
    savingsLakh: 1.8,
    tco2e: 28.5,
    paybackMo: 10.5,
    status: 'Planned',
    gate: 'DISCOM load-shift study',
    sliderInputs: { fuelShiftPct: 80, tempReductionPct: 15, pcrResinPct: 35, scrapRecyclePct: 100 },
  },
];

const LS_KEY = 'byteme_capex_roadmap_v1';

export interface RoadmapTableProps {
  viewMode?: ViewMode;
  onSimulatePhase?: (inputs: SliderInputs) => void;
}

export const RoadmapTable: React.FC<RoadmapTableProps> = ({ viewMode = 'carbon', onSimulatePhase }) => {
  const [rows, setRows] = useState<PhaseRow[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return SEED;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ initiative: '', owner: '', role: 'Plant ops', stream: '', investmentLakh: 1, savingsLakh: 1, tco2e: 10 });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(rows));
  }, [rows]);

  const totals = useMemo(() => {
    const capex = rows.reduce((s, r) => s + r.investmentLakh, 0);
    const save = rows.reduce((s, r) => s + r.savingsLakh, 0);
    const co2 = rows.reduce((s, r) => s + r.tco2e, 0);
    const wPay = rows.reduce((s, r) => s + r.paybackMo * r.investmentLakh, 0);
    return { capex, save, co2, payback: capex ? wPay / capex : 0 };
  }, [rows]);

  const setStatus = (id: string, status: Status) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const addRow = () => {
    if (!draft.initiative.trim() || !draft.owner.trim()) return;
    const paybackMo = draft.savingsLakh > 0 ? +(draft.investmentLakh / draft.savingsLakh * 12).toFixed(1) : 0;
    setRows((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        phase: `Phase ${prev.length + 1}`,
        timeline: 'Custom · unscheduled',
        stream: draft.stream || 'Unassigned stream',
        initiative: draft.initiative,
        owner: draft.owner,
        role: draft.role,
        source: 'Plant-entered attribute',
        investmentLakh: draft.investmentLakh,
        savingsLakh: draft.savingsLakh,
        tco2e: draft.tco2e,
        paybackMo,
        status: 'Planned',
        gate: 'Owner to attach evidence',
        sliderInputs: { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 },
        custom: true,
      },
    ]);
    setDraft({ initiative: '', owner: '', role: 'Plant ops', stream: '', investmentLakh: 1, savingsLakh: 1, tco2e: 10 });
    setShowAdd(false);
  };

  const statusVariant = (s: Status) =>
    s === 'Done' ? 'success' : s === 'In Progress' ? 'normal' : s === 'Blocked' ? 'alert' : 'outline';

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span>CapEx workboard</span>
            </CardTitle>
            <CardDescription>
              This is not a static slide. Seed phases are ranked from the plant model (payback first, then tCO₂e).
              Each row has a named owner. Status and custom attributes live in this browser until you export BRSR.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20 font-mono">
              Weighted payback {totals.payback.toFixed(1)} mo
            </span>
            <Button size="sm" onClick={() => setShowAdd((v) => !v)} className="flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Add attribute
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Committed capex</div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">₹{totals.capex.toFixed(1)} L</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Modeled savings</div>
            <div className="text-lg font-bold font-mono text-emerald-600">₹{totals.save.toFixed(1)} L / yr</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Abatement in plan</div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">{totals.co2.toFixed(1)} tCO₂e / yr</div>
          </div>
        </div>

        {showAdd && (
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/[0.06] p-4 grid grid-cols-1 md:grid-cols-6 gap-3">
            <input className="md:col-span-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" placeholder="Initiative" value={draft.initiative} onChange={(e) => setDraft({ ...draft, initiative: e.target.value })} />
            <input className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" placeholder="Owner name" value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} />
            <input className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" placeholder="Stream (furnace / scrap…)" value={draft.stream} onChange={(e) => setDraft({ ...draft, stream: e.target.value })} />
            <input type="number" className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" placeholder="Capex L" value={draft.investmentLakh} onChange={(e) => setDraft({ ...draft, investmentLakh: Number(e.target.value) })} />
            <div className="flex gap-2">
              <Button size="sm" onClick={addRow}>Save row</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
            <input type="number" className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" placeholder="Savings L/yr" value={draft.savingsLakh} onChange={(e) => setDraft({ ...draft, savingsLakh: Number(e.target.value) })} />
            <input type="number" className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" placeholder="tCO2e/yr" value={draft.tco2e} onChange={(e) => setDraft({ ...draft, tco2e: Number(e.target.value) })} />
            <select className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}>
              <option>Plant ops</option>
              <option>Procurement</option>
              <option>Maintenance</option>
              <option>ESG / energy</option>
              <option>Finance</option>
            </select>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/[0.08]">
          <table className="w-full text-left text-sm border-collapse min-w-[980px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.08] text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-white/[0.02]">
                <th className="p-3">Phase</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Action</th>
                <th className="p-3">Source</th>
                <th className="p-3">Capex</th>
                <th className="p-3">₹ / yr</th>
                <th className="p-3">tCO₂e</th>
                <th className="p-3">Payback</th>
                <th className="p-3">Gate</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Simulate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03]">
                  <td className="p-3 whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-white">{row.phase}</div>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      {row.timeline}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {row.owner}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{row.role}</div>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="text-xs font-medium text-slate-800 dark:text-slate-200">{row.initiative}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{row.stream}</div>
                  </td>
                  <td className="p-3 text-[10px] font-mono text-slate-500 max-w-[140px]">{row.source}</td>
                  <td className="p-3 font-mono text-xs">₹{row.investmentLakh}L</td>
                  <td className="p-3 font-mono text-xs font-bold text-emerald-600">+₹{row.savingsLakh}L</td>
                  <td className="p-3 font-mono text-xs">{viewMode === 'financial' ? `₹${row.savingsLakh}L` : `${row.tco2e}`}</td>
                  <td className="p-3 font-mono text-xs font-bold text-emerald-600">{row.paybackMo} mo</td>
                  <td className="p-3 text-[10px] text-slate-500 max-w-[120px]">{row.gate}</td>
                  <td className="p-3">
                    <select
                      value={row.status}
                      onChange={(e) => setStatus(row.id, e.target.value as Status)}
                      className="text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1"
                    >
                      <option>Planned</option>
                      <option>In Progress</option>
                      <option>Blocked</option>
                      <option>Done</option>
                    </select>
                    <div className="mt-1"><Badge variant={statusVariant(row.status) as any}>{row.status}</Badge></div>
                  </td>
                  <td className="p-3 text-right">
                    {onSimulatePhase && (
                      <button
                        onClick={() => onSimulatePhase(row.sliderInputs)}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white"
                      >
                        Open levers
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          Who writes the numbers: ByteMe ranks seed rows from the Apex Packaging model (scrap first because payback is weeks, furnace third because capex is high).
          Who manages the timeline: the named owner on each row — ops, procurement, maintenance, ESG — not a hidden admin.
          Add attribute is for a real plant initiative that the model did not invent.
        </p>
      </CardContent>
    </Card>
  );
};
