/**
 * AssetWorks Component Variants - Select
 *
 * Type-safe select component variants using class-variance-authority (CVA).
 * Provides comprehensive select/dropdown styling for all states.
 *
 * @module component-variants/select
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// SELECT VARIANTS
// ============================================================================

export const selectVariants = cva(
  // Base styles
  'flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-colors [&>span]:line-clamp-1',
  {
    variants: {
      /**
       * Visual variant
       */
      variant: {
        default: 'border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        outline: 'border-border focus:border-primary focus:ring-1 focus:ring-primary',
        filled: 'border-transparent bg-muted focus:bg-background focus:border-primary',
        ghost: 'border-transparent focus:border-primary',
      },

      /**
       * Size variant
       */
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        default: 'h-10 px-3 py-2',
        md: 'h-11 px-4 py-2',
        lg: 'h-12 px-4 py-3',
        xl: 'h-14 px-6 py-4 text-base',
      },

      /**
       * State variant
       */
      state: {
        default: '',
        error: 'border-error focus:ring-error',
        success: 'border-success focus:ring-success',
        warning: 'border-warning focus:ring-warning',
      },

      /**
       * Has icon (padding adjustment)
       */
      hasIcon: {
        left: 'pl-10',
        none: '',
      },

      /**
       * Full width
       */
      fullWidth: {
        true: 'w-full',
        false: '',
      },

      /**
       * Rounded variant
       */
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
      hasIcon: 'none',
      fullWidth: true,
      rounded: 'default',
    },
  }
);

export type SelectVariants = VariantProps<typeof selectVariants>;

// ============================================================================
// SELECT TRIGGER ICON (chevron)
// ============================================================================

export const selectTriggerIconVariants = cva(
  'ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform',
  {
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-0',
      },
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
        xl: 'h-5 w-5',
      },
    },
    defaultVariants: {
      open: false,
      size: 'default',
    },
  }
);

export type SelectTriggerIconVariants = VariantProps<typeof selectTriggerIconVariants>;

// ============================================================================
// SELECT CONTENT (dropdown menu)
// ============================================================================

export const selectContentVariants = cva(
  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      position: {
        popper: 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        item: '',
      },
      width: {
        trigger: 'w-full',
        content: 'min-w-[8rem]',
        auto: 'w-auto',
      },
    },
    defaultVariants: {
      position: 'popper',
      width: 'trigger',
    },
  }
);

export type SelectContentVariants = VariantProps<typeof selectContentVariants>;

// ============================================================================
// SELECT ITEM
// ============================================================================

export const selectItemVariants = cva(
  'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus:bg-accent focus:text-accent-foreground',
        highlight: 'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      },
      size: {
        sm: 'py-1 pl-6 pr-2 text-xs',
        default: 'py-1.5 pl-8 pr-2',
        lg: 'py-2 pl-10 pr-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type SelectItemVariants = VariantProps<typeof selectItemVariants>;

// ============================================================================
// SELECT ITEM INDICATOR (checkmark)
// ============================================================================

export const selectItemIndicatorVariants = cva(
  'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
  {
    variants: {
      size: {
        sm: 'left-1.5 h-3 w-3',
        default: 'left-2 h-3.5 w-3.5',
        lg: 'left-3 h-4 w-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type SelectItemIndicatorVariants = VariantProps<typeof selectItemIndicatorVariants>;

// ============================================================================
// SELECT GROUP
// ============================================================================

export const selectGroupVariants = cva(
  'overflow-hidden p-1 text-foreground'
);

export type SelectGroupVariants = VariantProps<typeof selectGroupVariants>;

// ============================================================================
// SELECT LABEL
// ============================================================================

export const selectLabelVariants = cva(
  'py-1.5 pl-8 pr-2 text-sm font-semibold',
  {
    variants: {
      size: {
        sm: 'py-1 pl-6 pr-2 text-xs',
        default: 'py-1.5 pl-8 pr-2',
        lg: 'py-2 pl-10 pr-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type SelectLabelVariants = VariantProps<typeof selectLabelVariants>;

// ============================================================================
// SELECT SEPARATOR
// ============================================================================

export const selectSeparatorVariants = cva(
  '-mx-1 my-1 h-px bg-muted'
);

export type SelectSeparatorVariants = VariantProps<typeof selectSeparatorVariants>;

// ============================================================================
// SELECT PRESETS
// ============================================================================

/**
 * Pre-configured select combinations for common use cases
 */
export const selectPresets = {
  // Standard dropdown
  default: {
    variant: 'default' as const,
    size: 'default' as const,
  },

  // Small dropdown for compact layouts
  compact: {
    variant: 'filled' as const,
    size: 'sm' as const,
  },

  // Large prominent dropdown
  prominent: {
    variant: 'outline' as const,
    size: 'lg' as const,
  },

  // Minimal/ghost dropdown
  minimal: {
    variant: 'ghost' as const,
    size: 'default' as const,
  },

  // Multi-select
  multi: {
    variant: 'default' as const,
    size: 'default' as const,
  },
};

export type SelectPreset = keyof typeof selectPresets;
