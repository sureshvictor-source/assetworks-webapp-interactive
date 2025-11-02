/**
 * AssetWorks Component Variants - Textarea
 *
 * Type-safe textarea component variants using class-variance-authority (CVA).
 * Provides comprehensive textarea styling for all states.
 *
 * @module component-variants/textarea
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// TEXTAREA VARIANTS
// ============================================================================

export const textareaVariants = cva(
  // Base styles
  'flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none',
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
      },

      /**
       * Size variant (affects padding and text size)
       */
      size: {
        sm: 'min-h-[60px] px-2 py-1.5 text-xs',
        default: 'min-h-[80px] px-3 py-2',
        lg: 'min-h-[120px] px-4 py-3',
        xl: 'min-h-[160px] px-6 py-4 text-base',
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
       * Resize behavior
       */
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },

      /**
       * Auto-resize (grows with content)
       */
      autoResize: {
        true: 'overflow-hidden',
        false: '',
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
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
      resize: 'vertical',
      autoResize: false,
      fullWidth: true,
      rounded: 'default',
    },
  }
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;

// ============================================================================
// TEXTAREA WRAPPER (for character count, etc.)
// ============================================================================

export const textareaWrapperVariants = cva(
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

export type TextareaWrapperVariants = VariantProps<typeof textareaWrapperVariants>;

// ============================================================================
// TEXTAREA CHARACTER COUNT
// ============================================================================

export const textareaCharCountVariants = cva(
  'absolute bottom-2 right-2 text-xs tabular-nums pointer-events-none',
  {
    variants: {
      state: {
        default: 'text-muted-foreground',
        warning: 'text-warning',
        error: 'text-error',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export type TextareaCharCountVariants = VariantProps<typeof textareaCharCountVariants>;

// ============================================================================
// TEXTAREA PRESETS
// ============================================================================

/**
 * Pre-configured textarea combinations for common use cases
 */
export const textareaPresets = {
  // Short comment/note
  comment: {
    variant: 'default' as const,
    size: 'default' as const,
    resize: 'none' as const,
  },

  // Message/description
  message: {
    variant: 'default' as const,
    size: 'lg' as const,
    resize: 'vertical' as const,
  },

  // Long-form content (blog post, article)
  longForm: {
    variant: 'outline' as const,
    size: 'xl' as const,
    resize: 'vertical' as const,
  },

  // Auto-growing textarea
  autoGrow: {
    variant: 'ghost' as const,
    size: 'default' as const,
    resize: 'none' as const,
    autoResize: true as const,
  },

  // Compact textarea
  compact: {
    variant: 'filled' as const,
    size: 'sm' as const,
    resize: 'none' as const,
  },
};

export type TextareaPreset = keyof typeof textareaPresets;
