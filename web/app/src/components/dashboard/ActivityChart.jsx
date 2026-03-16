import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { hour: '00:00', incidents: 2, patrols: 8, sos: 0 },
  { hour: '04:00', incidents: 3, patrols: 4, sos: 0 },
  { hour: '08:00', incidents: 8, patrols: 18, sos: 1 },
  { hour: '12:00', incidents: 10, patrols: 20, sos: 3 },
  { hour: '16:00', incidents: 12, patrols: 16, sos: 2 },
  { hour: '20:00', incidents: 9, patrols: 10, sos: 2 },
];

export default function ActivityChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">24h Activity Overview</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 16%)" />
            <XAxis dataKey="hour" stroke="hsl(220, 10%, 35%)" tick={{ fontSize: 10 }} />
            <YAxis stroke="hsl(220, 10%, 35%)" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Area type="monotone" dataKey="patrols" stroke="hsl(200, 80%, 55%)" fill="hsl(200, 80%, 55%, 0.2)" name="Patrols" strokeWidth={2} />
            <Area type="monotone" dataKey="incidents" stroke="hsl(0, 85%, 55%)" fill="hsl(0, 85%, 55%, 0.2)" name="Incidents" strokeWidth={2} />
            <Area type="monotone" dataKey="sos" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%, 0.2)" name="SOS" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
