/**
 * Button Component Variants
 *
 * Centralized button styling using class-variance-authority (cva).
 * Provides consistent button variants across all AssetWorks products.
 *
 * @module component-variants/button
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button variant definitions
 */
export const buttonVariants = cva(
  // Base styles applied to all buttons
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      /**
       * Button visual styles
       */
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        outline:
          'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        success:
          'bg-success text-success-foreground hover:bg-success/90 shadow-sm',
        warning:
          'bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm',
        info: 'bg-info text-info-foreground hover:bg-info/90 shadow-sm',
      },

      /**
       * Button sizes
       */
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-12 rounded-md px-10 text-base',
        icon: 'h-10 w-10',
        iconSm: 'h-8 w-8',
        iconLg: 'h-12 w-12',
      },

      /**
       * Full width option
       */
      fullWidth: {
        true: 'w-full',
        false: '',
      },

      /**
       * Loading state
       */
      loading: {
        true: 'opacity-70 cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      loading: false,
    },
  }
);

/**
 * TypeScript type for button variant props
 */
export type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Button icon wrapper styles
 */
export const buttonIconVariants = cva('', {
  variants: {
    position: {
      left: 'mr-2',
      right: 'ml-2',
    },
    size: {
      sm: 'h-4 w-4',
      default: 'h-4 w-4',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  defaultVariants: {
    position: 'left',
    size: 'default',
  },
});

/**
 * Button group container styles
 */
export const buttonGroupVariants = cva(
  'inline-flex items-center',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      spacing: {
        none: '',
        sm: 'gap-1',
        default: 'gap-2',
        lg: 'gap-4',
      },
      attached: {
        true: '[&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none [&>button:not(:first-child)]:-ml-px',
        false: '',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      spacing: 'default',
      attached: false,
    },
  }
);

/**
 * Usage Examples:
 *
 * ```tsx
 * import { buttonVariants } from '@/lib/component-variants/button';
 *
 * // Basic button
 * <button className={buttonVariants()}>Click me</button>
 *
 * // Primary large button
 * <button className={buttonVariants({ variant: 'default', size: 'lg' })}>
 *   Large Button
 * </button>
 *
 * // Destructive button with full width
 * <button className={buttonVariants({ variant: 'destructive', fullWidth: true })}>
 *   Delete
 * </button>
 *
 * // Loading state
 * <button className={buttonVariants({ loading: true })}>
 *   <Loader className="mr-2 h-4 w-4 animate-spin" />
 *   Loading...
 * </button>
 * ```
 */
