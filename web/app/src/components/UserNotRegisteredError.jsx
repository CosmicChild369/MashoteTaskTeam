import React from 'react';
import { Button } from '@/components/ui/button';

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">User Not Registered</h1>
        <p className="text-sm text-muted-foreground">Your account is authenticated but not registered for this app.</p>
        <Button onClick={() => (window.location.href = '/Register')}>Go to Registration</Button>
      </div>
    </div>
  );
}
