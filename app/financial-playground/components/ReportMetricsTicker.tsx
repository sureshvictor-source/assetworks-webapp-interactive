/**
 * ReportMetricsTicker - Real-time report generation metrics
 * Shows streaming metrics during report generation
 */

'use client';

import { Zap, Hash, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ReportMetricsTickerProps {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCost?: number;
  elapsedTime?: number;
  className?: string;
}

export function ReportMetricsTicker({
  inputTokens = 0,
  outputTokens = 0,
  totalTokens = 0,
  estimatedCost = 0,
  elapsedTime = 0,
  className,
}: ReportMetricsTickerProps) {
  const actualTotal = totalTokens || (inputTokens + outputTokens);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'border-b border-border bg-primary/5 px-4 py-2 flex items-center justify-between text-xs',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Total Tokens */}
        <div className="flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono font-medium">
            {actualTotal.toLocaleString()}
          </span>
          <span className="text-muted-foreground">tokens</span>
        </div>
        
        {/* Token Breakdown */}
        {(inputTokens > 0 || outputTokens > 0) && (
          <>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-green-600 font-mono">{inputTokens.toLocaleString()} in</span>
              <span>·</span>
              <span className="text-primary font-mono">{outputTokens.toLocaleString()} out</span>
            </div>
          </>
        )}
        
        {/* Estimated Cost */}
        {estimatedCost > 0 && (
          <>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-600" />
              <span className="font-mono font-medium text-green-600">
                ${estimatedCost.toFixed(4)}
              </span>
            </div>
          </>
        )}
        
        {/* Elapsed Time */}
        {elapsedTime > 0 && (
          <>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-mono text-muted-foreground">
                {elapsedTime.toFixed(1)}s
              </span>
            </div>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-muted-foreground">Generating...</span>
      </div>
    </motion.div>
  );
}

