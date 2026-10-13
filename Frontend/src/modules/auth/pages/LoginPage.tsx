import React from 'react';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f2f3ff] font-sans">
      {/* App Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#f2f3ff]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Nexus" className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-lg shadow-sm">
          </img>
          <div className="leading-none">
            <div className="text-[14px] font-bold text-[#131b2e]">Nexus</div>
            <div className="text-[9px] font-mono font-medium tracking-widest text-[#707881] uppercase">
              Enterprise Portal
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-4">
          <a href="/support" className="text-[12px] text-[#475569] hover:text-[#131b2e] transition-colors">
            Ayuda
          </a>
          <a href="/support" className="text-[12px] text-[#475569] hover:text-[#131b2e] transition-colors">
            Soporte IT
          </a>
        </nav>
      </header>

      {/* Main — centered card */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px] bg-white rounded-lg border border-[#e2e8f0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] p-8">
          <LoginForm />
        </div>
      </main>

      {/* App Footer */}
      <footer className="flex items-center justify-between px-6 py-3">
        <p className="text-[11px] text-[#707881]">
          © 2025 Nexus Manufacturing · Enterprise Portal
        </p>
        <nav className="flex items-center gap-3">
          <a href="#" className="text-[11px] text-[#707881] hover:text-[#3f4850] transition-colors">
            Términos de Servicio
          </a>
          <a href="#" className="text-[11px] text-[#707881] hover:text-[#3f4850] transition-colors">
            Privacidad
          </a>
          <a href="#" className="text-[11px] text-[#707881] hover:text-[#3f4850] transition-colors">
            Soporte de TI
          </a>
          <a href="#" className="text-[11px] text-[#707881] hover:text-[#3f4850] transition-colors">
            Estado del Sistema
          </a>
        </nav>
      </footer>
    </div>
  );
};
