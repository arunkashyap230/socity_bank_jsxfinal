import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Loans from "./pages/Loans";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Guarantors from "./pages/Guarantors";
import Notices from "./pages/Notices";
import Summary from "./pages/Summary";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AUTH_KEY = "society-auth";

const isAuthenticated = () => localStorage.getItem(AUTH_KEY) === "true";

const ProtectedLayout = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <DashboardLayout />;
};

const LoginOnlyRoute = () => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <Login />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginOnlyRoute />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loans/apply" element={<Loans />} />
          <Route path="/loans/member" element={<Loans />} />
          <Route path="/loans/details" element={<Loans />} />
          <Route path="/loans/guarantor" element={<Loans />} />
          <Route path="/loans/bank" element={<Loans />} />
          <Route path="/loans/confirm" element={<Loans />} />
          <Route path="/loans/guarantors" element={<Loans />} />
          <Route path="/guarantors" element={<Guarantors />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
