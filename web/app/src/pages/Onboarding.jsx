import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const urlParams = new URLSearchParams(window.location.search);
const urlRole = urlParams.get('role');

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-extrabold mb-2">Welcome</h1>
        <p className="text-sm text-muted-foreground mb-6">Role: {urlRole || 'Not set'}</p>
        <Button className="w-full" onClick={() => (window.location.href = '/Dashboard')}>Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" /></Button>
      </div>
    </div>
  );
}
