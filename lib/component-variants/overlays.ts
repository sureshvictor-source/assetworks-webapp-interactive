/**
 * AssetWorks Component Variants - Overlays
 *
 * Type-safe overlay component variants (modal, drawer, popover, tooltip, sheet).
 * Provides comprehensive overlay styling for all patterns.
 *
 * @module component-variants/overlays
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// MODAL/DIALOG VARIANTS
// ============================================================================

export const modalOverlayVariants = cva(
  'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      blur: {
        none: 'backdrop-blur-none',
        sm: 'backdrop-blur-sm',
        default: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
      },
    },
    defaultVariants: {
      blur: 'default',
    },
  }
);

export type ModalOverlayVariants = VariantProps<typeof modalOverlayVariants>;

export const modalContentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        md: 'max-w-md',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type ModalContentVariants = VariantProps<typeof modalContentVariants>;

export const modalHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-center sm:text-left'
);

export const modalTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight'
);

export const modalDescriptionVariants = cva(
  'text-sm text-muted-foreground'
);

export const modalFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'
);

// ============================================================================
// DRAWER VARIANTS
// ============================================================================

export const drawerVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
      size: {
        sm: 'sm:max-w-sm',
        default: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        full: 'sm:max-w-full',
      },
    },
    defaultVariants: {
      side: 'right',
      size: 'default',
    },
  }
);

export type DrawerVariants = VariantProps<typeof drawerVariants>;

// ============================================================================
// POPOVER VARIANTS
// ============================================================================

export const popoverContentVariants = cva(
  'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      size: {
        sm: 'w-48 p-2',
        default: 'w-72 p-4',
        lg: 'w-96 p-6',
        auto: 'w-auto p-4',
      },
      variant: {
        default: 'bg-popover text-popover-foreground',
        accent: 'bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export type PopoverContentVariants = VariantProps<typeof popoverContentVariants>;

// ============================================================================
// TOOLTIP VARIANTS
// ============================================================================

export const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-popover text-popover-foreground',
        dark: 'bg-gray-900 text-white border-gray-800',
        light: 'bg-white text-gray-900 border-gray-200',
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

export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>;

// ============================================================================
// SHEET VARIANTS (Similar to Drawer but with different animations)
// ============================================================================

export const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
      size: {
        content: '',
        default: 'sm:max-w-md',
        sm: 'sm:max-w-sm',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        full: 'sm:max-w-full',
      },
    },
    defaultVariants: {
      side: 'right',
      size: 'default',
    },
  }
);

export type SheetVariants = VariantProps<typeof sheetVariants>;

// ============================================================================
// DROPDOWN MENU VARIANTS
// ============================================================================

export const dropdownMenuContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
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

export type DropdownMenuContentVariants = VariantProps<typeof dropdownMenuContentVariants>;

// ============================================================================
// OVERLAY PRESETS
// ============================================================================

export const overlayPresets = {
  modal: {
    small: { size: 'sm' as const },
    default: { size: 'default' as const },
    large: { size: 'lg' as const },
    fullScreen: { size: 'full' as const },
  },
  drawer: {
    left: { side: 'left' as const, size: 'default' as const },
    right: { side: 'right' as const, size: 'default' as const },
    top: { side: 'top' as const, size: 'default' as const },
    bottom: { side: 'bottom' as const, size: 'default' as const },
  },
  popover: {
    default: { size: 'default' as const, variant: 'default' as const },
    small: { size: 'sm' as const, variant: 'default' as const },
    large: { size: 'lg' as const, variant: 'default' as const },
  },
  tooltip: {
    default: { variant: 'default' as const, size: 'default' as const },
    dark: { variant: 'dark' as const, size: 'default' as const },
    light: { variant: 'light' as const, size: 'default' as const },
  },
};
