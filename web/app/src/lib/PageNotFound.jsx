import React from 'react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <p className="text-sm text-muted-foreground mt-2">Page Not Found</p>
      </div>
    </div>
  );
}
