import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageSubscriptionExternal from "./pages/manageSubscription/ManageSubcriptionExternal";
import Login from "./pages/login/Login";
import Layout from "./components/layout/Layout";
import Payments from "./pages/payments/Payments";
import Customers from "./pages/customers/Customers";
import Integrations from "./pages/integrations/Integrations";
import Payouts from "./pages/payouts/Payouts";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/manage-subscription/:authToken"
          element={<ManageSubscriptionExternal />}
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/payments" element={<Payments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/payouts" element={<Payouts />} />

        <Route path="/page-not-found" element={<NotFound />} />
        {/* Catch all route  */}
        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </Layout>
  );
}

export default App;
