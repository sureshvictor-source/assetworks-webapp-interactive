/**
 * ErrorState - Reusable error state component
 * Consistent error handling UI across the application
 */

import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
  variant?: 'inline' | 'fullscreen';
}

export function ErrorState({ 
  title = 'Something went wrong',
  message, 
  onRetry,
  className,
  variant = 'inline',
}: ErrorStateProps) {
  if (variant === 'inline') {
    return (
      <Alert variant="destructive" className={cn('my-4', className)}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <div>
              {title && <p className="font-medium mb-1">{title}</p>}
              <p className="text-sm">{message}</p>
            </div>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="ml-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center p-8 min-h-[400px]',
      className
    )}>
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

