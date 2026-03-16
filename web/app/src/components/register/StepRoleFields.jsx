import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StepRoleFields({ role, form, setForm }) {
  if (role === 'guard') return <div className="space-y-4"><div><Label className="text-xs text-muted-foreground">PSIRA / Guard License Number</Label><Input value={form.license_number || ''} onChange={(e) => setForm({ ...form, license_number: e.target.value })} className="mt-1 bg-secondary h-11" /></div></div>;
  if (role === 'driver') return <div className="space-y-4"><div><Label className="text-xs text-muted-foreground">Platform</Label><Select value={form.platform || ''} onValueChange={(v) => setForm({ ...form, platform: v })}><SelectTrigger className="mt-1 bg-secondary h-11"><SelectValue placeholder="Select platform" /></SelectTrigger><SelectContent>{['uber','bolt','indrive','multiple'].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select></div></div>;
  if (role === 'homeowner') return <div className="space-y-4"><div><Label className="text-xs text-muted-foreground">Home Address</Label><Input value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1 bg-secondary h-11" /></div></div>;
  if (role === 'client') return <div className="space-y-4"><div><Label className="text-xs text-muted-foreground">Company Name</Label><Input value={form.company_name || ''} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="mt-1 bg-secondary h-11" /></div></div>;
  if (role === 'supervisor' || role === 'admin') return <div className="space-y-4"><div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"><p className="text-sm text-yellow-400 font-medium">Invitation Required</p></div><div><Label className="text-xs text-muted-foreground">Invitation Code</Label><Input value={form.invite_code || ''} onChange={(e) => setForm({ ...form, invite_code: e.target.value })} className="mt-1 bg-secondary h-11" /></div></div>;
  return null;
}
