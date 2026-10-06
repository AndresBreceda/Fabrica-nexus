import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex">
      {/* Fixed Sidebar */}
      <Sidebar alertCount={3} />

      {/* Main Content Area */}
      <div className="pl-64 flex flex-col flex-1 min-w-0">
        <Header />
        <main className="pt-16 p-6 flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
