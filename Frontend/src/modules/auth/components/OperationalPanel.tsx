import React from 'react';
import { Shield, Server, Activity, CheckCircle2 } from 'lucide-react';

export const OperationalPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col bg-[#0f172a] text-[#faf8ff] p-8 lg:w-[480px] xl:w-[540px] shrink-0 border-r border-[#1e293b] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#006194] via-[#0f172a] to-[#0f172a]"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Badges */}
        <div className="flex items-center gap-3 mb-10">
          <span className="px-2.5 py-1 bg-[#1e293b] text-[#94a3b8] rounded-md text-xs font-mono font-semibold border border-[#334155]">
            SUITE v4.10.2 CORE
          </span>
          <span className="px-2.5 py-1 bg-[#16A34A]/20 text-[#4ade80] rounded-md text-xs font-mono font-semibold border border-[#16A34A]/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse"></span>
            ESTADO GLOBAL: 99.90%
          </span>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
            SUPERVISIÓN EN TIEMPO REAL
          </h1>
          <p className="text-[#94a3b8] text-sm">
            Nexus Production Intelligence
          </p>
        </div>

        {/* Plant Metrics */}
        <div className="space-y-4 mb-auto">
          {/* Detroit */}
          <div className="bg-[#1e293b]/60 border border-[#334155] rounded-xl p-4 backdrop-blur-xs">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-white">Planta Detroit</h3>
                <span className="text-[#94a3b8] text-xs">Ensamble</span>
              </div>
              <Activity className="w-4 h-4 text-[#006194]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-[#64748b] font-mono uppercase mb-1">Estado</div>
                <div className="text-sm font-medium text-[#e2e8f0]">32 Células Activas</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748b] font-mono uppercase mb-1">Métricas</div>
                <div className="text-sm font-medium text-[#e2e8f0]">
                  OEE 88.4% <span className="text-[#4ade80] ml-1 text-xs">↑ +1.4%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-[#94a3b8]">99.9% Rendimiento</div>
          </div>

          {/* Cleveland */}
          <div className="bg-[#1e293b]/60 border border-[#334155] rounded-xl p-4 backdrop-blur-xs">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-white">Planta Cleveland</h3>
                <span className="text-[#94a3b8] text-xs">Maquinado CNC</span>
              </div>
              <Activity className="w-4 h-4 text-[#006194]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-[#64748b] font-mono uppercase mb-1">Estado</div>
                <div className="text-sm font-medium text-[#e2e8f0]">18 Ejes de Corte</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748b] font-mono uppercase mb-1">Métricas</div>
                <div className="text-sm font-medium text-[#e2e8f0]">OEE 91.2%</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-[#94a3b8]">100% Nominal (Estable)</div>
          </div>

          {/* Indianapolis */}
          <div className="bg-[#1e293b]/60 border border-[#334155] rounded-xl p-4 backdrop-blur-xs">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-white">Planta Indianapolis</h3>
                <span className="text-[#94a3b8] text-xs">Hidráulica</span>
              </div>
              <Activity className="w-4 h-4 text-[#006194]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-[#64748b] font-mono uppercase mb-1">Estado</div>
                <div className="text-sm font-medium text-[#e2e8f0]">14 Bancos de Prueba</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748b] font-mono uppercase mb-1">Métricas</div>
                <div className="text-sm font-medium text-[#e2e8f0]">
                  OEE 86.9% <span className="text-[#4ade80] ml-1 text-xs">↑ +0.6%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-[#94a3b8]">99.8% Nominal</div>
          </div>
        </div>

        {/* Active Shift Card */}
        <div className="mt-8 bg-[#006194]/20 border border-[#006194]/40 rounded-lg p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#006194] rounded-full flex items-center justify-center shrink-0">
            <Server className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Turno Operativo B (Vespertino) Activo</h4>
            <p className="text-xs text-[#94a3b8] mt-0.5">Traspaso de mandos programado en 4 hrs.</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#334155] pt-6">
          <div className="flex items-center gap-1.5 text-[#64748b] text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Enclave protegido</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#64748b] text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ISO 27001 / SOC 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
