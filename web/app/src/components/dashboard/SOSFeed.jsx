import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Siren, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function SOSFeed({ alerts = [] }) {
  const activeAlerts = alerts.filter((a) => !['resolved', 'false_alarm', 'cancelled'].includes(a.status));

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2"><Siren className="w-4 h-4 text-primary" />Active SOS Alerts</CardTitle>
          <Link to="/SOSCenter"><Button variant="ghost" size="sm" className="text-xs text-muted-foreground">View All <ArrowRight className="w-3 h-3 ml-1" /></Button></Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {activeAlerts.length === 0 ? <p className="text-sm text-green-500 font-medium text-center py-6">All Clear</p> : activeAlerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-2"><Badge>{alert.source}</Badge><span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{moment(alert.created_date).fromNow()}</span></div>
            <p className="text-sm font-medium">{alert.source_name}</p>
            {alert.address && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {alert.address}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
