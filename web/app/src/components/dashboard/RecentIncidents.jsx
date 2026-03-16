import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const severityColors = { low: 'bg-green-500/15 text-green-400', medium: 'bg-orange-500/15 text-orange-400', high: 'bg-red-500/15 text-red-400', critical: 'bg-red-600/20 text-red-300' };

export default function RecentIncidents({ incidents = [] }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500" />Recent Incidents</CardTitle>
          <Link to="/Incidents"><Button variant="ghost" size="sm" className="text-xs text-muted-foreground">View All <ArrowRight className="w-3 h-3 ml-1" /></Button></Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {incidents.length === 0 ? <p className="text-sm text-muted-foreground text-center py-6">No recent incidents</p> : incidents.slice(0, 5).map((inc) => (
          <div key={inc.id} className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-1.5"><Badge className={severityColors[inc.severity]}>{inc.severity}</Badge></div>
            <p className="text-sm font-medium">{inc.title}</p>
            <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{moment(inc.created_date).fromNow()}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
