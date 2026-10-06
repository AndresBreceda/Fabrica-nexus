import React, { useState } from 'react';
import type { ProductionOrder } from '../../../shared/types';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, ExternalLink, Calendar } from 'lucide-react';

const mockOrders: ProductionOrder[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-8921',
    partName: 'Precision Hydraulic Actuator Housing',
    sku: 'ACT-HYD-409',
    customer: 'AeroDynamics Global Corp',
    quantity: 1200,
    completedQuantity: 940,
    progressPercentage: 78,
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    line: 'Cell Alpha (CNC-01)',
    startDate: '2026-10-04',
    dueDate: '2026-10-08',
    batchLot: 'LOT-2026-X88',
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-8922',
    partName: 'Titanium Rotor Shaft Bushing',
    sku: 'BSH-TI-991',
    customer: 'Nordic Turbine Energy',
    quantity: 2500,
    completedQuantity: 2500,
    progressPercentage: 100,
    status: 'COMPLETED',
    priority: 'MEDIUM',
    line: 'Robotic Weld Cell (R-WELD-04)',
    startDate: '2026-10-01',
    dueDate: '2026-10-06',
    batchLot: 'LOT-2026-B12',
  },
  {
    id: 'ord-3',
    orderNumber: 'ORD-8923',
    partName: 'Sensory Bracket Mount Sub-Assembly',
    sku: 'BRK-MNT-12',
    customer: 'RoboAutomate Systems',
    quantity: 3400,
    completedQuantity: 1100,
    progressPercentage: 32,
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    line: 'Surface Line (SURF-09)',
    startDate: '2026-10-05',
    dueDate: '2026-10-10',
    batchLot: 'LOT-2026-C04',
  },
  {
    id: 'ord-4',
    orderNumber: 'ORD-8924',
    partName: 'High-Torque Planetary Gear Set',
    sku: 'PGR-770-HD',
    customer: 'Vanguard Industrial Drive',
    quantity: 800,
    completedQuantity: 0,
    progressPercentage: 0,
    status: 'SCHEDULED',
    priority: 'MEDIUM',
    line: 'Cell Alpha (CNC-01)',
    startDate: '2026-10-09',
    dueDate: '2026-10-14',
    batchLot: 'LOT-2026-E01',
  },
  {
    id: 'ord-5',
    orderNumber: 'ORD-8925',
    partName: 'Sealed Gasket Flange Polymer 50mm',
    sku: 'FLG-PLM-50',
    customer: 'AquaPumps International',
    quantity: 5000,
    completedQuantity: 5000,
    progressPercentage: 100,
    status: 'COMPLETED',
    priority: 'LOW',
    line: 'Packaging Unit (PKG-02)',
    startDate: '2026-10-02',
    dueDate: '2026-10-05',
    batchLot: 'LOT-2026-P99',
  },
];

export const OrdersListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.batchLot.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
            Production Orders & Batch Routing
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Track manufacturing batches, work-in-progress (WIP), and scheduled shop-floor releases.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Create Production Order
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-lg border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-1">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg w-full max-w-sm">
            <Search className="w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search by Order #, part, lot or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-0 outline-hidden w-full text-xs text-[#0f172a] placeholder:text-[#94a3b8]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-[#64748b]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#f8fafc] border border-[#e2e8f0] text-xs font-medium text-[#0f172a] rounded-lg px-2.5 py-1.5 outline-hidden cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-[#64748b] font-mono shrink-0">
          Showing <span className="font-bold text-[#0f172a]">{filteredOrders.length}</span> of {mockOrders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] font-medium uppercase font-mono text-[10px]">
                <th className="py-2.5 px-4">Order / Lot</th>
                <th className="py-2.5 px-4">Part Specification</th>
                <th className="py-2.5 px-4">Customer</th>
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Progress / Output</th>
                <th className="py-2.5 px-4">Assigned Cell</th>
                <th className="py-2.5 px-4">Due Date</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-mono">
                    <Link
                      to={`/orders/${order.orderNumber}`}
                      className="font-bold text-[#006194] hover:underline flex items-center gap-1"
                    >
                      {order.orderNumber}
                      <ExternalLink className="w-3 h-3 text-[#94a3b8]" />
                    </Link>
                    <span className="block text-[10px] text-[#64748b]">
                      {order.batchLot}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#0f172a] block">
                      {order.partName}
                    </span>
                    <span className="text-[10px] text-[#64748b] font-mono">
                      SKU: {order.sku}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#475569]">
                    {order.customer}
                  </td>

                  <td className="py-3 px-4">
                    {order.priority === 'CRITICAL' && (
                      <Badge variant="danger" dot>CRITICAL</Badge>
                    )}
                    {order.priority === 'HIGH' && (
                      <Badge variant="warning" dot>HIGH</Badge>
                    )}
                    {order.priority === 'MEDIUM' && (
                      <Badge variant="neutral">MEDIUM</Badge>
                    )}
                    {order.priority === 'LOW' && (
                      <Badge variant="neutral">LOW</Badge>
                    )}
                  </td>

                  <td className="py-3 px-4 min-w-36">
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span>{order.completedQuantity.toLocaleString()} / {order.quantity.toLocaleString()}</span>
                      <span className="font-bold text-[#0f172a]">{order.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-[#f1f5f9] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          order.progressPercentage === 100
                            ? 'bg-[#16a34a]'
                            : 'bg-[#006194]'
                        }`}
                        style={{ width: `${order.progressPercentage}%` }}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">
                    {order.line}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-[#64748b]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#94a3b8]" />
                      {order.dueDate}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/orders/${order.orderNumber}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#e2e8f0] text-[#0f172a] hover:bg-[#f1f5f9] rounded text-[11px] font-medium transition-colors"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
