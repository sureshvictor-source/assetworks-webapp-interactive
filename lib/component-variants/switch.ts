/**
 * AssetWorks Component Variants - Switch
 *
 * Type-safe toggle switch component variants using class-variance-authority (CVA).
 * Provides comprehensive switch styling for all states.
 *
 * @module component-variants/switch
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// SWITCH VARIANTS
// ============================================================================

export const switchVariants = cva(
  // Base styles
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      /**
       * Size variant
       */
      size: {
        sm: 'h-5 w-9',
        default: 'h-6 w-11',
        lg: 'h-7 w-14',
        xl: 'h-8 w-16',
      },

      /**
       * Color variant (for checked state)
       */
      color: {
        primary: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        success: 'data-[state=checked]:bg-success data-[state=unchecked]:bg-input',
        warning: 'data-[state=checked]:bg-warning data-[state=unchecked]:bg-input',
        error: 'data-[state=checked]:bg-error data-[state=unchecked]:bg-input',
        info: 'data-[state=checked]:bg-info data-[state=unchecked]:bg-input',
      },

      /**
       * Variant (visual style)
       */
      variant: {
        default: '',
        outline: 'border-input',
        ghost: 'bg-transparent',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
      variant: 'default',
    },
  }
);

export type SwitchVariants = VariantProps<typeof switchVariants>;

// ============================================================================
// SWITCH THUMB (the moving circle)
// ============================================================================

export const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0',
        xl: 'h-7 w-7 data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0',
      },
      /**
       * Thumb icon variant
       */
      hasIcon: {
        true: 'flex items-center justify-center',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      hasIcon: false,
    },
  }
);

export type SwitchThumbVariants = VariantProps<typeof switchThumbVariants>;

// ============================================================================
// SWITCH LABEL
// ============================================================================

export const switchLabelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
      position: {
        left: 'order-1',
        right: 'order-2',
      },
    },
    defaultVariants: {
      size: 'default',
      position: 'right',
    },
  }
);

export type SwitchLabelVariants = VariantProps<typeof switchLabelVariants>;

// ============================================================================
// SWITCH CONTAINER (switch + label)
// ============================================================================

export const switchContainerVariants = cva(
  'flex items-center',
  {
    variants: {
      gap: {
        none: 'gap-0',
        sm: 'gap-1.5',
        default: 'gap-2',
        lg: 'gap-3',
        xl: 'gap-4',
      },
      labelPosition: {
        left: 'flex-row-reverse',
        right: 'flex-row',
      },
    },
    defaultVariants: {
      gap: 'default',
      labelPosition: 'right',
    },
  }
);

export type SwitchContainerVariants = VariantProps<typeof switchContainerVariants>;

// ============================================================================
// SWITCH GROUP
// ============================================================================

export const switchGroupVariants = cva(
  'flex flex-col',
  {
    variants: {
      gap: {
        none: 'gap-0',
        sm: 'gap-2',
        default: 'gap-3',
        lg: 'gap-4',
        xl: 'gap-6',
      },
    },
    defaultVariants: {
      gap: 'default',
    },
  }
);

export type SwitchGroupVariants = VariantProps<typeof switchGroupVariants>;

// ============================================================================
// SWITCH CARD (switch with description)
// ============================================================================

export const switchCardVariants = cva(
  'flex items-center justify-between rounded-lg border p-4 transition-colors',
  {
    variants: {
      interactive: {
        true: 'cursor-pointer hover:bg-accent/50',
        false: '',
      },
      selected: {
        true: 'border-primary bg-accent',
        false: 'border-border',
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      interactive: true,
      selected: false,
      size: 'default',
    },
  }
);

export type SwitchCardVariants = VariantProps<typeof switchCardVariants>;

// ============================================================================
// SWITCH PRESETS
// ============================================================================

/**
 * Pre-configured switch combinations for common use cases
 */
export const switchPresets = {
  // Standard toggle switch
  default: {
    size: 'default' as const,
    color: 'primary' as const,
    variant: 'default' as const,
  },

  // Small switch for compact layouts
  compact: {
    size: 'sm' as const,
    color: 'primary' as const,
    variant: 'default' as const,
  },

  // Large switch for touch targets
  large: {
    size: 'lg' as const,
    color: 'primary' as const,
    variant: 'default' as const,
  },

  // Success switch (for enable/disable features)
  success: {
    size: 'default' as const,
    color: 'success' as const,
    variant: 'default' as const,
  },

  // Danger switch (for destructive actions)
  danger: {
    size: 'default' as const,
    color: 'error' as const,
    variant: 'default' as const,
  },

  // Settings switch (with outline)
  settings: {
    size: 'default' as const,
    color: 'primary' as const,
    variant: 'outline' as const,
  },
};

export type SwitchPreset = keyof typeof switchPresets;
