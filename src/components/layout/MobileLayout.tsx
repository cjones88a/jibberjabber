import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function MobileLayout({ 
  children, 
  className,
  fullWidth = false 
}: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        'min-h-screen flex flex-col',
        !fullWidth && 'max-w-md mx-auto',
        className
      )}>
        {children}
      </main>
    </div>
  );
} 