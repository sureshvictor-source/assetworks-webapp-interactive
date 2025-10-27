/**
 * ContextProgressBar - Token usage progress indicator
 * Shows context window usage with visual feedback
 */

'use client';

import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextProgressBarProps {
  currentTokens: number;
  maxTokens?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ContextProgressBar({
  currentTokens,
  maxTokens = 200000, // Claude's context window
  size = 'md',
  showLabel = true,
  onClick,
  className,
}: ContextProgressBarProps) {
  const percentage = Math.min((currentTokens / maxTokens) * 100, 100);
  const isWarning = percentage > 70;
  const isCritical = percentage > 90;
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div 
      className={cn('flex items-center gap-2', onClick && 'cursor-pointer', className)}
      onClick={onClick}
      title={`${currentTokens.toLocaleString()} / ${maxTokens.toLocaleString()} tokens used`}
    >
      {showLabel && (
        <div className="flex items-center gap-1 min-w-[100px]">
          {isCritical && (
            <AlertCircle className="w-3 h-3 text-destructive" />
          )}
          <span className={cn(
            'text-xs font-mono',
            isCritical ? 'text-destructive' : isWarning ? 'text-yellow-600' : 'text-muted-foreground'
          )}>
            {currentTokens.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground/50">/</span>
          <span className="text-xs text-muted-foreground/70">
            {(maxTokens / 1000).toFixed(0)}K
          </span>
        </div>
      )}
      
      <Progress 
        value={percentage} 
        className={cn('flex-1', sizeClasses[size])}
        indicatorClassName={cn(
          isCritical && 'bg-destructive',
          isWarning && !isCritical && 'bg-yellow-500'
        )}
      />
      
      {showLabel && (
        <span className={cn(
          'text-xs font-mono min-w-[45px] text-right',
          isCritical ? 'text-destructive' : isWarning ? 'text-yellow-600' : 'text-muted-foreground'
        )}>
          {percentage.toFixed(1)}%
        </span>
      )}
    </div>
  );
}

