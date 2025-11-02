/**
 * AssetWorks Component Variants - Radio
 *
 * Type-safe radio button component variants using class-variance-authority (CVA).
 * Provides comprehensive radio button styling for all states.
 *
 * @module component-variants/radio
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// RADIO VARIANTS
// ============================================================================

export const radioVariants = cva(
  // Base styles
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      /**
       * Size variant
       */
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-7 w-7',
      },

      /**
       * Variant (visual style)
       */
      variant: {
        default: 'border-primary',
        outline: 'border-input data-[state=checked]:border-primary',
        filled: 'border-transparent bg-muted data-[state=checked]:bg-primary',
      },

      /**
       * Color variant (for checked state)
       */
      color: {
        primary: '[&>span]:bg-primary',
        success: '[&>span]:bg-success',
        warning: '[&>span]:bg-warning',
        error: '[&>span]:bg-error',
        info: '[&>span]:bg-info',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      color: 'primary',
    },
  }
);

export type RadioVariants = VariantProps<typeof radioVariants>;

// ============================================================================
// RADIO INDICATOR (inner circle)
// ============================================================================

export const radioIndicatorVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      size: {
        sm: '[&>span]:h-2 [&>span]:w-2',
        default: '[&>span]:h-2.5 [&>span]:w-2.5',
        lg: '[&>span]:h-3 [&>span]:w-3',
        xl: '[&>span]:h-3.5 [&>span]:w-3.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type RadioIndicatorVariants = VariantProps<typeof radioIndicatorVariants>;

// ============================================================================
// RADIO LABEL
// ============================================================================

export const radioLabelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
      state: {
        default: 'text-foreground',
        error: 'text-error',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  }
);

export type RadioLabelVariants = VariantProps<typeof radioLabelVariants>;

// ============================================================================
// RADIO GROUP CONTAINER
// ============================================================================

export const radioGroupVariants = cva(
  'flex flex-col gap-3',
  {
    variants: {
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row flex-wrap',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-2',
        default: 'gap-3',
        lg: 'gap-4',
        xl: 'gap-6',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
      gap: 'default',
    },
  }
);

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;

// ============================================================================
// RADIO ITEM CONTAINER (radio + label)
// ============================================================================

export const radioItemVariants = cva(
  'flex items-center gap-2',
  {
    variants: {
      gap: {
        none: 'gap-0',
        sm: 'gap-1.5',
        default: 'gap-2',
        lg: 'gap-3',
      },
    },
    defaultVariants: {
      gap: 'default',
    },
  }
);

export type RadioItemVariants = VariantProps<typeof radioItemVariants>;

// ============================================================================
// RADIO CARD (radio with surrounding card)
// ============================================================================

export const radioCardVariants = cva(
  'flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent/50',
  {
    variants: {
      selected: {
        true: 'border-primary bg-accent',
        false: 'border-border',
      },
      size: {
        sm: 'p-3 gap-2',
        default: 'p-4 gap-3',
        lg: 'p-6 gap-4',
      },
    },
    defaultVariants: {
      selected: false,
      size: 'default',
    },
  }
);

export type RadioCardVariants = VariantProps<typeof radioCardVariants>;

// ============================================================================
// RADIO PRESETS
// ============================================================================

/**
 * Pre-configured radio combinations for common use cases
 */
export const radioPresets = {
  // Standard radio
  default: {
    size: 'default' as const,
    variant: 'default' as const,
    color: 'primary' as const,
  },

  // Small radio for compact layouts
  compact: {
    size: 'sm' as const,
    variant: 'outline' as const,
    color: 'primary' as const,
  },

  // Large radio for touch targets
  large: {
    size: 'lg' as const,
    variant: 'default' as const,
    color: 'primary' as const,
  },

  // Card-style selectable radio
  card: {
    size: 'default' as const,
    variant: 'default' as const,
    color: 'primary' as const,
  },

  // Horizontal radio group (for small sets)
  horizontal: {
    size: 'default' as const,
    variant: 'default' as const,
    color: 'primary' as const,
  },
};

export type RadioPreset = keyof typeof radioPresets;
