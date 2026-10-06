import React from 'react';
import type { AlertNotification } from '../../../shared/types';
import { Badge } from '../../../shared/components/Badge';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentAlertsWidgetProps {
  alerts: AlertNotification[];
}

export const RecentAlertsWidget: React.FC<RecentAlertsWidgetProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#dc2626]" />
          <h3 className="text-sm font-semibold text-[#0f172a]">Active Incident Log</h3>
        </div>
        <Link
          to="/alerts"
          className="text-xs text-[#006194] hover:underline font-medium inline-flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3 rounded-lg border border-[#f1f5f9] bg-[#f8fafc] hover:border-[#e2e8f0] transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs text-[#0f172a]">{alert.title}</span>
              <Badge
                variant={
                  alert.severity === 'CRITICAL'
                    ? 'danger'
                    : alert.severity === 'WARNING'
                    ? 'warning'
                    : 'info'
                }
              >
                {alert.severity}
              </Badge>
            </div>
            <p className="text-xs text-[#475569]">{alert.message}</p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-[#64748b] font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.timestamp}
              </span>
              <span>Source: {alert.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
