/**
 * AssetWorks Component Variants - Checkbox
 *
 * Type-safe checkbox component variants using class-variance-authority (CVA).
 * Provides comprehensive checkbox styling for all states.
 *
 * @module component-variants/checkbox
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// CHECKBOX VARIANTS
// ============================================================================

export const checkboxVariants = cva(
  // Base styles
  'peer shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors',
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
        primary: 'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
        success: 'data-[state=checked]:bg-success data-[state=checked]:border-success',
        warning: 'data-[state=checked]:bg-warning data-[state=checked]:border-warning',
        error: 'data-[state=checked]:bg-error data-[state=checked]:border-error',
        info: 'data-[state=checked]:bg-info data-[state=checked]:border-info',
      },

      /**
       * Rounded variant
       */
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded',
        lg: 'rounded-md',
        full: 'rounded-full', // Radio-like appearance
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      color: 'primary',
      rounded: 'sm',
    },
  }
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;

// ============================================================================
// CHECKBOX INDICATOR (checkmark icon)
// ============================================================================

export const checkboxIndicatorVariants = cva(
  'flex items-center justify-center text-current',
  {
    variants: {
      size: {
        sm: '[&>svg]:h-3 [&>svg]:w-3',
        default: '[&>svg]:h-4 [&>svg]:w-4',
        lg: '[&>svg]:h-5 [&>svg]:w-5',
        xl: '[&>svg]:h-6 [&>svg]:w-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type CheckboxIndicatorVariants = VariantProps<typeof checkboxIndicatorVariants>;

// ============================================================================
// CHECKBOX LABEL
// ============================================================================

export const checkboxLabelVariants = cva(
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

export type CheckboxLabelVariants = VariantProps<typeof checkboxLabelVariants>;

// ============================================================================
// CHECKBOX GROUP CONTAINER
// ============================================================================

export const checkboxGroupVariants = cva(
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

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>;

// ============================================================================
// CHECKBOX ITEM CONTAINER (checkbox + label)
// ============================================================================

export const checkboxItemVariants = cva(
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

export type CheckboxItemVariants = VariantProps<typeof checkboxItemVariants>;

// ============================================================================
// CHECKBOX CARD (checkbox with surrounding card)
// ============================================================================

export const checkboxCardVariants = cva(
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

export type CheckboxCardVariants = VariantProps<typeof checkboxCardVariants>;

// ============================================================================
// CHECKBOX PRESETS
// ============================================================================

/**
 * Pre-configured checkbox combinations for common use cases
 */
export const checkboxPresets = {
  // Standard checkbox
  default: {
    size: 'default' as const,
    variant: 'default' as const,
    color: 'primary' as const,
  },

  // Small checkbox for compact layouts
  compact: {
    size: 'sm' as const,
    variant: 'outline' as const,
    color: 'primary' as const,
  },

  // Large checkbox for touch targets
  large: {
    size: 'lg' as const,
    variant: 'default' as const,
    color: 'primary' as const,
  },

  // Success checkbox (for completion indicators)
  success: {
    size: 'default' as const,
    variant: 'default' as const,
    color: 'success' as const,
  },

  // Error checkbox (for error states)
  error: {
    size: 'default' as const,
    variant: 'default' as const,
    color: 'error' as const,
  },

  // Card-style selectable checkbox
  card: {
    size: 'default' as const,
    variant: 'default' as const,
    color: 'primary' as const,
  },
};

export type CheckboxPreset = keyof typeof checkboxPresets;
