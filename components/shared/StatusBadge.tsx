/**
 * StatusBadge - Standardized status indicator
 * Consistent status display across the application
 */

import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'success' | 'pending' | 'warning' | 'error' | 'loading' | 'idle';

interface StatusBadgeProps {
  status: Status;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    label: 'Success',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  warning: {
    icon: AlertCircle,
    label: 'Warning',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  error: {
    icon: XCircle,
    label: 'Error',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  loading: {
    icon: Loader2,
    label: 'Loading',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  idle: {
    icon: Clock,
    label: 'Idle',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

export function StatusBadge({ 
  status, 
  label, 
  showIcon = true,
  className 
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const displayLabel = label || config.label;

  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {showIcon && (
        <Icon className={cn(
          'w-3 h-3 mr-1',
          status === 'loading' && 'animate-spin'
        )} />
      )}
      {displayLabel}
    </Badge>
  );
}

