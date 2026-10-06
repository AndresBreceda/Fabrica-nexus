import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { DashboardPage } from '../../modules/dashboard/pages/DashboardPage';
import { OrdersListPage } from '../../modules/orders/pages/OrdersListPage';
import { OrderDetailPage } from '../../modules/orders/pages/OrderDetailPage';
import { InventoryPage } from '../../modules/inventory/pages/InventoryPage';
import { AnalyticsPage } from '../../modules/analytics/pages/AnalyticsPage';
import { AlertsPage } from '../../modules/alerts/pages/AlertsPage';
import { UsersPage } from '../../modules/users/pages/UsersPage';
import { SettingsPage } from '../../modules/settings/pages/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="orders" element={<OrdersListPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
