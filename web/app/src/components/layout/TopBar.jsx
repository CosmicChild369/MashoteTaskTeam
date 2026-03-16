import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

export default function TopBar({ title, subtitle, user }) {
  const { user: authUser } = useAuth();
  const displayUser = user || authUser;

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-xl sticky top-0 z-40">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 w-64 bg-secondary border-border h-9 text-sm" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
        </Button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
            <img src="https://media.base44.com/images/public/69b7ade42ef8fc14b8b984f8/5b6939590_moshate.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{displayUser?.full_name || 'Operator'}</p>
            <p className="text-[10px] text-muted-foreground">{displayUser?.role || 'No role assigned'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
