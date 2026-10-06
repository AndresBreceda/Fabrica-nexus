import React from 'react';
import type { ProductionLine } from '../../../shared/types';
import { Badge } from '../../../shared/components/Badge';
import { Cpu } from 'lucide-react';

interface ProductionLinesTableProps {
  lines: ProductionLine[];
}

export const ProductionLinesTable: React.FC<ProductionLinesTableProps> = ({ lines }) => {
  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-xs">
      <div className="px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#006194]" />
          <h3 className="text-sm font-semibold text-[#0f172a]">Active Production Cells</h3>
        </div>
        <span className="text-[11px] font-mono text-[#64748b]">
          4 Lines Connected • Cycle Interval: 1.2s
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] font-medium uppercase font-mono text-[10px]">
              <th className="py-2.5 px-4">Line / Cell</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Active Lot</th>
              <th className="py-2.5 px-4">Output / Target</th>
              <th className="py-2.5 px-4">OEE %</th>
              <th className="py-2.5 px-4">Telemetry</th>
              <th className="py-2.5 px-4">Shift Lead</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {lines.map((line) => {
              const progress = Math.round((line.completedUnits / line.targetUnits) * 100);
              return (
                <tr key={line.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#0f172a]">
                    {line.name}
                    <span className="block text-[10px] text-[#64748b] font-mono font-normal">
                      {line.facility}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {line.status === 'OPERATIONAL' && (
                      <Badge variant="success" dot>RUNNING</Badge>
                    )}
                    {line.status === 'DEGRADED' && (
                      <Badge variant="warning" dot>DEGRADED</Badge>
                    )}
                    {line.status === 'DOWN' && (
                      <Badge variant="danger" dot>STOPPED</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-[#006194]">
                    {line.activeLot}
                  </td>
                  <td className="py-3 px-4 min-w-40">
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span>{line.completedUnits.toLocaleString()}</span>
                      <span className="text-[#64748b]">{line.targetUnits.toLocaleString()} ({progress}%)</span>
                    </div>
                    <div className="w-full bg-[#f1f5f9] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#006194] h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#0f172a]">
                    <span className={line.oee >= 90 ? 'text-[#16a34a]' : line.oee >= 80 ? 'text-[#d97706]' : 'text-[#dc2626]'}>
                      {line.oee}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#64748b]">
                    <div className="flex items-center gap-2">
                      <span title="Temperature">{line.temperatureC}°C</span>
                      <span className="text-[#cbd5e1]">•</span>
                      <span title="Vibration">{line.vibrationMmS} mm/s</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#475569]">
                    {line.operator}
                    <span className="block text-[10px] text-[#94a3b8] font-mono">
                      {line.currentShift}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
