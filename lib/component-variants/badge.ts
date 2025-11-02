/**
 * Badge Component Variants
 *
 * Centralized badge styling using class-variance-authority (cva).
 * Provides consistent badge variants across all AssetWorks products.
 *
 * @module component-variants/badge
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Badge variant definitions
 */
export const badgeVariants = cva(
  // Base styles
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      /**
       * Badge visual styles
       */
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success:
          'border-transparent bg-success text-success-foreground hover:bg-success/80',
        warning:
          'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
        info:
          'border-transparent bg-info text-info-foreground hover:bg-info/80',
        idle:
          'border-transparent bg-idle text-idle-foreground hover:bg-idle/80',
        outline: 'text-foreground border-border bg-background',
        ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
      },

      /**
       * Badge sizes
       */
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },

      /**
       * Badge shape
       */
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-md',
      },

      /**
       * With dot indicator
       */
      withDot: {
        true: 'pl-1.5',
        false: '',
      },

      /**
       * With icon
       */
      withIcon: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'rounded',
      withDot: false,
      withIcon: false,
    },
  }
);

/**
 * TypeScript type for badge variant props
 */
export type BadgeVariants = VariantProps<typeof badgeVariants>;

/**
 * Badge dot indicator styles
 */
export const badgeDotVariants = cva(
  'inline-block h-2 w-2 rounded-full mr-1.5',
  {
    variants: {
      variant: {
        default: 'bg-primary-foreground',
        secondary: 'bg-secondary-foreground',
        destructive: 'bg-destructive-foreground',
        success: 'bg-success-foreground',
        warning: 'bg-warning-foreground',
        info: 'bg-info-foreground',
        idle: 'bg-idle-foreground',
        outline: 'bg-foreground',
        ghost: 'bg-foreground',
      },
      animate: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animate: false,
    },
  }
);

/**
 * Badge icon styles
 */
export const badgeIconVariants = cva('', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      default: 'h-3 w-3',
      lg: 'h-4 w-4',
    },
    position: {
      left: 'mr-1',
      right: 'ml-1',
    },
  },
  defaultVariants: {
    size: 'default',
    position: 'left',
  },
});

/**
 * Status-specific badge presets
 */
export const statusBadgePresets = {
  active: { variant: 'success' as const, children: 'Active' },
  inactive: { variant: 'idle' as const, children: 'Inactive' },
  pending: { variant: 'warning' as const, children: 'Pending' },
  error: { variant: 'destructive' as const, children: 'Error' },
  success: { variant: 'success' as const, children: 'Success' },
  processing: { variant: 'info' as const, children: 'Processing', withDot: true },
  cancelled: { variant: 'idle' as const, children: 'Cancelled' },
  draft: { variant: 'outline' as const, children: 'Draft' },
} as const;

/**
 * Usage Examples:
 *
 * ```tsx
 * import { badgeVariants, badgeDotVariants, statusBadgePresets } from '@/lib/component-variants/badge';
 *
 * // Basic badge
 * <span className={badgeVariants()}>Default</span>
 *
 * // Success badge
 * <span className={badgeVariants({ variant: 'success' })}>Success</span>
 *
 * // Badge with dot
 * <span className={badgeVariants({ variant: 'info', withDot: true })}>
 *   <span className={badgeDotVariants({ variant: 'info', animate: true })} />
 *   Processing
 * </span>
 *
 * // Large badge with icon
 * <span className={badgeVariants({ size: 'lg', withIcon: true })}>
 *   <Check className="h-4 w-4 mr-1" />
 *   Verified
 * </span>
 *
 * // Status badge using preset
 * <span className={badgeVariants(statusBadgePresets.active)}>
 *   {statusBadgePresets.active.children}
 * </span>
 * ```
 */
