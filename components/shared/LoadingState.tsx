/**
 * LoadingState - Reusable loading component
 * Industry standard loading states with spinner and skeleton support
 */

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  variant?: 'spinner' | 'skeleton' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export function LoadingState({ 
  message = 'Loading...', 
  variant = 'spinner',
  size = 'md',
  className,
  fullScreen = false,
}: LoadingStateProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  const containerClass = cn(
    'flex flex-col items-center justify-center',
    fullScreen ? 'h-screen' : 'min-h-[200px]',
    className
  );
  
  if (variant === 'spinner') {
    return (
      <div className={containerClass}>
        <Loader2 className={cn(sizes[size], 'animate-spin text-primary')} />
        {message && (
          <p className="mt-4 text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    );
  }
  
  if (variant === 'skeleton') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
      </div>
    );
  }
  
  if (variant === 'pulse') {
    return (
      <div className={containerClass}>
        <div className={cn(
          sizes[size],
          'bg-primary rounded-full animate-pulse'
        )} />
        {message && (
          <p className="mt-4 text-sm text-muted-foreground animate-pulse">{message}</p>
        )}
      </div>
    );
  }
  
  return null;
}

// Skeleton component for individual elements
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-muted rounded animate-pulse', className)} />
  );
}

