import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Layout from './components/layout/Layout';
import Login from './pages/login';
import NotFound from './pages/not-found';
import LoadingOverlay from '@components/loading-overlay';

const Dashboard = lazy(
  () => import(/* webpackChunkName: "dashboard" */ './pages/dashboard'),
);
const Payments = lazy(
  () => import(/* webpackChunkName: "payments" */ './pages/payments'),
);
const Customers = lazy(
  () => import(/* webpackChunkName: "customers" */ './pages/customers'),
);
const Integrations = lazy(
  () => import(/* webpackChunkName: "integrations" */ './pages/integrations'),
);
const Payouts = lazy(
  () => import(/* webpackChunkName: "payouts" */ './pages/payouts'),
);
const VerifyEmail = lazy(
  () => import(/* webpackChunkName: "verify-email" */ './pages/verify-email'),
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingOverlay isLoading />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/page-not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="*" element={<Navigate to="/page-not-found" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
