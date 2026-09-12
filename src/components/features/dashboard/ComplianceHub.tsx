import React, { useEffect, useMemo, useState } from 'react';
import { Download, Plus, User } from 'lucide-react';
import { KPIData, ProcessStage, FacilityConfig } from '../../../types';
import { Button } from '../../ui/Button';

export interface ComplianceHubProps {
  kpiData: KPIData;
  stages: ProcessStage[];
  facilityConfig?: FacilityConfig;
  onOpenBRSRModal?: () => void;
}

type Assurance = 'Missing evidence' | 'Modeled only' | 'Estimated' | 'Assured';

interface Line {
  id: string;
  code: string;
  parameter: string;
  volume: string;
  factor: string;
  footprint: string;
  owner: string;
  role: string;
  source: string;
  evidence: string;
  status: Assurance;
  custom?: boolean;
}

const LS = 'byteme_brsr_lines_v1';

const seedLines = (stages: ProcessStage[]): Line[] => [
  {
    id: 'ei1',
    code: 'P6 · EI-1',
    parameter: 'Scope 2 grid electricity',
    volume: '32,500 kWh / mo (extruder motors)',
    factor: 'CEA India grid · 0.82 kgCO₂e/kWh',
    footprint: `${stages[2]?.currentMonthlyCO2 ?? 25} tCO₂e/mo`,
    owner: 'Meera Joshi',
    role: 'ESG / energy',
    source: 'Plant kWh × CEA factor (modeled)',
    evidence: 'DISCOM bill + meter log',
    status: 'Modeled only',
  },
  {
    id: 'ei2',
    code: 'P6 · EI-2',
    parameter: 'Scope 1 stationary combustion',
    volume: 'Furnace oil at Zone 2 burner',
    factor: 'IPCC 2006 stationary oil',
    footprint: `${stages[1]?.currentMonthlyCO2 ?? 48} tCO₂e/mo`,
    owner: 'Sanjay Patil',
    role: 'Maintenance',
    source: 'Thermal diagnostics · 1,418°C leak',
    evidence: 'Fuel invoice + tank dip',
    status: 'Modeled only',
  },
  {
    id: 'ei3',
    code: 'P6 · EI-3',
    parameter: 'Scope 3 purchased goods (resin)',
    volume: '100T LLDPE / mo',
    factor: 'Supplier / ecoinvent-class factor 2.80 t/T',
    footprint: `${stages[0]?.currentMonthlyCO2 ?? 8.4} tCO₂e/mo`,
    owner: 'Rahul Deshmukh',
    role: 'Procurement',
    source: 'Default resin intensity — not a supplier LCA',
    evidence: 'Supplier declaration',
    status: 'Estimated',
  },
  {
    id: 'ei4',
    code: 'P6 · EI-4',
    parameter: 'Waste generated + circular recovery',
    volume: '12T trim / mo',
    factor: 'CPCB EPR plastics · diversion vs landfill',
    footprint: '32 tCO₂e/yr if landfilled',
    owner: 'Priya Kulkarni',
    role: 'Plant ops',
    source: 'Circular offtake model',
    evidence: 'Signed recycler PO',
    status: 'Missing evidence',
  },
  {
    id: 'li1',
    code: 'P6 · LI-1',
    parameter: 'Decarbonization trajectory',
    volume: 'CapEx workboard phases 1–4',
    factor: 'Internal pathway — not an SBTi validated target',
    footprint: 'Plan ≤ 42% if all gates close',
    owner: 'Plant director',
    role: 'Finance + ESG',
    source: 'Roadmap workboard, not a filed target',
    evidence: 'Board minute',
    status: 'Missing evidence',
  },
];

export const ComplianceHub: React.FC<ComplianceHubProps> = ({ stages, facilityConfig, onOpenBRSRModal }) => {
  const [lines, setLines] = useState<Line[]>(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return seedLines(stages);
  });
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ parameter: '', owner: '', role: 'ESG / energy', volume: '', factor: '', footprint: '', evidence: '' });

  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(lines));
  }, [lines]);

  const ready = useMemo(() => {
    const assured = lines.filter((l) => l.status === 'Assured').length;
    return { assured, n: lines.length, pct: lines.length ? Math.round((assured / lines.length) * 100) : 0 };
  }, [lines]);

  const setStatus = (id: string, status: Assurance) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const addLine = () => {
    if (!draft.parameter.trim() || !draft.owner.trim()) return;
    setLines((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        code: `P6 · CUSTOM`,
        parameter: draft.parameter,
        volume: draft.volume || 'Plant-entered',
        factor: draft.factor || 'To be cited',
        footprint: draft.footprint || 'UNKNOWN',
        owner: draft.owner,
        role: draft.role,
        source: 'Plant-entered attribute',
        evidence: draft.evidence || 'None attached',
        status: 'Missing evidence',
        custom: true,
      },
    ]);
    setShowAdd(false);
    setDraft({ parameter: '', owner: '', role: 'ESG / energy', volume: '', factor: '', footprint: '', evidence: '' });
  };

  const tone = (s: Assurance) =>
    s === 'Assured'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : s === 'Modeled only'
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : s === 'Estimated'
      ? 'bg-slate-100 text-slate-700 border-slate-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="max-w-3xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
            SEBI BRSR Principle 6 · evidence pack
          </span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">BRSR evidence workboard</h1>
          <p className="text-sm text-slate-500">
            This is not an assured filing. Rows are generated from the Apex plant model (CEA / IPCC factors).
            Status stays <strong>Modeled</strong> or <strong>Missing evidence</strong> until the named owner attaches a bill, invoice, or contract.
            Claiming “100% audit-ready” without that file is the thing this page no longer does.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="secondary" onClick={() => setShowAdd((v) => !v)} className="flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add indicator
          </Button>
          {onOpenBRSRModal && (
            <Button size="sm" onClick={onOpenBRSRModal} className="flex items-center gap-1.5">
              <Download className="w-4 h-4" /> Draft PDF
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-xs text-slate-500">Facility in this pack</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">{facilityConfig?.profile?.name || 'Apex Packaging'}</div>
          <div className="text-xs text-slate-400 mt-1 font-mono">Modeled baseline ≈ 100 tCO₂e/mo</div>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-xs text-slate-500">Lines with third-party evidence</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{ready.assured}/{ready.n}</div>
          <div className="text-xs text-amber-700 mt-1 font-semibold">{ready.pct}% assured — not 100%</div>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-xs text-slate-500">What “Draft PDF” is</div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">A working paper for the ESG owner</div>
          <div className="text-xs text-slate-400 mt-1">Not a signed SEBI filing</div>
        </div>
      </div>

      {showAdd && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="Indicator name" value={draft.parameter} onChange={(e) => setDraft({ ...draft, parameter: e.target.value })} />
          <input className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="Owner" value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} />
          <input className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="Activity volume" value={draft.volume} onChange={(e) => setDraft({ ...draft, volume: e.target.value })} />
          <input className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="Evidence required" value={draft.evidence} onChange={(e) => setDraft({ ...draft, evidence: e.target.value })} />
          <input className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="Factor / standard" value={draft.factor} onChange={(e) => setDraft({ ...draft, factor: e.target.value })} />
          <input className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="Footprint or UNKNOWN" value={draft.footprint} onChange={(e) => setDraft({ ...draft, footprint: e.target.value })} />
          <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}>
            <option>ESG / energy</option>
            <option>Plant ops</option>
            <option>Maintenance</option>
            <option>Procurement</option>
            <option>Finance</option>
          </select>
          <div className="flex gap-2">
            <Button size="sm" onClick={addLine}>Save indicator</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Principle 6 lines</h2>
          <p className="text-xs text-slate-500 mt-0.5">Owner changes assurance. Assured is only valid once the evidence column is a real artifact.</p>
        </div>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs min-w-[960px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50 font-mono text-[10px]">
                <th className="p-3">Code</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Parameter</th>
                <th className="p-3">Volume / factor</th>
                <th className="p-3">Footprint</th>
                <th className="p-3">Evidence needed</th>
                <th className="p-3">Assurance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {lines.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60">
                  <td className="p-3 font-mono font-semibold text-slate-900 dark:text-white whitespace-nowrap">{d.code}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-100">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {d.owner}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{d.role}</div>
                  </td>
                  <td className="p-3 max-w-[200px]">
                    <div className="font-medium text-slate-800 dark:text-slate-200">{d.parameter}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{d.source}</div>
                  </td>
                  <td className="p-3 font-mono text-slate-600 max-w-[200px]">
                    <div>{d.volume}</div>
                    <div className="text-[10px] text-slate-400">{d.factor}</div>
                  </td>
                  <td className="p-3 font-mono font-bold">{d.footprint}</td>
                  <td className="p-3 text-slate-500 max-w-[140px]">{d.evidence}</td>
                  <td className="p-3">
                    <select value={d.status} onChange={(e) => setStatus(d.id, e.target.value as Assurance)} className={`text-[10px] font-bold rounded-lg border px-2 py-1 ${tone(d.status)}`}>
                      <option>Missing evidence</option>
                      <option>Modeled only</option>
                      <option>Estimated</option>
                      <option>Assured</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Who generates numbers: the live facility config × CEA / IPCC factors inside ByteMe, plus whatever you type in Add indicator.
          Who manages the line: the named owner. The AI review card below may only comment on these rows; it must not invent an audit opinion.
        </p>
      </div>
    </div>
  );
};
