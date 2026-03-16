import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export default function StepPersonalDetails({ form, setForm }) {
  const [showPass, setShowPass] = React.useState(false);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2"><Label className="text-xs text-muted-foreground">Full Name</Label><Input value={form.full_name || ''} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1 bg-secondary border-border h-11" /></div>
        <div className="col-span-2"><Label className="text-xs text-muted-foreground">Phone (+27)</Label><Input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 bg-secondary border-border h-11" /></div>
        <div className="col-span-2"><Label className="text-xs text-muted-foreground">Email</Label><Input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 bg-secondary border-border h-11" /></div>
        <div className="col-span-2">
          <Label className="text-xs text-muted-foreground">Password</Label>
          <div className="relative mt-1">
            <Input type={showPass ? 'text' : 'password'} value={form.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} className="bg-secondary border-border h-11 pr-10" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
