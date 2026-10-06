import React from 'react';
import type { UserRole } from '../../../shared/types';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Plus } from 'lucide-react';

const mockUsers: UserRole[] = [
  {
    id: 'usr-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@nexus-fabrica.internal',
    role: 'PRODUCTION_MANAGER',
    facility: 'Plant Alpha & Beta',
    activeShift: 'Shift A (Day)',
    status: 'ACTIVE',
    lastSeen: 'Active Now',
  },
  {
    id: 'usr-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@nexus-fabrica.internal',
    role: 'LINE_OPERATOR',
    facility: 'Plant Alpha (CNC Bay)',
    activeShift: 'Shift A (Day)',
    status: 'ACTIVE',
    lastSeen: '12m ago',
  },
  {
    id: 'usr-3',
    name: 'Marcus Vance',
    email: 'marcus.vance@nexus-fabrica.internal',
    role: 'SHIFT_SUPERVISOR',
    facility: 'Plant Alpha (Heavy Bay)',
    activeShift: 'Shift A (Day)',
    status: 'ACTIVE',
    lastSeen: 'Active Now',
  },
  {
    id: 'usr-4',
    name: 'Kenji Takahashi',
    email: 'kenji.takahashi@nexus-fabrica.internal',
    role: 'QUALITY_INSPECTOR',
    facility: 'Plant Beta (Chemical Wing)',
    activeShift: 'Shift B (Night)',
    status: 'OFF_SHIFT',
    lastSeen: 'Yesterday',
  },
];

export const UsersPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
            Users & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Manage floor operators, shift leads, QA inspectors, and cryptographic token access.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Invite Operator
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] uppercase font-mono text-[10px]">
                <th className="py-2.5 px-4">Operator / Name</th>
                <th className="py-2.5 px-4">Role Designation</th>
                <th className="py-2.5 px-4">Facility & Wing</th>
                <th className="py-2.5 px-4">Assigned Shift</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Last Activity</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#0f172a] block">{user.name}</span>
                    <span className="text-[10px] text-[#64748b] font-mono">{user.email}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#006194] font-semibold text-[11px]">
                    {user.role}
                  </td>
                  <td className="py-3 px-4 text-[#475569]">{user.facility}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#64748b]">{user.activeShift}</td>
                  <td className="py-3 px-4">
                    {user.status === 'ACTIVE' ? (
                      <Badge variant="success" dot>ON SHIFT</Badge>
                    ) : (
                      <Badge variant="neutral">OFF SHIFT</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-[#64748b]">{user.lastSeen}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-xs text-[#006194] hover:underline font-medium">
                      Edit Permissions
                    </button>
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
