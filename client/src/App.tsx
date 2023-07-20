import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageSubscriptionExternal from "./pages/manageSubscription/ManageSubcriptionExternal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/manage-subscription/:authToken"
        element={<ManageSubscriptionExternal />}
      />
    </Routes>
  );
}

export default App;
