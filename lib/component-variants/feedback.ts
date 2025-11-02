/**
 * AssetWorks Component Variants - Feedback
 *
 * Type-safe feedback component variants (alert, toast, notification, progress, spinner, skeleton, empty-state).
 * Provides comprehensive feedback styling for all patterns.
 *
 * @module component-variants/feedback
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// ALERT VARIANTS
// ============================================================================

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        success: 'border-success/50 bg-success/10 text-success',
        warning: 'border-warning/50 bg-warning/10 text-warning',
        error: 'border-error/50 bg-error/10 text-error',
        info: 'border-info/50 bg-info/10 text-info',
      },
      size: {
        sm: 'p-3 text-sm',
        default: 'p-4',
        lg: 'p-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;

export const alertTitleVariants = cva(
  'mb-1 font-medium leading-none tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type AlertTitleVariants = VariantProps<typeof alertTitleVariants>;

export const alertDescriptionVariants = cva(
  'text-sm [&_p]:leading-relaxed',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type AlertDescriptionVariants = VariantProps<typeof alertDescriptionVariants>;

// ============================================================================
// TOAST VARIANTS
// ============================================================================

export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'border-success bg-success text-success-foreground',
        warning: 'border-warning bg-warning text-warning-foreground',
        error: 'destructive group border-error bg-error text-error-foreground',
        info: 'border-info bg-info text-info-foreground',
      },
      size: {
        sm: 'p-3 text-sm',
        default: 'p-6',
        lg: 'p-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ToastVariants = VariantProps<typeof toastVariants>;

export const toastActionVariants = cva(
  'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive'
);

export type ToastActionVariants = VariantProps<typeof toastActionVariants>;

// ============================================================================
// PROGRESS VARIANTS
// ============================================================================

export const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1',
        default: 'h-2',
        md: 'h-3',
        lg: 'h-4',
      },
      variant: {
        default: 'bg-secondary',
        success: 'bg-success/20',
        warning: 'bg-warning/20',
        error: 'bg-error/20',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export type ProgressVariants = VariantProps<typeof progressVariants>;

export const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
        info: 'bg-info',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
    },
  }
);

export type ProgressIndicatorVariants = VariantProps<typeof progressIndicatorVariants>;

// ============================================================================
// SPINNER VARIANTS
// ============================================================================

export const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12',
      },
      variant: {
        default: 'text-primary',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
        muted: 'text-muted-foreground',
      },
      thickness: {
        thin: 'border-2',
        default: 'border-2',
        thick: 'border-4',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      thickness: 'default',
    },
  }
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;

// ============================================================================
// SKELETON VARIANTS
// ============================================================================

export const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        text: 'h-4 w-full bg-muted',
        circular: 'rounded-full bg-muted',
        rectangular: 'rounded-md bg-muted',
      },
      size: {
        sm: 'h-3',
        default: 'h-4',
        md: 'h-6',
        lg: 'h-8',
        xl: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;

// ============================================================================
// EMPTY STATE VARIANTS
// ============================================================================

export const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      size: {
        sm: 'py-8 gap-2',
        default: 'py-12 gap-4',
        lg: 'py-16 gap-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type EmptyStateVariants = VariantProps<typeof emptyStateVariants>;

export const emptyStateIconVariants = cva(
  'mb-4 text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-12 w-12',
        lg: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type EmptyStateIconVariants = VariantProps<typeof emptyStateIconVariants>;

export const emptyStateTitleVariants = cva(
  'font-semibold',
  {
    variants: {
      size: {
        sm: 'text-base',
        default: 'text-lg',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type EmptyStateTitleVariants = VariantProps<typeof emptyStateTitleVariants>;

export const emptyStateDescriptionVariants = cva(
  'text-sm text-muted-foreground max-w-sm',
  {
    variants: {
      size: {
        sm: 'text-xs max-w-xs',
        default: 'text-sm max-w-sm',
        lg: 'text-base max-w-md',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type EmptyStateDescriptionVariants = VariantProps<typeof emptyStateDescriptionVariants>;

// ============================================================================
// NOTIFICATION BADGE VARIANTS
// ============================================================================

export const notificationBadgeVariants = cva(
  'absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        error: 'bg-error text-error-foreground',
        info: 'bg-info text-info-foreground',
      },
      size: {
        sm: 'h-4 w-4 text-[10px]',
        default: 'h-5 w-5 text-xs',
        lg: 'h-6 w-6 text-sm',
      },
      dot: {
        true: 'h-2 w-2 p-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      dot: false,
    },
  }
);

export type NotificationBadgeVariants = VariantProps<typeof notificationBadgeVariants>;

// ============================================================================
// FEEDBACK PRESETS
// ============================================================================

export const feedbackPresets = {
  alert: {
    success: { variant: 'success' as const, size: 'default' as const },
    warning: { variant: 'warning' as const, size: 'default' as const },
    error: { variant: 'error' as const, size: 'default' as const },
    info: { variant: 'info' as const, size: 'default' as const },
  },
  toast: {
    success: { variant: 'success' as const, size: 'default' as const },
    error: { variant: 'error' as const, size: 'default' as const },
  },
  progress: {
    default: { variant: 'default' as const, size: 'default' as const },
    success: { variant: 'success' as const, size: 'default' as const },
  },
  spinner: {
    small: { size: 'sm' as const, variant: 'default' as const },
    default: { size: 'default' as const, variant: 'default' as const },
    large: { size: 'lg' as const, variant: 'default' as const },
  },
};
