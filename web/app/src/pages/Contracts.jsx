import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import TopBar from '../components/layout/TopBar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Search } from 'lucide-react';

export default function Contracts() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ type: 'site_security', client_name: '', monthly_value: 0, billing_cycle: 'monthly' });
  const queryClient = useQueryClient();

  const { data: contracts = [] } = useQuery({ queryKey: ['contracts'], queryFn: () => base44.entities.Contract.list('-created_date', 200), initialData: [] });
  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Contract.create({ ...data, contract_number: `SF-${Date.now().toString(36).toUpperCase()}` }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contracts'] }); setShowCreate(false); },
  });

  const filtered = contracts.filter((c) => !search || c.client_name?.toLowerCase().includes(search.toLowerCase()) || c.contract_number?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TopBar title="Contracts" subtitle="Contract management" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search contracts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary" /></div>
          <Button onClick={() => setShowCreate(true)} className="bg-primary"><Plus className="w-4 h-4 mr-1" /> New Contract</Button>
        </div>
        <div className="space-y-3">
          {filtered.map((contract) => (
            <Card key={contract.id} className="bg-card border-border"><CardContent className="p-4 flex items-center gap-4"><FileText className="w-5 h-5 text-primary" /><div className="flex-1"><h3 className="font-semibold">{contract.client_name}</h3><p className="text-xs text-muted-foreground">{contract.contract_number}</p></div><Badge>{contract.status}</Badge></CardContent></Card>
          ))}
        </div>
      </div>
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent><DialogHeader><DialogTitle>New Contract</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Service Type</Label><Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="site_security">Site Security</SelectItem><SelectItem value="driver_shield">DriverShield</SelectItem><SelectItem value="home_guard">HomeGuard</SelectItem></SelectContent></Select></div>
            <div><Label>Billing Cycle</Label><Select value={form.billing_cycle} onValueChange={(v) => setForm({ ...form, billing_cycle: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['monthly','quarterly','annual'].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div>
            <div className="col-span-2"><Label>Client Name</Label><Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button><Button className="bg-primary" onClick={() => createMutation.mutate(form)} disabled={!form.client_name}>Create Contract</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
