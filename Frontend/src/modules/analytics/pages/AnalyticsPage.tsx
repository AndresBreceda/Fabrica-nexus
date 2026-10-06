import React from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Calendar, Download } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const oeePillars = [
    { name: 'Availability (A)', value: '96.4%', sub: 'Unplanned downtime: 14.2 min', target: '95.0%', status: 'optimal' },
    { name: 'Performance (P)', value: '97.2%', sub: 'Speed loss: 2.8% vs design max', target: '95.0%', status: 'optimal' },
    { name: 'Quality Yield (Q)', value: '98.8%', sub: 'Total scrap: 0.42% of volume', target: '98.0%', status: 'optimal' },
  ];

  const paretoLosses = [
    { reason: 'Tool Replacement & Calibration (CNC-01)', time: '45 mins', pct: '42%' },
    { reason: 'Coolant Thermal Stabilization Delay', time: '28 mins', pct: '26%' },
    { reason: 'Raw Material Feed Jamming (Silo 3)', time: '18 mins', pct: '17%' },
    { reason: 'Operator Pre-Flight Safety Inspection', time: '16 mins', pct: '15%' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
            Production Intelligence & OEE Telemetry
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Deep-dive industrial analytics, Availability/Performance/Quality pillars, and downtime loss Pareto.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={<Calendar className="w-3.5 h-3.5" />}>
            Last 30 Days
          </Button>
          <Button variant="primary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export Telemetry Dossier
          </Button>
        </div>
      </div>

      {/* Aggregate OEE Card */}
      <div className="bg-[#006194] text-white p-5 rounded-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#93ccff]">
            Overall Equipment Effectiveness (OEE)
          </span>
          <div className="text-4xl font-extrabold font-sans mt-1">
            92.6%
          </div>
          <p className="text-xs text-white/80 mt-1 max-w-md">
            World-Class Manufacturing benchmark achieved (&gt;85%). Aggregate across 4 production cells.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          {oeePillars.map((pillar, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/20">
              <span className="text-[10px] uppercase font-mono block text-[#93ccff]">{pillar.name}</span>
              <span className="text-xl font-bold font-mono block mt-1">{pillar.value}</span>
              <span className="text-[10px] text-white/70 block mt-0.5 font-mono">Target: {pillar.target}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Pareto Analysis + Energy Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Downtime Root Cause Analysis (Pareto)" subtitle="Categorized loss mechanisms impacting shop floor efficiency">
          <div className="flex flex-col gap-3 mt-2">
            {paretoLosses.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                <div className="flex justify-between items-center text-xs font-semibold text-[#0f172a] mb-1">
                  <span>{item.reason}</span>
                  <span className="font-mono text-[#006194]">{item.time} ({item.pct})</span>
                </div>
                <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#006194] h-1.5 rounded-full"
                    style={{ width: item.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Hourly Throughput Velocity" subtitle="Units manufactured per hour versus standard takt time">
          <div className="h-64 flex flex-col justify-end gap-2 p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
            <div className="flex items-end justify-between h-48 px-4 gap-2">
              {[
                { hour: '06:00', val: 320, max: 400 },
                { hour: '08:00', val: 380, max: 400 },
                { hour: '10:00', val: 395, max: 400 },
                { hour: '12:00', val: 340, max: 400 },
                { hour: '14:00', val: 405, max: 400 },
                { hour: '16:00', val: 390, max: 400 },
                { hour: '18:00', val: 385, max: 400 },
              ].map((bar, i) => {
                const heightPct = Math.round((bar.val / bar.max) * 100);
                return (
                  <div key={i} className="flex flex-col items-center flex-1 gap-1">
                    <span className="text-[10px] font-mono text-[#64748b]">{bar.val}</span>
                    <div className="w-full bg-[#e2e8f0] h-36 rounded-t flex items-end">
                      <div
                        className="w-full bg-[#006194] rounded-t transition-all hover:bg-[#007bb9]"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#64748b]">{bar.hour}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center text-[10px] font-mono text-[#64748b] border-t border-[#e2e8f0] pt-1">
              Standard Takt Rate: 380 units/hour
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
