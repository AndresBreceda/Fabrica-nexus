import React, { useState } from 'react';
import type { AlertNotification } from '../../../shared/types';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import {
  CheckCircle2,
  Clock,
  Check,
} from 'lucide-react';

const mockAlerts: AlertNotification[] = [
  {
    id: 'alt-001',
    timestamp: '2026-10-06 14:22:05',
    source: 'Cell SURF-09 / Temp Sensor T-04',
    severity: 'WARNING',
    title: 'Thermal Drift Threshold Approached',
    message: 'Coolant temperature reached 64.9°C (normal: 50-60°C). Valve flow adjusted +15% automatically.',
    acknowledged: false,
  },
  {
    id: 'alt-002',
    timestamp: '2026-10-06 13:58:12',
    source: 'Warehouse B / Silo 3 Feed Inflow',
    severity: 'CRITICAL',
    title: 'Resin Polymer Inflow Interrupted',
    message: 'Hopper feeder sensor detected 0 kg/min delivery rate. Backup reservoir active.',
    acknowledged: true,
    acknowledgedBy: 'Marcus Vance',
  },
  {
    id: 'alt-003',
    timestamp: '2026-10-06 13:30:00',
    source: 'Core Scheduling Engine',
    severity: 'INFO',
    title: 'Shift Change Automated Handover',
    message: 'Shift A handed over 24,850 cumulative units with 92.6% aggregate OEE.',
    acknowledged: true,
    acknowledgedBy: 'System Automation',
  },
  {
    id: 'alt-004',
    timestamp: '2026-10-06 11:15:40',
    source: 'CNC Milling Cell Alpha',
    severity: 'WARNING',
    title: 'Tool Wear Calibration Alert',
    message: 'Carbide End Mill 12mm reached 85% expected lifespan. Scheduled exchange in next break.',
    acknowledged: false,
  },
  {
    id: 'alt-005',
    timestamp: '2026-10-06 09:05:18',
    source: 'Metrology Lab CMM-01',
    severity: 'INFO',
    title: 'Calibration Routine Successful',
    message: 'Zero-point calibration completed within 0.0005mm baseline accuracy.',
    acknowledged: true,
    acknowledgedBy: 'Elena Rostova',
  },
];

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertNotification[]>(mockAlerts);
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((alt) =>
        alt.id === id ? { ...alt, acknowledged: true, acknowledgedBy: 'Carlos Mendoza' } : alt
      )
    );
  };

  const filteredAlerts = alerts.filter(
    (alt) => severityFilter === 'ALL' || alt.severity === severityFilter
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
            Alerts & Incident Log
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Real-time shop-floor notifications, telemetry threshold breaches, and shift sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setAlerts((prev) =>
                prev.map((a) => ({ ...a, acknowledged: true, acknowledgedBy: 'Carlos Mendoza' }))
              )
            }
          >
            Acknowledge All
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
          <button
            key={sev}
            type="button"
            onClick={() => setSeverityFilter(sev)}
            className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
              severityFilter === sev
                ? 'bg-[#006194] text-white border-[#006194]'
                : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc]'
            }`}
          >
            {sev === 'ALL' ? 'All Incidents' : sev}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="flex flex-col gap-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
              !alert.acknowledged ? 'border-[#006194]/40 ring-1 ring-[#006194]/10' : 'border-[#e2e8f0]'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Badge
                  variant={
                    alert.severity === 'CRITICAL'
                      ? 'danger'
                      : alert.severity === 'WARNING'
                      ? 'warning'
                      : 'info'
                  }
                  dot
                >
                  {alert.severity}
                </Badge>
                <h3 className="text-xs font-bold text-[#0f172a]">{alert.title}</h3>
                <span className="text-[10px] text-[#64748b] font-mono">
                  Source: {alert.source}
                </span>
              </div>
              <p className="text-xs text-[#475569]">{alert.message}</p>
              <div className="mt-2 flex items-center gap-4 text-[10px] text-[#64748b] font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {alert.timestamp}
                </span>
                {alert.acknowledged && (
                  <span className="text-[#16a34a] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Acknowledged by {alert.acknowledgedBy}
                  </span>
                )}
              </div>
            </div>

            <div>
              {!alert.acknowledged ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAcknowledge(alert.id)}
                  icon={<Check className="w-3 h-3" />}
                >
                  Acknowledge
                </Button>
              ) : (
                <span className="text-[11px] font-mono text-[#64748b] px-2.5 py-1 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                  Resolved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
