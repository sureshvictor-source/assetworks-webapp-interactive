/**
 * Card Component Variants
 *
 * Centralized card styling using class-variance-authority (cva).
 * Provides consistent card variants across all AssetWorks products.
 *
 * @module component-variants/card
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Card container variant definitions
 */
export const cardVariants = cva(
  // Base styles
  'rounded-lg border bg-card text-card-foreground shadow transition-all',
  {
    variants: {
      /**
       * Card visual styles
       */
      variant: {
        default: 'border-border bg-card',
        outlined: 'border-2 border-border bg-card',
        elevated: 'border-border bg-card shadow-lg',
        ghost: 'border-transparent bg-transparent shadow-none',
        primary: 'border-primary/20 bg-primary/5',
        success: 'border-success/20 bg-success/5',
        warning: 'border-warning/20 bg-warning/5',
        error: 'border-error/20 bg-error/5',
        info: 'border-info/20 bg-info/5',
      },

      /**
       * Card padding
       */
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },

      /**
       * Interactive states
       */
      hoverable: {
        true: 'cursor-pointer hover:shadow-lg hover:border-primary/30 hover:scale-[1.02]',
        false: '',
      },

      /**
       * Clickable state
       */
      clickable: {
        true: 'cursor-pointer active:scale-[0.98]',
        false: '',
      },

      /**
       * Border radius
       */
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
        full: 'rounded-3xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      hoverable: false,
      clickable: false,
      rounded: 'default',
    },
  }
);

/**
 * Card header variant definitions
 */
export const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      border: {
        true: 'border-b border-border pb-4',
        false: '',
      },
    },
    defaultVariants: {
      padding: 'default',
      border: false,
    },
  }
);

/**
 * Card title variant definitions
 */
export const cardTitleVariants = cva(
  'text-2xl font-semibold leading-none tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-lg',
        default: 'text-2xl',
        lg: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Card description variant definitions
 */
export const cardDescriptionVariants = cva(
  'text-sm text-muted-foreground',
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

/**
 * Card content variant definitions
 */
export const cardContentVariants = cva(
  '',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pt-0',
        default: 'p-6 pt-0',
        lg: 'p-8 pt-0',
      },
    },
    defaultVariants: {
      padding: 'default',
    },
  }
);

/**
 * Card footer variant definitions
 */
export const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pt-0',
        default: 'p-6 pt-0',
        lg: 'p-8 pt-0',
      },
      border: {
        true: 'border-t border-border pt-4',
        false: '',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      padding: 'default',
      border: false,
      justify: 'start',
    },
  }
);

/**
 * TypeScript types for variant props
 */
export type CardVariants = VariantProps<typeof cardVariants>;
export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;
export type CardDescriptionVariants = VariantProps<typeof cardDescriptionVariants>;
export type CardContentVariants = VariantProps<typeof cardContentVariants>;
export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;

/**
 * Card layout presets for common patterns
 */
export const cardLayoutPresets = {
  dashboard: {
    card: { variant: 'default' as const, hoverable: true, padding: 'default' as const },
    header: { border: true },
  },
  stat: {
    card: { variant: 'default' as const, padding: 'lg' as const },
    title: { size: 'sm' as const },
  },
  feature: {
    card: { variant: 'outlined' as const, hoverable: true, padding: 'lg' as const, rounded: 'lg' as const },
  },
  pricing: {
    card: { variant: 'elevated' as const, padding: 'lg' as const, rounded: 'xl' as const },
    header: { border: true },
    footer: { border: true, justify: 'center' as const },
  },
} as const;

/**
 * Usage Examples:
 *
 * ```tsx
 * import {
 *   cardVariants,
 *   cardHeaderVariants,
 *   cardTitleVariants,
 *   cardContentVariants,
 *   cardFooterVariants
 * } from '@/lib/component-variants/card';
 *
 * // Basic card
 * <div className={cardVariants()}>
 *   <div className={cardHeaderVariants()}>
 *     <h3 className={cardTitleVariants()}>Card Title</h3>
 *   </div>
 *   <div className={cardContentVariants()}>
 *     Content here
 *   </div>
 * </div>
 *
 * // Hoverable card with border
 * <div className={cardVariants({ variant: 'outlined', hoverable: true })}>
 *   <div className={cardHeaderVariants({ border: true })}>
 *     <h3 className={cardTitleVariants({ size: 'lg' })}>Large Title</h3>
 *     <p className={cardDescriptionVariants()}>Description</p>
 *   </div>
 *   <div className={cardContentVariants({ padding: 'lg' })}>
 *     Content
 *   </div>
 *   <div className={cardFooterVariants({ border: true, justify: 'between' })}>
 *     Footer content
 *   </div>
 * </div>
 *
 * // Using preset
 * <div className={cardVariants(cardLayoutPresets.dashboard.card)}>
 *   <div className={cardHeaderVariants(cardLayoutPresets.dashboard.header)}>
 *     <h3 className={cardTitleVariants()}>Dashboard Card</h3>
 *   </div>
 *   <div className={cardContentVariants()}>
 *     Dashboard content
 *   </div>
 * </div>
 * ```
 */
