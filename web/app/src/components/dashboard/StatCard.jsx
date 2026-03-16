import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function StatCard({ label, value, icon: Icon, trend, trendUp, color = 'primary', className }) {
  const colorMap = {
    primary: 'text-primary bg-primary/10',
    green: 'text-green-500 bg-green-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    orange: 'text-orange-500 bg-orange-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
  };

  return (
    <Card className={cn('p-5 bg-card border-border hover:border-primary/30 transition-all', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold mt-1.5">{value}</p>
          {trend && <p className={`text-xs mt-1 ${trendUp ? 'text-green-500' : 'text-red-400'}`}>{trendUp ? '↑' : '↓'} {trend}</p>}
        </div>
        {Icon && <div className={cn('p-2.5 rounded-xl', colorMap[color])}><Icon className="w-5 h-5" /></div>}
      </div>
    </Card>
  );
}
