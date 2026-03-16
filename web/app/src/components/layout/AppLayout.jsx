import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function AppLayout() {
  const { data: sosAlerts = [] } = useQuery({
    queryKey: ['active-sos'],
    queryFn: () => base44.entities.SOSAlert.filter({ status: 'active' }),
    refetchInterval: 5000,
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSOS={sosAlerts.length} />
      <main className="ml-60 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
