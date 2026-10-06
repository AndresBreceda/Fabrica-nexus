import React, { useState } from 'react';
import { KPIGrid } from '../components/KPIGrid';
import { ProductionLinesTable } from '../components/ProductionLinesTable';
import { RecentAlertsWidget } from '../components/RecentAlertsWidget';
import type { ProductionKPI, ProductionLine, AlertNotification } from '../../../shared/types';
import { Button } from '../../../shared/components/Button';
import { RefreshCw, Download } from 'lucide-react';

const mockKPIs: ProductionKPI[] = [
  {
    id: 'kpi-1',
    label: 'Total Production',
    value: '24,850',
    unit: 'units',
    change: '+8.4%',
    isPositive: true,
    benchmark: 'Target: 25,000',
    statusText: '99.4%',
  },
  {
    id: 'kpi-2',
    label: 'OEE Efficiency',
    value: '92.6%',
    change: '+3.2%',
    isPositive: true,
    benchmark: 'Benchmark: 90.0%',
    statusText: 'Optimal',
  },
  {
    id: 'kpi-3',
    label: 'Active Orders',
    value: '18',
    unit: 'batches',
    change: '12 today',
    isPositive: true,
    benchmark: '4 In Final Stage',
    statusText: 'On Track',
  },
  {
    id: 'kpi-4',
    label: 'Downtime Unplanned',
    value: '14.2',
    unit: 'mins',
    change: '-18.5%',
    isPositive: true,
    benchmark: 'Threshold: 30m',
    statusText: 'Controlled',
  },
  {
    id: 'kpi-5',
    label: 'Scrap Rate',
    value: '0.42%',
    change: '-0.15%',
    isPositive: true,
    benchmark: 'Tolerance: 0.80%',
    statusText: 'High Quality',
  },
  {
    id: 'kpi-6',
    label: 'Energy Intensity',
    value: '1.24',
    unit: 'kWh/u',
    change: '+1.1%',
    isPositive: false,
    benchmark: 'Norm: 1.20 kWh',
    statusText: 'Attention',
  },
];

const mockLines: ProductionLine[] = [
  {
    id: 'line-a',
    name: 'Assembly Cell Alpha (CNC-01)',
    facility: 'Facility 1 - Precision Bay',
    status: 'OPERATIONAL',
    activeLot: 'LOT-2026-X88',
    targetUnits: 8000,
    completedUnits: 7640,
    oee: 95.2,
    currentShift: 'Shift 1 (06:00 - 14:00)',
    operator: 'Elena Rostova',
    temperatureC: 42.1,
    vibrationMmS: 0.28,
  },
  {
    id: 'line-b',
    name: 'Robotic Welding Cell (R-WELD-04)',
    facility: 'Facility 1 - Heavy Bay',
    status: 'OPERATIONAL',
    activeLot: 'LOT-2026-B12',
    targetUnits: 6500,
    completedUnits: 5820,
    oee: 91.8,
    currentShift: 'Shift 1 (06:00 - 14:00)',
    operator: 'Marcus Vance',
    temperatureC: 58.4,
    vibrationMmS: 0.44,
  },
  {
    id: 'line-c',
    name: 'Surface Treatment Line (SURF-09)',
    facility: 'Facility 2 - Chemical Wing',
    status: 'DEGRADED',
    activeLot: 'LOT-2026-C04',
    targetUnits: 5000,
    completedUnits: 3410,
    oee: 79.4,
    currentShift: 'Shift 1 (06:00 - 14:00)',
    operator: 'Kenji Takahashi',
    temperatureC: 64.9,
    vibrationMmS: 0.72,
  },
  {
    id: 'line-d',
    name: 'High-Speed Packaging Unit (PKG-02)',
    facility: 'Facility 2 - Logistics Line',
    status: 'OPERATIONAL',
    activeLot: 'LOT-2026-PKG9',
    targetUnits: 12000,
    completedUnits: 11450,
    oee: 94.6,
    currentShift: 'Shift 1 (06:00 - 14:00)',
    operator: 'Sofia Benitez',
    temperatureC: 38.0,
    vibrationMmS: 0.19,
  },
];

const mockRecentAlerts: AlertNotification[] = [
  {
    id: 'alt-101',
    timestamp: '14:22:05',
    source: 'Cell SURF-09 / Temp Sensor',
    severity: 'WARNING',
    title: 'Thermal Drift Threshold Approached',
    message: 'Coolant temperature reached 64.9°C (normal: 50-60°C). Valve flow adjusted +15%.',
    acknowledged: false,
  },
  {
    id: 'alt-102',
    timestamp: '13:58:12',
    source: 'Warehouse B / Silo 3',
    severity: 'CRITICAL',
    title: 'Resin Polymer Inflow Interrupted',
    message: 'Hopper feeder sensor detected 0 kg/min delivery rate. Backup reservoir active.',
    acknowledged: true,
    acknowledgedBy: 'M. Vance',
  },
  {
    id: 'alt-103',
    timestamp: '13:30:00',
    source: 'Core Scheduling Engine',
    severity: 'INFO',
    title: 'Shift Change Automated Handover',
    message: 'Shift A handed over 24,850 cumulative units with 92.6% aggregate OEE.',
    acknowledged: true,
  },
];

export const DashboardPage: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Page Title & Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
              Production Overview
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a] font-mono text-[10px] font-semibold border border-[#bbf7d0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-ping" />
              LIVE TELEMETRY
            </span>
          </div>
          <p className="text-xs text-[#64748b] mt-1">
            Real-time monitoring, equipment telemetry, and operational yield across facility lines.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Period Filter */}
          <div className="inline-flex p-0.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg">
            {(['today', 'week', 'month'] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setFilterPeriod(period)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  filterPeriod === period
                    ? 'bg-white text-[#0f172a] shadow-xs font-semibold'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {period === 'today' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRefresh}
            icon={
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
            }
          >
            Refresh Stream
          </Button>
        </div>
      </div>

      {/* 6-KPI Cluster */}
      <KPIGrid kpis={mockKPIs} />

      {/* Main Grid: Production Cells Table + Live Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ProductionLinesTable lines={mockLines} />
        </div>
        <div>
          <RecentAlertsWidget alerts={mockRecentAlerts} />
        </div>
      </div>
    </div>
  );
};
