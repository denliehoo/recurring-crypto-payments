import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageSubscriptionExternal from "./pages/manageSubscription/ManageSubcriptionExternal";
import Login from "./pages/login/Login";
import Layout from "./components/layout/Layout";
import Payments from "./pages/payments/Payments";
import Customers from "./pages/customers/Customers";
import Integrations from "./pages/integrations/Integrations";
import Payouts from "./pages/payouts/Payouts";

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

        <Route path="/payments" element={<Payments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/payouts" element={<Payouts />} />
      </Routes>
    </Layout>
  );
}

export default App;
