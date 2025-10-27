/**
 * PageHeader - Reusable page header component
 * Consistent header layout across all pages
 */

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ 
  icon: Icon, 
  title, 
  subtitle, 
  actions, 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn(
      'h-16 bg-card border-b border-border flex items-center justify-between px-6',
      className
    )}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-6 h-6 text-primary" />}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <span className="text-sm text-muted-foreground">· {subtitle}</span>
          )}
        </div>
      </div>
      
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

