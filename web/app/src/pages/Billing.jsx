import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import TopBar from '../components/layout/TopBar';
import StatCard from '../components/dashboard/StatCard';
import { CreditCard, TrendingUp, FileText, AlertCircle } from 'lucide-react';

export default function Billing() {
  const { data: contracts = [] } = useQuery({ queryKey: ['contracts'], queryFn: () => base44.entities.Contract.list(), initialData: [] });
  const activeContracts = contracts.filter((c) => c.status === 'active');
  const totalMRR = activeContracts.reduce((s, c) => s + (c.monthly_value || 0), 0);
  const totalOutstanding = contracts.reduce((s, c) => s + (c.outstanding_amount || 0), 0);

  return (
    <div>
      <TopBar title="Billing & Revenue" subtitle="Financial overview" />
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Monthly Revenue" value={`R${totalMRR.toLocaleString()}`} icon={CreditCard} color="green" />
          <StatCard label="Annual Projected" value={`R${(totalMRR * 12).toLocaleString()}`} icon={TrendingUp} color="blue" />
          <StatCard label="Active Contracts" value={activeContracts.length} icon={FileText} color="purple" />
          <StatCard label="Outstanding" value={`R${totalOutstanding.toLocaleString()}`} icon={AlertCircle} color="orange" />
        </div>
      </div>
    </div>
  );
}
