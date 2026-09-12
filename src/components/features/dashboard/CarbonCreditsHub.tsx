import React, { useState } from 'react';
import { Coins, TrendingUp, Award, Building2, CheckCircle2, ShieldCheck, ArrowRight, Percent, DollarSign } from 'lucide-react';
import { KPIData, FacilityConfig } from '../../../types';
import { formatINR, formatNumber } from '../../../lib/utils';

export interface CarbonCreditsHubProps {
  kpiData: KPIData;
  facilityConfig?: FacilityConfig;
  onNavigateTab?: (tab: string) => void;
}

export const CarbonCreditsHub: React.FC<CarbonCreditsHubProps> = ({
  kpiData,
  facilityConfig,
}) => {
  const [creditPriceINR, setCreditPriceINR] = useState(1200); // ₹1,200 per tCO2e
  const annualSavedCO2 = (kpiData.monthlyCO2SavedTons || 28.8) * 12;
  const annualCreditRevenue = annualSavedCO2 * creditPriceINR;
  const greenLoanInterestDiscountBps = 75; // 0.75% interest concession for ESG compliant SMEs
  const loanPrincipal = 5000000; // ₹50L working capital
  const annualInterestSaved = (loanPrincipal * greenLoanInterestDiscountBps) / 10000;

  return (
    <div className="space-y-8 animate-fadeIn pb-12 font-sans">
      {/* Header */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-mono">
              Green Credit Programme (MoEFCC Rules 2023)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Green Finance, Carbon Offsets & Monetization
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monetize verified abatement certificates (VERs), green credit quotas, and ESG interest rate concessions from Indian public sector banks.
          </p>
        </div>
      </div>

      {/* 3 Metric Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">ANNUAL VERIFIED ABATEMENT</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {formatNumber(annualSavedCO2)} <span className="text-sm font-normal text-slate-500">tCO₂e / year</span>
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono block">Eligible for Indian Carbon Market (ICM)</span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">ESTIMATED CARBON CREDIT VALUE</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {formatINR(annualCreditRevenue)} <span className="text-sm font-normal text-slate-500">/ year</span>
          </p>
          <span className="text-xs text-slate-400 font-mono block">Valued at ₹{creditPriceINR} per verified carbon credit</span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">ESG BANKING INTEREST REBATE</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {formatINR(annualInterestSaved)} <span className="text-sm font-normal text-slate-500">/ year</span>
          </p>
          <span className="text-xs text-slate-400 font-mono block">-75 bps concession on ₹50L term debt (SBI/SIDBI)</span>
        </div>
      </div>

      {/* Credit Price Slider & Financing Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Indian Carbon Market (ICM) Price Sensitivity
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Simulate trading revenue based on market price per tonne of CO₂ avoided
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Carbon Credit Price (₹ / tCO₂e)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">₹{creditPriceINR}</span>
            </div>
            <input
              type="range"
              min={600}
              max={3500}
              step={50}
              value={creditPriceINR}
              onChange={(e) => setCreditPriceINR(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>₹600 (Voluntary SME)</span>
              <span>₹1,800 (BEE PAT Quota)</span>
              <span>₹3,500 (Global CORSIA)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
              <span>Total Annual Abatement Volume:</span>
              <span className="font-mono">{formatNumber(annualSavedCO2)} tCO₂e</span>
            </div>
            <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Gross Tradable Quota Revenue:</span>
              <span className="font-mono">{formatINR(annualCreditRevenue)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Green Lending & SIDBI Subsidy Schemes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Statutory government incentives available for verified Apex Packaging investments
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                1. SIDBI 4E Scheme (End-to-End Energy Efficiency)
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Concessional loans at 7.5% p.a. for biomass boiler retrofits and furnace recuperators.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                2. BEE PAT ESCerts (Energy Savings Certificates)
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Trade surplus energy efficiency units on IEX (Indian Energy Exchange) under PAT cycle norms.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                3. Maharashtra Green Power Tariff Concession
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                ₹0.50/kWh discount on MSEDCL tariff for manufacturing units meeting 25% renewable mix.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
