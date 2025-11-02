/**
 * AssetWorks Component Variants - Slider
 *
 * Type-safe slider/range component variants using class-variance-authority (CVA).
 * Provides comprehensive slider styling for all states.
 *
 * @module component-variants/slider
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// SLIDER ROOT VARIANTS
// ============================================================================

export const sliderVariants = cva(
  // Base styles
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      /**
       * Size variant (affects height/thickness)
       */
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
      },

      /**
       * Orientation
       */
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col h-full w-2',
      },

      /**
       * Disabled state
       */
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
      disabled: false,
    },
  }
);

export type SliderVariants = VariantProps<typeof sliderVariants>;

// ============================================================================
// SLIDER TRACK (background rail)
// ============================================================================

export const sliderTrackVariants = cva(
  'relative grow overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
      },
      orientation: {
        horizontal: 'w-full',
        vertical: 'h-full w-2',
      },
      variant: {
        default: 'bg-secondary',
        subtle: 'bg-muted',
        bold: 'bg-secondary/50',
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
      variant: 'default',
    },
  }
);

export type SliderTrackVariants = VariantProps<typeof sliderTrackVariants>;

// ============================================================================
// SLIDER RANGE (filled portion)
// ============================================================================

export const sliderRangeVariants = cva(
  'absolute rounded-full',
  {
    variants: {
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
      },
      orientation: {
        horizontal: 'h-full',
        vertical: 'w-full',
      },
      color: {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
        info: 'bg-info',
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
      color: 'primary',
    },
  }
);

export type SliderRangeVariants = VariantProps<typeof sliderRangeVariants>;

// ============================================================================
// SLIDER THUMB (draggable handle)
// ============================================================================

export const sliderThumbVariants = cva(
  'block rounded-full border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      color: {
        primary: 'border-primary',
        success: 'border-success',
        warning: 'border-warning',
        error: 'border-error',
        info: 'border-info',
      },
      variant: {
        default: 'shadow-md hover:shadow-lg',
        subtle: 'shadow-sm hover:shadow-md',
        bold: 'shadow-lg hover:shadow-xl',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
      variant: 'default',
    },
  }
);

export type SliderThumbVariants = VariantProps<typeof sliderThumbVariants>;

// ============================================================================
// SLIDER LABEL
// ============================================================================

export const sliderLabelVariants = cva(
  'text-sm font-medium leading-none mb-2',
  {
    variants: {
      size: {
        sm: 'text-xs mb-1.5',
        default: 'text-sm mb-2',
        lg: 'text-base mb-3',
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

export type SliderLabelVariants = VariantProps<typeof sliderLabelVariants>;

// ============================================================================
// SLIDER VALUE DISPLAY
// ============================================================================

export const sliderValueVariants = cva(
  'text-sm font-medium tabular-nums',
  {
    variants: {
      position: {
        top: 'mb-2',
        bottom: 'mt-2',
        inline: 'ml-4',
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      position: 'inline',
      size: 'default',
    },
  }
);

export type SliderValueVariants = VariantProps<typeof sliderValueVariants>;

// ============================================================================
// SLIDER MARKS (tick marks)
// ============================================================================

export const sliderMarkVariants = cva(
  'absolute w-0.5 h-2 bg-border',
  {
    variants: {
      size: {
        sm: 'h-1.5 w-0.5',
        default: 'h-2 w-0.5',
        lg: 'h-3 w-1',
      },
      active: {
        true: 'bg-primary',
        false: 'bg-border',
      },
    },
    defaultVariants: {
      size: 'default',
      active: false,
    },
  }
);

export type SliderMarkVariants = VariantProps<typeof sliderMarkVariants>;

// ============================================================================
// SLIDER MARK LABEL
// ============================================================================

export const sliderMarkLabelVariants = cva(
  'absolute text-xs text-muted-foreground',
  {
    variants: {
      position: {
        top: 'bottom-full mb-1',
        bottom: 'top-full mt-1',
      },
      size: {
        sm: 'text-[10px]',
        default: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      position: 'bottom',
      size: 'default',
    },
  }
);

export type SliderMarkLabelVariants = VariantProps<typeof sliderMarkLabelVariants>;

// ============================================================================
// SLIDER TOOLTIP (shows value on hover)
// ============================================================================

export const sliderTooltipVariants = cva(
  'absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap pointer-events-none',
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
);

export type SliderTooltipVariants = VariantProps<typeof sliderTooltipVariants>;

// ============================================================================
// SLIDER PRESETS
// ============================================================================

/**
 * Pre-configured slider combinations for common use cases
 */
export const sliderPresets = {
  // Standard range slider
  default: {
    size: 'default' as const,
    color: 'primary' as const,
    variant: 'default' as const,
  },

  // Volume/brightness slider
  volume: {
    size: 'sm' as const,
    color: 'primary' as const,
    variant: 'subtle' as const,
  },

  // Price range slider
  priceRange: {
    size: 'default' as const,
    color: 'primary' as const,
    variant: 'default' as const,
  },

  // Progress slider (with marks)
  progress: {
    size: 'lg' as const,
    color: 'success' as const,
    variant: 'bold' as const,
  },

  // Temperature/settings slider
  settings: {
    size: 'default' as const,
    color: 'info' as const,
    variant: 'default' as const,
  },

  // Danger/warning slider
  danger: {
    size: 'default' as const,
    color: 'error' as const,
    variant: 'default' as const,
  },
};

export type SliderPreset = keyof typeof sliderPresets;
