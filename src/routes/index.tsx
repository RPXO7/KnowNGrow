import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import Dashboard from '@/pages/dashboard';
import Inventory from '@/pages/inventory';
import Orders from '@/pages/orders';
import Analytics from '@/pages/analytics';
import Sales from '@/pages/sales';
import Settings from '@/pages/settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.INVENTORY} element={<Inventory />} />
      <Route path={ROUTES.ORDERS} element={<Orders />} />
      <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
      <Route path={ROUTES.SALES} element={<Sales />} />
      <Route path={ROUTES.SETTINGS} element={<Settings />} />
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}