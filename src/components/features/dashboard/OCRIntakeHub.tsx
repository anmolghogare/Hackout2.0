import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { UploadCloud, FileText, CheckCircle2, Scan, Sparkles, RefreshCw, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { OCRParsedResult } from '../../../types';
import { formatINR } from '../../../lib/utils';

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
      fileType: 'Utility Bill',
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
      fileType: 'Weighbridge Ticket',
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Scan className="w-5 h-5 text-emerald-500" />
              <span>OCR Smart Data Intake & Bill Scanner Hub</span>
            </CardTitle>
            <CardDescription>
              Drag-and-drop utility bills or weighbridge manifests to auto-extract carbon telemetry and populate plant baselines.
            </CardDescription>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Bill Parser Engine</span>
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drag & Drop Zone */}
          <div className="space-y-4">
            <div
              onClick={() => handleSimulateUpload()}
              className={`relative p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[260px] ${
                isScanning
                  ? 'border-emerald-500 bg-emerald-950/20'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:border-emerald-500/80 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              {/* Laser Beam Scanner Line FX */}
              {isScanning && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-pulse pointer-events-none" />
              )}

              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 shadow-lg">
                {isScanning ? (
                  <RefreshCw className="w-8 h-8 animate-spin" />
                ) : (
                  <UploadCloud className="w-8 h-8" />
                )}
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-heading">
                {isScanning ? 'Scanning Utility Document...' : 'Drag & Drop Utility Bills or Receipts'}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                Supports PNG, PDF, JPG (Electricity Bills, Furnace Oil Invoices, Weighbridge Slips)
              </p>

              <Button variant="outline" size="sm" className="pointer-events-none">
                <span>Browse Local Files</span>
              </Button>
            </div>

            {/* Sample Quick Upload Preset Chips */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Or Select Sample Test Document:
              </span>
              <div className="space-y-2">
                {sampleBills.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimulateUpload(sample)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-left transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2 truncate">
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
          <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 flex flex-col justify-between shadow-2xl">
            {parsedResult ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">
                      OCR EXTRACTION COMPLETE
                    </span>
                    <h4 className="font-bold text-white text-base font-heading">
                      {parsedResult.fileName}
                    </h4>
                  </div>
                  <Badge variant="normal">
                    {parsedResult.confidenceScore}% Confidence
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">PARSED VOLUME</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {parsedResult.parsedVolume}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">PARSED MONTHLY COST</span>
                    <span className="text-purple-400 font-bold text-sm">
                      {parsedResult.parsedMonthlyCost}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs">
                  <span className="text-[10px] text-rose-400 font-bold uppercase block mb-1">
                    DETECTED PROCESS HOTSPOT
                  </span>
                  <p className="text-white font-medium">{parsedResult.detectedHotspot}</p>
                </div>

                {/* Parsed Line Items */}
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-2">
                    PARSED OCR LINE ITEMS:
                  </span>
                  <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] space-y-1 text-slate-300 border border-slate-800">
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
                  className="w-full flex items-center justify-center space-x-2 pt-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Update Digital Twin Telemetry Canvas</span>
                </Button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-slate-500">
                <Scan className="w-12 h-12 text-slate-700 animate-pulse" />
                <h4 className="font-bold text-slate-300 font-heading text-sm">
                  OCR Scanner Standby Mode
                </h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Upload a bill or select a test receipt on the left to trigger the glowing laser beam scanner and extract operational metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
