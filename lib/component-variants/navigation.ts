/**
 * AssetWorks Component Variants - Navigation
 *
 * Type-safe navigation component variants (navbar, breadcrumbs, pagination, tabs, menu).
 * Provides comprehensive navigation styling for all patterns.
 *
 * @module component-variants/navigation
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// NAVBAR VARIANTS
// ============================================================================

export const navbarVariants = cva(
  'flex items-center justify-between w-full',
  {
    variants: {
      variant: {
        default: 'bg-background border-b border-border',
        filled: 'bg-primary text-primary-foreground',
        glass: 'bg-background/80 backdrop-blur-md border-b border-border/50',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'h-14 px-4',
        default: 'h-16 px-6',
        lg: 'h-20 px-8',
      },
      position: {
        static: 'relative',
        sticky: 'sticky top-0 z-50',
        fixed: 'fixed top-0 left-0 right-0 z-50',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        default: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      position: 'sticky',
      shadow: 'sm',
    },
  }
);

export type NavbarVariants = VariantProps<typeof navbarVariants>;

// ============================================================================
// BREADCRUMBS VARIANTS
// ============================================================================

export const breadcrumbsVariants = cva(
  'flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs gap-1',
        default: 'text-sm gap-1.5',
        lg: 'text-base gap-2',
      },
      separator: {
        slash: "[&>li:not(:last-child)]:after:content-['/'] [&>li:not(:last-child)]:after:mx-2",
        chevron: "[&>li:not(:last-child)]:after:content-['>'] [&>li:not(:last-child)]:after:mx-2",
        dot: "[&>li:not(:last-child)]:after:content-['•'] [&>li:not(:last-child)]:after:mx-2",
      },
    },
    defaultVariants: {
      size: 'default',
      separator: 'slash',
    },
  }
);

export type BreadcrumbsVariants = VariantProps<typeof breadcrumbsVariants>;

export const breadcrumbItemVariants = cva(
  'inline-flex items-center',
  {
    variants: {
      active: {
        true: 'text-foreground font-medium',
        false: 'text-muted-foreground hover:text-foreground transition-colors',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export type BreadcrumbItemVariants = VariantProps<typeof breadcrumbItemVariants>;

// ============================================================================
// PAGINATION VARIANTS
// ============================================================================

export const paginationVariants = cva(
  'flex items-center justify-center gap-1',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        default: 'gap-1',
        lg: 'gap-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type PaginationVariants = VariantProps<typeof paginationVariants>;

export const paginationItemVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        default: 'h-9 w-9 text-sm',
        lg: 'h-10 w-10 text-base',
      },
      active: {
        true: 'bg-primary text-primary-foreground hover:bg-primary/90',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      active: false,
    },
  }
);

export type PaginationItemVariants = VariantProps<typeof paginationItemVariants>;

// ============================================================================
// TABS VARIANTS
// ============================================================================

export const tabsListVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'rounded-md bg-muted p-1',
        underline: 'border-b border-border',
        pills: 'gap-2',
        enclosed: 'border border-border rounded-lg p-1',
      },
      size: {
        sm: 'h-9 text-xs',
        default: 'h-10 text-sm',
        lg: 'h-11 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export type TabsListVariants = VariantProps<typeof tabsListVariants>;

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'rounded-sm px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-foreground',
        pills: 'rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        enclosed: 'rounded-md px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-border',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;

export const tabsContentVariants = cva(
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-2',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      padding: 'default',
    },
  }
);

export type TabsContentVariants = VariantProps<typeof tabsContentVariants>;

// ============================================================================
// MENU VARIANTS
// ============================================================================

export const menuVariants = cva(
  'min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
  {
    variants: {
      size: {
        sm: 'min-w-[6rem] text-xs',
        default: 'min-w-[8rem] text-sm',
        lg: 'min-w-[12rem] text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type MenuVariants = VariantProps<typeof menuVariants>;

export const menuItemVariants = cva(
  'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus:bg-accent focus:text-accent-foreground',
        destructive: 'text-error focus:bg-error focus:text-error-foreground',
      },
      size: {
        sm: 'px-1.5 py-1 text-xs',
        default: 'px-2 py-1.5 text-sm',
        lg: 'px-3 py-2 text-base',
      },
      inset: {
        true: 'pl-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      inset: false,
    },
  }
);

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;

export const menuSeparatorVariants = cva(
  '-mx-1 my-1 h-px bg-muted'
);

export type MenuSeparatorVariants = VariantProps<typeof menuSeparatorVariants>;

export const menuLabelVariants = cva(
  'px-2 py-1.5 text-sm font-semibold',
  {
    variants: {
      inset: {
        true: 'pl-8',
        false: '',
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
);

export type MenuLabelVariants = VariantProps<typeof menuLabelVariants>;

// ============================================================================
// STEPPER VARIANTS
// ============================================================================

export const stepperVariants = cva(
  'flex items-center',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      size: {
        sm: 'gap-2',
        default: 'gap-4',
        lg: 'gap-6',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'default',
    },
  }
);

export type StepperVariants = VariantProps<typeof stepperVariants>;

export const stepVariants = cva(
  'flex items-center gap-2',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col items-start',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export type StepVariants = VariantProps<typeof stepVariants>;

export const stepIndicatorVariants = cva(
  'flex items-center justify-center rounded-full border-2 font-medium transition-colors',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-xs',
        default: 'h-8 w-8 text-sm',
        lg: 'h-10 w-10 text-base',
      },
      status: {
        upcoming: 'border-border bg-background text-muted-foreground',
        current: 'border-primary bg-primary text-primary-foreground',
        complete: 'border-success bg-success text-success-foreground',
        error: 'border-error bg-error text-error-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      status: 'upcoming',
    },
  }
);

export type StepIndicatorVariants = VariantProps<typeof stepIndicatorVariants>;

export const stepConnectorVariants = cva(
  'bg-border',
  {
    variants: {
      orientation: {
        horizontal: 'h-0.5 w-full mx-2',
        vertical: 'w-0.5 h-full my-2',
      },
      status: {
        upcoming: 'bg-border',
        complete: 'bg-success',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      status: 'upcoming',
    },
  }
);

export type StepConnectorVariants = VariantProps<typeof stepConnectorVariants>;

// ============================================================================
// NAVIGATION PRESETS
// ============================================================================

export const navigationPresets = {
  navbar: {
    topNav: { variant: 'default' as const, position: 'sticky' as const, shadow: 'sm' as const },
    glassNav: { variant: 'glass' as const, position: 'sticky' as const, shadow: 'none' as const },
    filledNav: { variant: 'filled' as const, position: 'sticky' as const, shadow: 'md' as const },
  },
  tabs: {
    default: { variant: 'default' as const, size: 'default' as const },
    underline: { variant: 'underline' as const, size: 'default' as const },
    pills: { variant: 'pills' as const, size: 'default' as const },
  },
  pagination: {
    default: { variant: 'default' as const, size: 'default' as const },
    outline: { variant: 'outline' as const, size: 'default' as const },
  },
  stepper: {
    horizontal: { orientation: 'horizontal' as const, size: 'default' as const },
    vertical: { orientation: 'vertical' as const, size: 'default' as const },
  },
};
