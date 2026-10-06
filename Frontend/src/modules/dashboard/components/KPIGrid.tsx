import React from 'react';
import type { ProductionKPI } from '../../../shared/types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPIGridProps {
  kpis: ProductionKPI[];
}

export const KPIGrid: React.FC<KPIGridProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-white rounded-lg border border-[#e2e8f0] p-3.5 shadow-xs flex flex-col justify-between hover:border-[#cbd5e1] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#64748b]">
              {kpi.label}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                kpi.isPositive
                  ? 'bg-[#dcfce7] text-[#16a34a]'
                  : 'bg-[#fee2e2] text-[#dc2626]'
              }`}
            >
              {kpi.isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {kpi.change}
            </span>
          </div>

          <div className="my-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#0f172a] tracking-tight font-sans">
              {kpi.value}
            </span>
            {kpi.unit && (
              <span className="text-xs text-[#64748b] font-mono">{kpi.unit}</span>
            )}
          </div>

          <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#64748b]">
            <span>{kpi.benchmark || 'Target Optimal'}</span>
            {kpi.statusText && (
              <span className="font-mono text-[#006a63] font-semibold">
                {kpi.statusText}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
