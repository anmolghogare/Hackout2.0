import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { UploadCloud, FileText, CheckCircle2, Scan, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { OCRParsedResult } from '../../../types';

export interface OCRIntakeHubProps {
  onApplyIntakeBaseline?: () => void;
}

export const OCRIntakeHub: React.FC<OCRIntakeHubProps> = ({ onApplyIntakeBaseline }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [parsedResult, setParsedResult] = useState<OCRParsedResult | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const sampleBills: OCRParsedResult[] = [
    {
      fileName: 'Maharashtra_State_Electricity_Bill_Q3.pdf',
      fileType: 'Grid Electricity Bill',
      parsedVolume: '32,500 kWh / Month',
      parsedMonthlyCost: '₹5,20,000 / Month',
      detectedHotspot: 'Extrusion Line Electricity (CEA Grid Factor 0.82)',
      confidenceScore: 98.4,
      extractedTextLines: [
        'CONSUMER: APEX PACKAGING PVT LTD (ACC #948271)',
        'METER READING: 32,500 UNITS (HT-II INDUSTRIAL)',
        'GRID EMISSIONS FACTOR: 0.82 kgCO2e/kWh',
        'ESTIMATED CARBON INTENSITY: 26.65 tCO2e/Month',
      ],
    },
    {
      fileName: 'Mahanagar_Gas_Furnace_Oil_Receipt.png',
      fileType: 'Furnace Fuel Invoice',
      parsedVolume: '15,400 Liters Heavy Fuel Oil',
      parsedMonthlyCost: '₹14,20,000 / Month',
      detectedHotspot: 'Furnace Heating Stage (RED ALERT: Priority 1)',
      confidenceScore: 96.8,
      extractedTextLines: [
        'SUPPLIER: BHARAT PETROLEUM INDUSTRIAL DIVISION',
        'PRODUCT: HEAVY FURNACE OIL (HFO Grade B)',
        'CALORIFIC INTENSITY: 3.12 kgCO2e/Liter',
        'ESTIMATED CARBON FOOTPRINT: 48.05 tCO2e/Month',
      ],
    },
    {
      fileName: 'Pune_Weighbridge_Scrap_Manifest_Aug2026.pdf',
      fileType: 'Weighbridge Manifest',
      parsedVolume: '12.4 Tons Trim Scrap',
      parsedMonthlyCost: '₹3,10,000 / Month',
      detectedHotspot: 'Waste Scrap Landfill Stream (RED ALERT: Priority 2)',
      confidenceScore: 99.1,
      extractedTextLines: [
        'MANIFEST ID: WB-2026-0912-APEX',
        'MATERIAL: LLDPE POLYMER OFF-CUT SCRAP TRIMMINGS',
        'DISPOSAL DESTINATION: UNRECYCLED MUNICIPAL LANDFILL',
        'CARBON INTENSITY FACTOR: 1.41 tCO2e/Ton',
      ],
    },
  ];

  const handleSimulateUpload = (sample?: OCRParsedResult) => {
    const selected = sample || sampleBills[1];
    setUploadedFileName(selected.fileName);
    setIsScanning(true);
    setParsedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setParsedResult(selected);
      if (onApplyIntakeBaseline) onApplyIntakeBaseline();
    }, 1800);
  };

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Scan className="w-5 h-5 text-emerald-500" />
              </div>
              <span>OCR Smart Data Ingestion & Utility Bill Scanner</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Integrated Facility Configuration Module: Upload utility invoices or weighbridge receipts to run OCR extraction, auto-sync parameters, and update factory baseline telemetry.
            </CardDescription>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 flex items-center space-x-1.5 self-start sm:self-center">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Facility Config Module Active</span>
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drag & Drop Zone */}
          <div className="space-y-4">
            <div
              onClick={() => handleSimulateUpload()}
              className={`relative p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[260px] ${
                isScanning
                  ? 'border-emerald-500 bg-emerald-500/5'
                  : 'border-slate-300 dark:border-white/[0.12] bg-slate-50/60 dark:bg-white/[0.02] hover:border-emerald-500/80 hover:bg-slate-100/80 dark:hover:bg-white/[0.04]'
              }`}
            >
              {isScanning && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-pulse pointer-events-none" />
              )}

              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 shadow-xs">
                {isScanning ? (
                  <RefreshCw className="w-7 h-7 animate-spin" />
                ) : (
                  <UploadCloud className="w-7 h-7" />
                )}
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-heading">
                {isScanning ? 'Scanning Utility Invoice...' : 'Drag & Drop Utility Bills or Invoices'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-4">
                Supports PDF, PNG, JPG (Electricity Bills, Furnace Fuel Receipts, Weighbridge Slips)
              </p>

              <Button variant="primary" size="sm" className="pointer-events-none font-bold">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                <span>Run AI OCR Invoice Parser</span>
              </Button>
            </div>

            {/* Sample Quick Upload Preset Chips */}
            <div>
              <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                Or Select Sample Test Document:
              </span>
              <div className="space-y-2">
                {sampleBills.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimulateUpload(sample)}
                    className="w-full p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 text-left transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {sample.fileName}
                      </span>
                    </div>
                    <Badge variant="outline">{sample.fileType}</Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* OCR Extracted Results Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0F18] text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between shadow-xs">
            {parsedResult ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-white/[0.08]">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">
                      OCR EXTRACTION COMPLETE
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm font-heading mt-0.5">
                      {parsedResult.fileName}
                    </h4>
                  </div>
                  <Badge variant="normal">
                    {parsedResult.confidenceScore}% Confidence
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
                    <span className="text-slate-400 block text-[10px]">PARSED VOLUME</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5 block">
                      {parsedResult.parsedVolume}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
                    <span className="text-slate-400 block text-[10px]">PARSED MONTHLY COST</span>
                    <span className="text-slate-900 dark:text-white font-bold text-sm mt-0.5 block">
                      {parsedResult.parsedMonthlyCost}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider block mb-0.5">
                    DETECTED PROCESS HOTSPOT
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">{parsedResult.detectedHotspot}</p>
                </div>

                {/* Parsed Line Items */}
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-2 font-bold tracking-wider">
                    PARSED OCR LINE ITEMS:
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#080B12] font-mono text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.08]">
                    {parsedResult.extractedTextLines.map((line, i) => (
                      <p key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full flex items-center justify-center space-x-2 shadow-xs"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Update Digital Twin Telemetry Canvas</span>
                </Button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-slate-500">
                <Scan className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200 font-heading text-sm">
                  OCR Scanner Standby
                </h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Upload an invoice or select a sample document on the left to extract operational consumption and emission factors.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
