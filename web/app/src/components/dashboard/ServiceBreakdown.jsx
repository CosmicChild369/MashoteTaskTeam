import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ServiceBreakdown({ guards = 0, drivers = 0, homes = 0 }) {
  const data = [
    { name: 'Site Security', value: guards || 12, color: 'hsl(200, 80%, 55%)' },
    { name: 'DriverShield', value: drivers || 8, color: 'hsl(270, 60%, 55%)' },
    { name: 'HomeGuard', value: homes || 24, color: 'hsl(38, 92%, 50%)' },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Service Lines</CardTitle></CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={120} height={120}>
            <PieChart><Pie data={data} innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>{data.map((entry, i) => <Cell key={i} fill={entry.color} />)}</Pie></PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 flex-1">
            {data.map((item, i) => <div key={i} className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{item.name}</span><span className="text-sm font-semibold">{item.value}</span></div>)}
            <div className="pt-2 border-t border-border flex justify-between"><span className="text-xs text-muted-foreground">Total Active</span><span className="text-sm font-bold text-primary">{total}</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
