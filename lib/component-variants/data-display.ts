/**
 * AssetWorks Component Variants - Data Display
 *
 * Type-safe data display component variants (accordion, table, list, stat, timeline, code).
 * Provides comprehensive data display styling for all patterns.
 *
 * @module component-variants/data-display
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// ACCORDION VARIANTS
// ============================================================================

export const accordionItemVariants = cva(
  'border-b',
  {
    variants: {
      variant: {
        default: 'border-border',
        separated: 'border border-border rounded-lg mb-2',
        ghost: 'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>;

export const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      size: {
        sm: 'py-2 text-sm',
        default: 'py-4 text-base',
        lg: 'py-6 text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type AccordionTriggerVariants = VariantProps<typeof accordionTriggerVariants>;

export const accordionContentVariants = cva(
  'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      padding: {
        none: '',
        sm: 'pb-2',
        default: 'pb-4 pt-0',
        lg: 'pb-6 pt-0',
      },
    },
    defaultVariants: {
      padding: 'default',
    },
  }
);

export type AccordionContentVariants = VariantProps<typeof accordionContentVariants>;

// ============================================================================
// TABLE VARIANTS
// ============================================================================

export const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: '',
        striped: '[&>tbody>tr:nth-child(even)]:bg-muted/50',
        bordered: 'border border-border',
        ghost: '',
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
      layout: {
        auto: 'table-auto',
        fixed: 'table-fixed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      layout: 'auto',
    },
  }
);

export type TableVariants = VariantProps<typeof tableVariants>;

export const tableHeaderVariants = cva(
  '[&_tr]:border-b',
  {
    variants: {
      sticky: {
        true: 'sticky top-0 z-10 bg-background',
        false: '',
      },
    },
    defaultVariants: {
      sticky: false,
    },
  }
);

export type TableHeaderVariants = VariantProps<typeof tableHeaderVariants>;

export const tableRowVariants = cva(
  'border-b transition-colors',
  {
    variants: {
      hoverable: {
        true: 'hover:bg-muted/50 data-[state=selected]:bg-muted',
        false: '',
      },
      clickable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      hoverable: true,
      clickable: false,
    },
  }
);

export type TableRowVariants = VariantProps<typeof tableRowVariants>;

export const tableHeadVariants = cva(
  'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-12 px-4',
        lg: 'h-14 px-6',
      },
      sortable: {
        true: 'cursor-pointer hover:bg-muted/50',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      sortable: false,
    },
  }
);

export type TableHeadVariants = VariantProps<typeof tableHeadVariants>;

export const tableCellVariants = cva(
  'p-4 align-middle [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      size: {
        sm: 'p-2 text-xs',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type TableCellVariants = VariantProps<typeof tableCellVariants>;

// ============================================================================
// LIST VARIANTS
// ============================================================================

export const listVariants = cva(
  'space-y-2',
  {
    variants: {
      variant: {
        default: '',
        divided: 'divide-y divide-border',
        bordered: 'border border-border rounded-lg',
        ghost: '',
      },
      size: {
        sm: 'space-y-1',
        default: 'space-y-2',
        lg: 'space-y-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ListVariants = VariantProps<typeof listVariants>;

export const listItemVariants = cva(
  'flex items-center gap-3 py-2',
  {
    variants: {
      variant: {
        default: '',
        hoverable: 'hover:bg-accent rounded-md px-3 transition-colors cursor-pointer',
        bordered: 'border border-border rounded-md px-3',
      },
      size: {
        sm: 'py-1 gap-2 text-sm',
        default: 'py-2 gap-3',
        lg: 'py-3 gap-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ListItemVariants = VariantProps<typeof listItemVariants>;

// ============================================================================
// STAT/KPI VARIANTS
// ============================================================================

export const statVariants = cva(
  'flex flex-col gap-1',
  {
    variants: {
      variant: {
        default: '',
        card: 'p-6 rounded-lg border border-border bg-card',
        minimal: 'p-4',
      },
      align: {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right',
      },
      size: {
        sm: 'gap-0.5',
        default: 'gap-1',
        lg: 'gap-2',
      },
    },
    defaultVariants: {
      variant: 'card',
      align: 'left',
      size: 'default',
    },
  }
);

export type StatVariants = VariantProps<typeof statVariants>;

export const statLabelVariants = cva(
  'text-sm font-medium text-muted-foreground',
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

export type StatLabelVariants = VariantProps<typeof statLabelVariants>;

export const statValueVariants = cva(
  'text-3xl font-bold tabular-nums',
  {
    variants: {
      size: {
        sm: 'text-2xl',
        default: 'text-3xl',
        lg: 'text-4xl',
        xl: 'text-5xl',
      },
      trend: {
        up: 'text-success',
        down: 'text-error',
        neutral: 'text-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      trend: 'neutral',
    },
  }
);

export type StatValueVariants = VariantProps<typeof statValueVariants>;

export const statDeltaVariants = cva(
  'text-xs font-medium flex items-center gap-1',
  {
    variants: {
      trend: {
        up: 'text-success',
        down: 'text-error',
        neutral: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      trend: 'neutral',
    },
  }
);

export type StatDeltaVariants = VariantProps<typeof statDeltaVariants>;

// ============================================================================
// TIMELINE VARIANTS
// ============================================================================

export const timelineVariants = cva(
  'relative',
  {
    variants: {
      orientation: {
        vertical: 'flex flex-col gap-4',
        horizontal: 'flex flex-row gap-4',
      },
      variant: {
        default: '',
        minimal: '',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
      variant: 'default',
    },
  }
);

export type TimelineVariants = VariantProps<typeof timelineVariants>;

export const timelineItemVariants = cva(
  'relative flex gap-4',
  {
    variants: {
      orientation: {
        vertical: 'flex-row',
        horizontal: 'flex-col',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

export type TimelineItemVariants = VariantProps<typeof timelineItemVariants>;

export const timelineIndicatorVariants = cva(
  'flex items-center justify-center rounded-full border-2 shrink-0',
  {
    variants: {
      size: {
        sm: 'h-6 w-6',
        default: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
      status: {
        default: 'border-border bg-background',
        active: 'border-primary bg-primary text-primary-foreground',
        complete: 'border-success bg-success text-success-foreground',
        error: 'border-error bg-error text-error-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      status: 'default',
    },
  }
);

export type TimelineIndicatorVariants = VariantProps<typeof timelineIndicatorVariants>;

export const timelineConnectorVariants = cva(
  'absolute bg-border',
  {
    variants: {
      orientation: {
        vertical: 'left-4 top-8 w-0.5 h-full',
        horizontal: 'top-4 left-8 h-0.5 w-full',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

export type TimelineConnectorVariants = VariantProps<typeof timelineConnectorVariants>;

// ============================================================================
// CODE BLOCK VARIANTS
// ============================================================================

export const codeBlockVariants = cva(
  'relative rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        bordered: 'border border-border',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'text-xs p-2',
        default: 'text-sm p-4',
        lg: 'text-base p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>;

export const inlineCodeVariants = cva(
  'relative rounded px-[0.3rem] py-[0.2rem] font-mono font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground',
        accent: 'bg-primary/10 text-primary',
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type InlineCodeVariants = VariantProps<typeof inlineCodeVariants>;

// ============================================================================
// DATA DISPLAY PRESETS
// ============================================================================

export const dataDisplayPresets = {
  accordion: {
    default: { variant: 'default' as const, size: 'default' as const },
    separated: { variant: 'separated' as const, size: 'default' as const },
  },
  table: {
    default: { variant: 'default' as const, size: 'default' as const },
    striped: { variant: 'striped' as const, size: 'default' as const },
    bordered: { variant: 'bordered' as const, size: 'default' as const },
  },
  stat: {
    card: { variant: 'card' as const, align: 'left' as const },
    minimal: { variant: 'minimal' as const, align: 'left' as const },
  },
  timeline: {
    vertical: { orientation: 'vertical' as const, variant: 'default' as const },
    horizontal: { orientation: 'horizontal' as const, variant: 'default' as const },
  },
};
