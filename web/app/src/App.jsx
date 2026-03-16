import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import RequireAuth from '@/components/auth/RequireAuth';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import SOSCenter from './pages/SOSCenter';
import LiveMap from './pages/LiveMap';
import Incidents from './pages/Incidents';
import Guards from './pages/Guards';
import Patrols from './pages/Patrols';
import DriverShield from './pages/DriverShield';
import HomeGuard from './pages/HomeGuard';
import Vehicles from './pages/Vehicles';
import Sites from './pages/Sites';
import Contracts from './pages/Contracts';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import Register from './pages/Register';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import ForgotPassword from './pages/ForgotPassword';

const AuthenticatedApp = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading SecuriFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Onboarding" element={<Onboarding />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/" element={<Navigate to="/Dashboard" replace />} />
      {/* Protected routes */}
      <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/SOSCenter" element={<SOSCenter />} />
        <Route path="/LiveMap" element={<LiveMap />} />
        <Route path="/Incidents" element={<Incidents />} />
        <Route path="/Guards" element={<Guards />} />
        <Route path="/Patrols" element={<Patrols />} />
        <Route path="/DriverShield" element={<DriverShield />} />
        <Route path="/HomeGuard" element={<HomeGuard />} />
        <Route path="/Vehicles" element={<Vehicles />} />
        <Route path="/Sites" element={<Sites />} />
        <Route path="/Contracts" element={<Contracts />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/Reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
