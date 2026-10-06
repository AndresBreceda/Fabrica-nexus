import React from 'react';
import { Search, Factory, Calendar, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md z-40 flex items-center justify-between px-6 border-b border-[#e2e8f0]">
      {/* Search & Plant Selector */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg w-full max-w-md focus-within:border-[#006194] transition-colors">
          <Search className="w-4 h-4 text-[#64748b] shrink-0" />
          <input
            type="text"
            placeholder="Search orders, lots, sensors, inventory..."
            className="bg-transparent border-0 outline-hidden w-full text-xs text-[#0f172a] placeholder:text-[#94a3b8]"
          />
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded text-[#64748b]">
            ⌘K
          </kbd>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[#0f172a] cursor-pointer hover:bg-[#f1f5f9] transition-colors">
          <Factory className="w-4 h-4 text-[#006194]" />
          <span className="text-xs font-semibold">Plant Alpha & Beta</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
        </div>
      </div>

      {/* Live Status and Right Controls */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-[#dcfce7]/60 border border-[#bbf7d0] rounded-full text-[#16a34a]">
          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
          <span className="font-mono text-[11px] font-semibold tracking-wide uppercase">
            Telemetry Stream Live
          </span>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] rounded-lg transition-colors text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
          <span>Oct 06, 2026</span>
        </button>

        <button className="relative p-2 rounded-lg text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] border border-[#e2e8f0] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#dc2626] rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-[#e2e8f0] cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
            CM
          </div>
          <div className="hidden md:flex flex-col text-left leading-none">
            <span className="text-xs font-semibold text-[#0f172a]">Carlos M.</span>
            <span className="text-[10px] text-[#64748b] font-mono mt-0.5">Shift Supervisor</span>
          </div>
        </div>
      </div>
    </header>
  );
};
