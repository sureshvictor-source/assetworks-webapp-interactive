/**
 * IconButton - Standardized icon button component
 * Consistent icon button styles and behavior
 */

import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  variant = 'ghost',
  size = 'default',
  disabled = false,
  className,
  showLabel = false,
}: IconButtonProps) {
  const button = (
    <Button
      variant={variant}
      size={showLabel ? size : 'icon'}
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={label}
    >
      <Icon className={cn('w-4 h-4', showLabel && 'mr-2')} />
      {showLabel && <span>{label}</span>}
    </Button>
  );

  if (showLabel) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {button}
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

