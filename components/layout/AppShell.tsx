/**
 * AppShell - Main application container
 * Provides consistent layout structure across all pages
 */

import { cn } from '@/lib/utils';

interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ header, sidebar, children, className }: AppShellProps) {
  return (
    <div className={cn('h-screen flex flex-col bg-background', className)}>
      {header}
      <div className="flex-1 flex overflow-hidden">
        {sidebar}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

