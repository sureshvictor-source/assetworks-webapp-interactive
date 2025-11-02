/**
 * AssetWorks Component Variants - Layout
 *
 * Type-safe layout component variants (divider, spacer, stack, section).
 * Provides comprehensive layout utilities for consistent spacing and structure.
 *
 * @module component-variants/layout
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// DIVIDER VARIANTS
// ============================================================================

export const dividerVariants = cva(
  'shrink-0 bg-border',
  {
    variants: {
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
      variant: {
        solid: 'bg-border',
        dashed: 'border-dashed border-t border-border bg-transparent',
        dotted: 'border-dotted border-t border-border bg-transparent',
      },
      spacing: {
        none: '',
        sm: 'my-2',
        default: 'my-4',
        lg: 'my-6',
        xl: 'my-8',
      },
      thickness: {
        thin: 'h-[1px]',
        default: 'h-[1px]',
        thick: 'h-[2px]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'solid',
      spacing: 'default',
      thickness: 'default',
    },
  }
);

export type DividerVariants = VariantProps<typeof dividerVariants>;

export const dividerWithTextVariants = cva(
  'flex items-center text-xs text-muted-foreground',
  {
    variants: {
      spacing: {
        sm: 'my-2',
        default: 'my-4',
        lg: 'my-6',
      },
    },
    defaultVariants: {
      spacing: 'default',
    },
  }
);

export type DividerWithTextVariants = VariantProps<typeof dividerWithTextVariants>;

// ============================================================================
// SPACER VARIANTS
// ============================================================================

export const spacerVariants = cva(
  'flex-shrink-0',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-2',
        default: 'h-4',
        md: 'h-6',
        lg: 'h-8',
        xl: 'h-12',
        '2xl': 'h-16',
        '3xl': 'h-24',
      },
      axis: {
        vertical: 'h-auto',
        horizontal: 'w-auto h-0',
      },
    },
    defaultVariants: {
      size: 'default',
      axis: 'vertical',
    },
  }
);

export type SpacerVariants = VariantProps<typeof spacerVariants>;

// ============================================================================
// STACK VARIANTS (Vertical/Horizontal spacing)
// ============================================================================

export const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        default: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12',
        '2xl': 'gap-16',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
    },
    defaultVariants: {
      direction: 'vertical',
      gap: 'default',
      align: 'stretch',
      justify: 'start',
      wrap: false,
    },
  }
);

export type StackVariants = VariantProps<typeof stackVariants>;

// ============================================================================
// SECTION VARIANTS
// ============================================================================

export const sectionVariants = cva(
  'w-full',
  {
    variants: {
      padding: {
        none: '',
        sm: 'py-8',
        default: 'py-12',
        md: 'py-16',
        lg: 'py-20',
        xl: 'py-24',
        '2xl': 'py-32',
      },
      container: {
        true: 'container mx-auto px-4 sm:px-6 lg:px-8',
        false: '',
      },
      background: {
        default: 'bg-background',
        muted: 'bg-muted',
        accent: 'bg-accent',
        transparent: 'bg-transparent',
      },
    },
    defaultVariants: {
      padding: 'default',
      container: true,
      background: 'default',
    },
  }
);

export type SectionVariants = VariantProps<typeof sectionVariants>;

// ============================================================================
// CENTER VARIANTS
// ============================================================================

export const centerVariants = cva(
  'flex',
  {
    variants: {
      axis: {
        both: 'items-center justify-center',
        horizontal: 'justify-center',
        vertical: 'items-center',
      },
      inline: {
        true: 'inline-flex',
        false: 'flex',
      },
    },
    defaultVariants: {
      axis: 'both',
      inline: false,
    },
  }
);

export type CenterVariants = VariantProps<typeof centerVariants>;

// ============================================================================
// ASPECT RATIO CONTAINER VARIANTS
// ============================================================================

export const aspectRatioContainerVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      ratio: {
        square: 'aspect-square',
        video: 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '16/9': 'aspect-[16/9]',
        '21/9': 'aspect-[21/9]',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      ratio: 'video',
      rounded: 'default',
    },
  }
);

export type AspectRatioContainerVariants = VariantProps<typeof aspectRatioContainerVariants>;

// ============================================================================
// LAYOUT PRESETS
// ============================================================================

export const layoutPresets = {
  stack: {
    vertical: { direction: 'vertical' as const, gap: 'default' as const },
    horizontal: { direction: 'horizontal' as const, gap: 'default' as const },
    centered: { direction: 'vertical' as const, align: 'center' as const, justify: 'center' as const },
  },
  section: {
    default: { padding: 'default' as const, container: true as const },
    hero: { padding: 'xl' as const, container: true as const },
    compact: { padding: 'sm' as const, container: true as const },
  },
  divider: {
    default: { orientation: 'horizontal' as const, spacing: 'default' as const },
    vertical: { orientation: 'vertical' as const, spacing: 'none' as const },
    dashed: { variant: 'dashed' as const, spacing: 'default' as const },
  },
};
