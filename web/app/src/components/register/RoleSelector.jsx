import React from 'react';
import { Users, Car, Home, Building2, Shield, Radio } from 'lucide-react';

export const ROLE_OPTIONS = [
  { id: 'guard', label: 'Site Guard', afLabel: 'Terreinwag', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', activeBg: 'bg-blue-500/20 border-blue-500', desc: 'Patrol sites, log incidents & welfare checks' },
  { id: 'driver', label: 'E-hailing Driver', afLabel: 'E-haal Bestuurder', icon: Car, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30', activeBg: 'bg-purple-500/20 border-purple-500', desc: 'DriverShield protection for Uber / Bolt / inDrive' },
  { id: 'homeowner', label: 'Homeowner', afLabel: 'Huiseienaar', icon: Home, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', activeBg: 'bg-orange-500/20 border-orange-500', desc: 'HomeGuard armed response & panic button' },
  { id: 'client', label: 'Business Client', afLabel: 'Sake Kliënt', icon: Building2, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30', activeBg: 'bg-green-500/20 border-green-500', desc: 'Manage your contracted security sites' },
  { id: 'supervisor', label: 'Supervisor / Dispatcher', afLabel: 'Toesighouer', icon: Radio, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', activeBg: 'bg-yellow-500/20 border-yellow-500', desc: 'Invitation code required', restricted: true },
  { id: 'admin', label: 'Administrator', afLabel: 'Administrateur', icon: Users, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', activeBg: 'bg-red-500/20 border-red-500', desc: 'Invitation code required', restricted: true },
];

export default function RoleSelector({ selected, onSelect, lang = 'en' }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ROLE_OPTIONS.map((role) => {
        const Icon = role.icon;
        const isSelected = selected === role.id;
        return (
          <button key={role.id} onClick={() => onSelect(role.id)} className={`relative text-left p-4 rounded-xl border-2 transition-all ${isSelected ? role.activeBg : role.bg}`}>
            {role.restricted && <span className="absolute top-2 right-2 text-[9px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">Invite only</span>}
            <Icon className={`w-7 h-7 mb-2 ${role.color}`} />
            <p className="text-sm font-semibold text-foreground">{lang === 'af' ? role.afLabel : role.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{role.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
