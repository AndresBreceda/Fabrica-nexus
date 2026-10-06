import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Factory,
  FileText,
  Boxes,
  LineChart,
  BellRing,
  Users,
  Settings,
  LogOut,
  Activity,
} from 'lucide-react';

interface SidebarProps {
  alertCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ alertCount = 3 }) => {
  const mainNav = [
    { label: 'Production Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Production Orders', path: '/orders', icon: Factory },
    { label: 'Order Details', path: '/orders/ORD-8921', icon: FileText },
    { label: 'Inventory', path: '/inventory', icon: Boxes },
    { label: 'Analytics', path: '/analytics', icon: LineChart },
    {
      label: 'Alerts',
      path: '/alerts',
      icon: BellRing,
      badge: alertCount > 0 ? alertCount : undefined,
    },
  ];

  const adminNav = [
    { label: 'Users & Roles', path: '/users', icon: Users },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white z-50 flex flex-col justify-between border-r border-[#e2e8f0] shadow-xs">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-[#e2e8f0]">
          <div className="w-9 h-9 rounded bg-[#006194] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            N
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#0f172a] tracking-tight leading-tight">
              NEXUS
            </span>
            <span className="text-[10px] font-semibold text-[#006194] uppercase tracking-wider">
              Intelligence Core
            </span>
          </div>
        </div>

        {/* System Core Pulse */}
        <div className="px-3 py-2.5">
          <div className="px-2.5 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#006a63]" />
              <span className="text-[11px] font-mono uppercase text-[#475569] font-medium">
                System Core
              </span>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]"></span>
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-2 flex flex-col gap-1 overflow-y-auto">
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded text-xs transition-colors font-medium ${
                    isActive
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-[#fee2e2] text-[#dc2626] font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="my-2 px-2 pt-2 border-t border-[#f1f5f9]">
            <span className="text-[10px] uppercase font-semibold text-[#94a348] tracking-wider font-mono">
              Workspace
            </span>
          </div>

          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded text-xs transition-colors font-medium ${
                    isActive
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Operator Session Info */}
      <div className="p-3 m-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#e2e8f0] border border-[#cbd5e1] flex items-center justify-center font-bold text-xs text-[#0f172a]">
            CM
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-[#0f172a] truncate">
              Carlos Mendoza
            </span>
            <span className="text-[10px] text-[#64748b] truncate font-mono">
              Shift A • Plant Mgr
            </span>
          </div>
          <button
            title="Cerrar sesión"
            className="text-[#64748b] hover:text-[#dc2626] p-1 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
