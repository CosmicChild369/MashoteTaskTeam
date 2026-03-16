import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, AlertTriangle, Users, Car, Home, MapPin, FileText, CreditCard, Radio, ChevronLeft, ChevronRight, Siren, ClipboardList, Truck, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/Dashboard' },
  { label: 'SOS Center', icon: Siren, path: '/SOSCenter', badge: true },
  { label: 'Live Map', icon: MapPin, path: '/LiveMap' },
  { label: 'Incidents', icon: AlertTriangle, path: '/Incidents' },
  { label: 'Guards', icon: Users, path: '/Guards' },
  { label: 'Patrols', icon: ClipboardList, path: '/Patrols' },
  { label: 'DriverShield', icon: Car, path: '/DriverShield' },
  { label: 'HomeGuard', icon: Home, path: '/HomeGuard' },
  { label: 'Vehicles', icon: Truck, path: '/Vehicles' },
  { label: 'Sites', icon: MapPin, path: '/Sites' },
  { label: 'Contracts', icon: FileText, path: '/Contracts' },
  { label: 'Billing', icon: CreditCard, path: '/Billing' },
  { label: 'Reports', icon: Radio, path: '/Reports' },
];

export default function Sidebar({ activeSOS = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <img src="https://media.base44.com/images/public/69b7ade42ef8fc14b8b984f8/5b6939590_moshate.jpg" alt="Moshate Logo" className="w-9 h-9 rounded-full object-cover" />
        {!collapsed && <h1 className="text-sm font-bold text-sidebar-foreground ml-2">Moshate TaskTeam</h1>}
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 ${isActive ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent'}`}>
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && activeSOS > 0 && <Badge className="bg-primary text-primary-foreground px-1.5 py-0 text-[10px]">{activeSOS}</Badge>}
                </>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent w-full">
          {collapsed ? <ChevronRight className="w-[18px] h-[18px]" /> : <ChevronLeft className="w-[18px] h-[18px]" />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 w-full">
          <LogOut className="w-[18px] h-[18px]" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
