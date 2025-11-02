/**
 * AssetWorks Component Variants - Input
 *
 * Type-safe input component variants using class-variance-authority (CVA).
 * Provides comprehensive input styling for all states and use cases.
 *
 * @module component-variants/input
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// INPUT VARIANTS
// ============================================================================

export const inputVariants = cva(
  // Base styles
  'flex w-full rounded-md border bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      /**
       * Visual variant
       */
      variant: {
        default: 'border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        outline: 'border-border focus:border-primary focus:ring-1 focus:ring-primary',
        filled: 'border-transparent bg-muted focus:bg-background focus:border-primary',
        ghost: 'border-transparent focus:border-primary',
        flushed: 'border-0 border-b-2 border-border rounded-none focus:border-primary px-0',
      },

      /**
       * Size variant
       */
      size: {
        sm: 'h-8 px-3 py-1 text-xs',
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
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
        warning: 'border-warning focus-visible:ring-warning',
      },

      /**
       * Has icon (padding adjustment)
       */
      hasIcon: {
        left: 'pl-10',
        right: 'pr-10',
        both: 'px-10',
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

export type InputVariants = VariantProps<typeof inputVariants>;

// ============================================================================
// INPUT LABEL VARIANTS
// ============================================================================

export const inputLabelVariants = cva(
  'block text-sm font-medium leading-6',
  {
    variants: {
      state: {
        default: 'text-foreground',
        error: 'text-error',
        success: 'text-success',
        warning: 'text-warning',
        disabled: 'text-muted-foreground',
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-error",
        false: '',
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      state: 'default',
      required: false,
      size: 'default',
    },
  }
);

export type InputLabelVariants = VariantProps<typeof inputLabelVariants>;

// ============================================================================
// INPUT HELPER TEXT VARIANTS
// ============================================================================

export const inputHelperTextVariants = cva(
  'mt-1.5 text-xs',
  {
    variants: {
      state: {
        default: 'text-muted-foreground',
        error: 'text-error',
        success: 'text-success',
        warning: 'text-warning',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export type InputHelperTextVariants = VariantProps<typeof inputHelperTextVariants>;

// ============================================================================
// INPUT ICON VARIANTS
// ============================================================================

export const inputIconVariants = cva(
  'absolute top-1/2 -translate-y-1/2 pointer-events-none',
  {
    variants: {
      position: {
        left: 'left-3',
        right: 'right-3',
      },
      size: {
        sm: 'w-4 h-4',
        default: 'w-5 h-5',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-6 h-6',
      },
      state: {
        default: 'text-muted-foreground',
        error: 'text-error',
        success: 'text-success',
        warning: 'text-warning',
      },
    },
    defaultVariants: {
      position: 'left',
      size: 'default',
      state: 'default',
    },
  }
);

export type InputIconVariants = VariantProps<typeof inputIconVariants>;

// ============================================================================
// INPUT ADDON VARIANTS (prefix/suffix)
// ============================================================================

export const inputAddonVariants = cva(
  'inline-flex items-center border border-input bg-muted px-3 text-sm text-muted-foreground',
  {
    variants: {
      position: {
        left: 'rounded-l-md border-r-0',
        right: 'rounded-r-md border-l-0',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3',
        md: 'h-11 px-4',
        lg: 'h-12 px-4',
        xl: 'h-14 px-6 text-base',
      },
    },
    defaultVariants: {
      position: 'left',
      size: 'default',
    },
  }
);

export type InputAddonVariants = VariantProps<typeof inputAddonVariants>;

// ============================================================================
// INPUT GROUP CONTAINER
// ============================================================================

export const inputGroupVariants = cva(
  'flex items-stretch',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      fullWidth: true,
    },
  }
);

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>;

// ============================================================================
// INPUT WRAPPER (for icon positioning)
// ============================================================================

export const inputWrapperVariants = cva(
  'relative',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      fullWidth: true,
    },
  }
);

export type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;

// ============================================================================
// SPECIALIZED INPUT VARIANTS
// ============================================================================

/**
 * Search input variant
 */
export const searchInputVariants = cva(
  [
    inputVariants({ hasIcon: 'left' }),
    'pr-10', // For clear button
  ].join(' ')
);

/**
 * Number input variant (with steppers)
 */
export const numberInputVariants = cva(
  [
    inputVariants(),
    'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
  ].join(' ')
);

/**
 * Password input variant (with toggle)
 */
export const passwordInputVariants = cva(
  [
    inputVariants({ hasIcon: 'right' }),
  ].join(' ')
);

/**
 * OTP/PIN input variant
 */
export const otpInputVariants = cva(
  'w-12 h-12 text-center text-lg font-semibold border-2 border-input rounded-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors'
);

/**
 * Currency input variant
 */
export const currencyInputVariants = cva(
  [
    inputVariants({ hasIcon: 'left' }),
    'font-mono',
  ].join(' ')
);

// ============================================================================
// INPUT PRESETS
// ============================================================================

/**
 * Pre-configured input combinations for common use cases
 */
export const inputPresets = {
  // Standard text input
  text: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'text',
  },

  // Email input
  email: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'email',
    hasIcon: 'left' as const,
  },

  // Password input
  password: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'password',
    hasIcon: 'right' as const,
  },

  // Search input
  search: {
    variant: 'ghost' as const,
    size: 'default' as const,
    type: 'search',
    hasIcon: 'left' as const,
    rounded: 'full' as const,
  },

  // Number input
  number: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'number',
  },

  // Phone input
  phone: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'tel',
    hasIcon: 'left' as const,
  },

  // URL input
  url: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'url',
    hasIcon: 'left' as const,
  },

  // Date input
  date: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'date',
  },

  // Time input
  time: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'time',
  },

  // File input
  file: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'file',
  },

  // Currency input
  currency: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'text',
    hasIcon: 'left' as const,
  },

  // Percentage input
  percentage: {
    variant: 'default' as const,
    size: 'default' as const,
    type: 'number',
    hasIcon: 'right' as const,
  },
};

export type InputPreset = keyof typeof inputPresets;
