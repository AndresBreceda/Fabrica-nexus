import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Printer,
  FileCheck,
} from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id = 'ORD-8921' } = useParams<{ id: string }>();

  const stages = [
    { name: '1. Raw Stock Staging & Ultrasonic Clean', status: 'COMPLETED', duration: '2h 15m', lead: 'J. Doe' },
    { name: '2. 5-Axis CNC Precision Milling (M-01)', status: 'COMPLETED', duration: '5h 40m', lead: 'E. Rostova' },
    { name: '3. Surface Anodizing & Passivation', status: 'IN_PROGRESS', duration: 'Active (3h 10m)', lead: 'K. Takahashi' },
    { name: '4. CMM Coordinate Metrology & Tolerance Check', status: 'PENDING', duration: 'Est. 1h 30m', lead: 'Quality Team' },
    { name: '5. Cleanroom Assembly & Anti-Corrosion Pack', status: 'PENDING', duration: 'Est. 2h 00m', lead: 'S. Benitez' },
  ];

  const bomItems = [
    { sku: 'AL-7075-T6', desc: 'Aerospace Grade Aluminum Billet (Ø 120mm)', req: '1,250 kg', issued: '1,250 kg', status: 'ALLOCATED' },
    { sku: 'ORING-VT-04', desc: 'Viton Fluoropolymer O-Ring High Temp', req: '2,400 pcs', issued: '2,400 pcs', status: 'ALLOCATED' },
    { sku: 'FAST-SS-M6', desc: 'Torx Flange Screw Grade A4-80 Stainless', req: '9,600 pcs', issued: '9,600 pcs', status: 'ALLOCATED' },
    { sku: 'COAT-ANOD-B', desc: 'Type III Hardcoat Anodizing Fluid', req: '45 L', issued: '45 L', status: 'IN_PROCESS' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#006194] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Production Orders
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={<Printer className="w-3.5 h-3.5" />}>
            Print Traveler Ticket
          </Button>
          <Button variant="primary" size="sm" icon={<FileCheck className="w-3.5 h-3.5" />}>
            Sign Off Current Stage
          </Button>
        </div>
      </div>

      {/* Order Banner */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#0f172a] font-mono">{id}</h1>
            <Badge variant="warning" dot>IN PRODUCTION (STAGE 3/5)</Badge>
            <Badge variant="danger">PRIORITY CRITICAL</Badge>
          </div>
          <p className="text-xs text-[#0f172a] font-medium mt-1">
            Precision Hydraulic Actuator Housing — Batch Lot <span className="font-mono text-[#006194]">LOT-2026-X88</span>
          </p>
          <p className="text-[11px] text-[#64748b]">
            Customer: AeroDynamics Global Corp • Contract: #AG-2026-Q4-019
          </p>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#f1f5f9] pt-3 md:pt-0 md:pl-6">
          <div>
            <span className="text-[10px] uppercase font-mono text-[#64748b] block">Target Units</span>
            <span className="text-xl font-bold font-mono text-[#0f172a]">1,200</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-[#64748b] block">Yield Accept</span>
            <span className="text-xl font-bold font-mono text-[#16a34a]">940</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-[#64748b] block">Target Delivery</span>
            <span className="text-sm font-semibold font-mono text-[#0f172a] flex items-center gap-1 mt-1">
              <Calendar className="w-3.5 h-3.5 text-[#64748b]" /> Oct 08, 2026
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Routing Workflow & Bill of Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Stages Workflow */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Card title="Manufacturing Traveler & Stage Routing" subtitle="Real-time shop floor sign-offs and operation routing">
            <div className="flex flex-col gap-3">
              {stages.map((stage, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all ${
                    stage.status === 'COMPLETED'
                      ? 'bg-[#f8fafc] border-[#e2e8f0]'
                      : stage.status === 'IN_PROGRESS'
                      ? 'bg-white border-[#006194] shadow-xs ring-1 ring-[#006194]/20'
                      : 'bg-white border-[#f1f5f9] opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#0f172a]">{stage.name}</span>
                    <Badge
                      variant={
                        stage.status === 'COMPLETED'
                          ? 'success'
                          : stage.status === 'IN_PROGRESS'
                          ? 'primary'
                          : 'neutral'
                      }
                      dot={stage.status === 'IN_PROGRESS'}
                    >
                      {stage.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748b] font-mono mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Duration: {stage.duration}
                    </span>
                    <span>Sign-off: {stage.lead}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bill of Materials (BOM) */}
          <Card title="Bill of Materials & Raw Material Allocation" subtitle="Lot genealogy and stock consumption validation">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] uppercase font-mono text-[10px]">
                    <th className="py-2 px-3">Item SKU</th>
                    <th className="py-2 px-3">Material Description</th>
                    <th className="py-2 px-3">Required</th>
                    <th className="py-2 px-3">Issued</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {bomItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc]">
                      <td className="py-2.5 px-3 font-mono font-medium text-[#006194]">{item.sku}</td>
                      <td className="py-2.5 px-3 font-medium text-[#0f172a]">{item.desc}</td>
                      <td className="py-2.5 px-3 font-mono">{item.req}</td>
                      <td className="py-2.5 px-3 font-mono text-[#16a34a] font-semibold">{item.issued}</td>
                      <td className="py-2.5 px-3">
                        <Badge variant="success">{item.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quality and Telemetry Inspection Panel */}
        <div className="flex flex-col gap-5">
          <Card title="Metrology & CMM Quality Tolerance" subtitle="Live automated inspection logs">
            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-[#0f172a]">Bore Diameter Tolerancing</span>
                  <span className="font-mono text-[11px] text-[#16a34a] font-bold">45.002 mm (Pass)</span>
                </div>
                <span className="text-[10px] text-[#64748b] font-mono">Spec: 45.000 ± 0.005 mm</span>
              </div>

              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-[#0f172a]">Surface Roughness Ra</span>
                  <span className="font-mono text-[11px] text-[#16a34a] font-bold">0.42 µm (Pass)</span>
                </div>
                <span className="text-[10px] text-[#64748b] font-mono">Spec: Ra ≤ 0.80 µm</span>
              </div>

              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-[#0f172a]">Flange Perpendicularity</span>
                  <span className="font-mono text-[11px] text-[#16a34a] font-bold">0.012 mm (Pass)</span>
                </div>
                <span className="text-[10px] text-[#64748b] font-mono">Spec: ≤ 0.020 mm</span>
              </div>
            </div>
          </Card>

          <Card title="Shop Floor Routing Telemetry" subtitle="Sensor data during milling phase">
            <div className="flex flex-col gap-2.5 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                <span className="text-[#64748b]">Spindle Speed:</span>
                <span className="font-bold text-[#0f172a]">12,400 RPM</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                <span className="text-[#64748b]">Tool Wear Index:</span>
                <span className="font-bold text-[#16a34a]">14% (Fresh Carbide)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                <span className="text-[#64748b]">Coolant Flow:</span>
                <span className="font-bold text-[#0f172a]">28.4 L/min</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#64748b]">CNC Power Draw:</span>
                <span className="font-bold text-[#0f172a]">18.2 kW</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
