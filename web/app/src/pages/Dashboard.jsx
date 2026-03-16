import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import TopBar from '../components/layout/TopBar';
import StatCard from '../components/dashboard/StatCard';
import SOSFeed from '../components/dashboard/SOSFeed';
import ActivityChart from '../components/dashboard/ActivityChart';
import ServiceBreakdown from '../components/dashboard/ServiceBreakdown';
import RecentIncidents from '../components/dashboard/RecentIncidents';
import { Users, Car, Home, AlertTriangle, Siren } from 'lucide-react';

export default function Dashboard() {
  const { data: guards = [] } = useQuery({ queryKey: ['guards'], queryFn: () => base44.entities.Guard.list(), initialData: [] });
  const { data: drivers = [] } = useQuery({ queryKey: ['drivers'], queryFn: () => base44.entities.Driver.list(), initialData: [] });
  const { data: homes = [] } = useQuery({ queryKey: ['homes'], queryFn: () => base44.entities.Home.list(), initialData: [] });
  const { data: sosAlerts = [] } = useQuery({ queryKey: ['sos-alerts'], queryFn: () => base44.entities.SOSAlert.list('-created_date', 50), initialData: [] });
  const { data: incidents = [] } = useQuery({ queryKey: ['incidents'], queryFn: () => base44.entities.Incident.list('-created_date', 20), initialData: [] });

  const activeGuards = guards.filter((g) => g.is_clocked_in).length;
  const activeDrivers = drivers.filter((d) => d.status === 'active' || d.status === 'on_ride').length;
  const armedHomes = homes.filter((h) => h.status === 'armed').length;
  const activeSOS = sosAlerts.filter((s) => s.status === 'active' || s.status === 'dispatched').length;

  return (
    <div>
      <TopBar title="Moshate Command Center" subtitle={`${new Date().toLocaleDateString('en-ZA')} · Pretoria, South Africa`} />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Active Guards" value={activeGuards} icon={Users} color="blue" />
          <StatCard label="Active Drivers" value={activeDrivers} icon={Car} color="purple" />
          <StatCard label="Armed Homes" value={armedHomes} icon={Home} color="orange" />
          <StatCard label="Active SOS" value={activeSOS} icon={Siren} color="primary" />
          <StatCard label="Open Incidents" value={incidents.filter((i) => i.status !== 'closed' && i.status !== 'resolved').length} icon={AlertTriangle} color="orange" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6"><ActivityChart /><RecentIncidents incidents={incidents} /></div>
          <div className="space-y-6"><SOSFeed alerts={sosAlerts} /><ServiceBreakdown guards={activeGuards} drivers={activeDrivers} homes={armedHomes} /></div>
        </div>
      </div>
    </div>
  );
}
