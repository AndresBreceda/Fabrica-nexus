import React, { useState } from 'react';
import type { InventoryItem } from '../../../shared/types';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import {
  Search,
  Filter,
  Plus,
  ArrowDownToLine,
} from 'lucide-react';

const mockInventory: InventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'AL-7075-T6',
    name: 'Aerospace Grade Aluminum Billet (Ø 120mm)',
    category: 'RAW_MATERIAL',
    location: 'Bay 4 - Rack A12',
    inStock: 4800,
    safetyStock: 1500,
    reorderPoint: 2000,
    unit: 'kg',
    status: 'OPTIMAL',
    supplier: 'Alcoa Materials Global',
    lastUpdated: '2026-10-06 09:30',
  },
  {
    id: 'inv-2',
    sku: 'TI-GR5-BAR',
    name: 'Titanium Grade 5 Round Bar (Ø 45mm)',
    category: 'RAW_MATERIAL',
    location: 'Bay 4 - Rack B04',
    inStock: 340,
    safetyStock: 500,
    reorderPoint: 600,
    unit: 'kg',
    status: 'CRITICAL_LOW',
    supplier: 'Titanium Precision Ltd',
    lastUpdated: '2026-10-06 11:15',
  },
  {
    id: 'inv-3',
    sku: 'ORING-VT-04',
    name: 'Viton Fluoropolymer O-Ring High Temp',
    category: 'COMPONENTS',
    location: 'Bin Storage 18 - Drawer C',
    inStock: 12500,
    safetyStock: 4000,
    reorderPoint: 5000,
    unit: 'pcs',
    status: 'OPTIMAL',
    supplier: 'Seals & Gaskets Direct',
    lastUpdated: '2026-10-05 16:45',
  },
  {
    id: 'inv-4',
    sku: 'COAT-ANOD-B',
    name: 'Type III Hardcoat Anodizing Fluid Chemical',
    category: 'CONSUMABLES',
    location: 'Chemical Vault - Tank 2',
    inStock: 180,
    safetyStock: 200,
    reorderPoint: 250,
    unit: 'L',
    status: 'REORDER_REQUIRED',
    supplier: 'ChemFinish Industrial',
    lastUpdated: '2026-10-06 08:00',
  },
  {
    id: 'inv-5',
    sku: 'FAST-SS-M6',
    name: 'Torx Flange Screw Grade A4-80 Stainless',
    category: 'COMPONENTS',
    location: 'Bin Storage 02 - Shelf 1',
    inStock: 34200,
    safetyStock: 10000,
    reorderPoint: 15000,
    unit: 'pcs',
    status: 'OPTIMAL',
    supplier: 'Würth Industry North',
    lastUpdated: '2026-10-04 14:20',
  },
];

export const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredItems = mockInventory.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
            Inventory & Raw Materials Control
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Shop-floor stock levels, critical component safety thresholds, and supplier batch genealogy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={<ArrowDownToLine className="w-3.5 h-3.5" />}>
            Export Inventory
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
            Receive Goods (GRN)
          </Button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-3.5 bg-white rounded-lg border border-[#e2e8f0] shadow-xs">
          <span className="text-[11px] font-mono uppercase text-[#64748b]">Total Tracked SKUs</span>
          <div className="text-2xl font-bold text-[#0f172a] mt-1">1,480 items</div>
          <span className="text-[10px] text-[#16a34a] font-mono mt-1 block">98.2% in optimal safety range</span>
        </div>

        <div className="p-3.5 bg-white rounded-lg border border-[#e2e8f0] shadow-xs">
          <span className="text-[11px] font-mono uppercase text-[#64748b]">Reorder Threshold Alerts</span>
          <div className="text-2xl font-bold text-[#d97706] mt-1">4 items</div>
          <span className="text-[10px] text-[#64748b] font-mono mt-1 block">Automated PO generated</span>
        </div>

        <div className="p-3.5 bg-white rounded-lg border border-[#e2e8f0] shadow-xs">
          <span className="text-[11px] font-mono uppercase text-[#64748b]">Critical Stock Deficit</span>
          <div className="text-2xl font-bold text-[#dc2626] mt-1">1 item</div>
          <span className="text-[10px] text-[#dc2626] font-mono mt-1 block">TI-GR5-BAR below safety stock</span>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white p-3 rounded-lg border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-1">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg w-full max-w-sm">
            <Search className="w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search SKU, description, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-0 outline-hidden w-full text-xs text-[#0f172a] placeholder:text-[#94a3b8]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-[#64748b]" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#f8fafc] border border-[#e2e8f0] text-xs font-medium text-[#0f172a] rounded-lg px-2.5 py-1.5 outline-hidden cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="RAW_MATERIAL">Raw Material</option>
              <option value="COMPONENTS">Components</option>
              <option value="CONSUMABLES">Consumables</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-[#64748b] font-mono">
          Showing <span className="font-bold text-[#0f172a]">{filteredItems.length}</span> SKUs
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] uppercase font-mono text-[10px]">
                <th className="py-2.5 px-4">SKU / Code</th>
                <th className="py-2.5 px-4">Item Name</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Bin Location</th>
                <th className="py-2.5 px-4">In Stock / Safety</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#006194]">
                    {item.sku}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#0f172a]">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#64748b]">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#475569]">
                    {item.location}
                  </td>
                  <td className="py-3 px-4 min-w-36">
                    <div className="font-mono text-[11px] flex justify-between mb-1">
                      <span className="font-bold text-[#0f172a]">{item.inStock.toLocaleString()} {item.unit}</span>
                      <span className="text-[#64748b]">Min: {item.safetyStock.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-[#f1f5f9] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          item.status === 'OPTIMAL'
                            ? 'bg-[#16a34a]'
                            : item.status === 'REORDER_REQUIRED'
                            ? 'bg-[#d97706]'
                            : 'bg-[#dc2626]'
                        }`}
                        style={{
                          width: `${Math.min((item.inStock / (item.safetyStock * 2)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {item.status === 'OPTIMAL' && <Badge variant="success" dot>OPTIMAL</Badge>}
                    {item.status === 'REORDER_REQUIRED' && <Badge variant="warning" dot>REORDER</Badge>}
                    {item.status === 'CRITICAL_LOW' && <Badge variant="danger" dot>CRITICAL</Badge>}
                  </td>
                  <td className="py-3 px-4 text-[#475569]">
                    {item.supplier}
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
