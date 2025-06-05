import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';

import Login from './pages/login';
import Layout from './components/layout/Layout';
import Payments from './pages/payments';
import Customers from './pages/customers';
import Integrations from './pages/integrations';
import Payouts from './pages/payouts';
import VerifyEmail from './pages/verify-email';
import NotFound from './pages/not-found';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/payments" element={<Payments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/payouts" element={<Payouts />} />

        <Route path="/page-not-found" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Catch all route  */}
        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </Layout>
  );
}

export default App;
