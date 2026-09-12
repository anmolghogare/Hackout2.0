import React, { useState, useEffect } from 'react';
import { Activity, Zap, Flame, Gauge, AlertTriangle, CheckCircle2, RefreshCw, Cpu, Radio, Power } from 'lucide-react';
import { FacilityConfig } from '../../../types';
import { cn } from '../../../lib/utils';

export interface SensorsTelemetryHubProps {
  facilityConfig?: FacilityConfig;
}

export const SensorsTelemetryHub: React.FC<SensorsTelemetryHubProps> = ({ facilityConfig }) => {
  const [lastSync, setLastSync] = useState('Just now');
  const [isSimulating, setIsSimulating] = useState(true);
  const [telemetryTick, setTelemetryTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTick((prev) => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sensors = [
    {
      id: 'SEN-01',
      name: 'Furnace Chamber Optical Pyrometer',
      location: 'Stage 02 • Main Burner Zone',
      value: (1418 + (Math.sin(telemetryTick) * 4)).toFixed(1),
      unit: '°C',
      target: '1380.0 °C',
      status: 'HIGH ALERT',
      statusColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
      anomaly: '+38°C Thermal leak detected at refractory lining',
      trend: [1390, 1400, 1410, 1415, 1422, 1418, 1420],
    },
    {
      id: 'SEN-02',
      name: 'Flue Gas Oxygen & CO Analyzer',
      location: 'Stage 02 • Chimney Exhaust',
      value: (4.2 + (Math.cos(telemetryTick) * 0.3)).toFixed(2),
      unit: '% O₂',
      target: '2.50 %',
      status: 'EVALUATE',
      statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      anomaly: 'Excess combustion air causing 6.2% fuel waste',
      trend: [3.8, 3.9, 4.1, 4.3, 4.2, 4.4, 4.2],
    },
    {
      id: 'SEN-03',
      name: 'Main Extruder Motor Drive (VFD)',
      location: 'Stage 03 • Extrusion Line #1',
      value: (420 + (Math.sin(telemetryTick * 0.5) * 12)).toFixed(0),
      unit: 'kW',
      target: '390 kW',
      status: 'NORMAL',
      statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      anomaly: 'Power factor steady at 0.96 (CEA standard compliant)',
      trend: [415, 418, 422, 420, 425, 419, 420],
    },
    {
      id: 'SEN-04',
      name: 'Steam Recuperator Flow Meter',
      location: 'Stage 02 • Flue Heat Exchanger',
      value: (185 + (Math.cos(telemetryTick * 0.8) * 5)).toFixed(1),
      unit: 'kg/hr',
      target: '220 kg/hr',
      status: 'EVALUATE',
      statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      anomaly: 'Preheat temperature dropped 12°C below design rating',
      trend: [195, 192, 188, 186, 184, 185, 185],
    },
    {
      id: 'SEN-05',
      name: 'Weighbridge Raw Polymer Intake Scale',
      location: 'Stage 01 • Inbound Receiving Bay',
      value: '3.34',
      unit: 'Tons/batch',
      target: '3.33 Tons',
      status: 'NORMAL',
      statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      anomaly: '100% Virgin HDPE density verified against QA spec',
      trend: [3.3, 3.4, 3.3, 3.35, 3.34, 3.33, 3.34],
    },
    {
      id: 'SEN-06',
      name: 'Byproduct Trim Scrap Optical Counter',
      location: 'Stage 04 • Slitter & Winder Bay',
      value: (0.42 + (Math.sin(telemetryTick * 0.3) * 0.04)).toFixed(2),
      unit: 'Tons/day',
      target: '0.35 Tons',
      status: 'NORMAL',
      statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      anomaly: 'Scrap diverted 100% to B2B off-take staging bin',
      trend: [0.4, 0.41, 0.44, 0.42, 0.43, 0.41, 0.42],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12 font-sans">
      {/* Header */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Telemetry Mesh Active • Modbus TCP / MQTT
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Real-Time IoT Sensor Array & Plant Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Continuous empirical data collection across all 4 production stages for leak-point isolation.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLastSync(new Date().toLocaleTimeString())}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
            <span>Synced: {lastSync}</span>
          </button>
        </div>
      </div>

      {/* Grid of Sensors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">
                  {sensor.id}
                </span>
                <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', sensor.statusColor)}>
                  {sensor.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {sensor.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {sensor.location}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">CURRENT VALUE</span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {sensor.value} <span className="text-xs font-normal text-slate-500">{sensor.unit}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">SETPOINT TARGET</span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-mono">
                  {sensor.target}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-start space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-relaxed">{sensor.anomaly}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
