/**
 * AssetWorks Design System - Grid Tokens
 *
 * CSS Grid utilities for layout and responsive design.
 * Provides consistent grid patterns across all AssetWorks products.
 *
 * @module design-system/grids
 */

import { spacing } from './spacing';

// ============================================================================
// GRID COLUMNS
// ============================================================================

/**
 * Grid template columns
 */
export const gridColumns = {
  1: 'repeat(1, minmax(0, 1fr))',
  2: 'repeat(2, minmax(0, 1fr))',
  3: 'repeat(3, minmax(0, 1fr))',
  4: 'repeat(4, minmax(0, 1fr))',
  5: 'repeat(5, minmax(0, 1fr))',
  6: 'repeat(6, minmax(0, 1fr))',
  7: 'repeat(7, minmax(0, 1fr))',
  8: 'repeat(8, minmax(0, 1fr))',
  9: 'repeat(9, minmax(0, 1fr))',
  10: 'repeat(10, minmax(0, 1fr))',
  11: 'repeat(11, minmax(0, 1fr))',
  12: 'repeat(12, minmax(0, 1fr))',
  none: 'none',
} as const;

export type GridColumns = keyof typeof gridColumns;

// ============================================================================
// GRID ROWS
// ============================================================================

/**
 * Grid template rows
 */
export const gridRows = {
  1: 'repeat(1, minmax(0, 1fr))',
  2: 'repeat(2, minmax(0, 1fr))',
  3: 'repeat(3, minmax(0, 1fr))',
  4: 'repeat(4, minmax(0, 1fr))',
  5: 'repeat(5, minmax(0, 1fr))',
  6: 'repeat(6, minmax(0, 1fr))',
  none: 'none',
} as const;

export type GridRows = keyof typeof gridRows;

// ============================================================================
// GRID GAPS
// ============================================================================

/**
 * Grid gap values (using spacing scale)
 */
export const gridGap = {
  0: spacing[0],
  1: spacing[1],
  2: spacing[2],
  3: spacing[3],
  4: spacing[4],
  5: spacing[5],
  6: spacing[6],
  8: spacing[8],
  10: spacing[10],
  12: spacing[12],
  16: spacing[16],
  20: spacing[20],
  24: spacing[24],
} as const;

export type GridGap = keyof typeof gridGap;

// ============================================================================
// RESPONSIVE GRID PATTERNS
// ============================================================================

/**
 * Pre-built responsive grid patterns
 * Mobile-first approach
 */
export const responsiveGrids = {
  // 1 column on mobile, 2 on tablet, 3 on desktop
  '1-2-3': {
    base: gridColumns[1],
    md: gridColumns[2],
    lg: gridColumns[3],
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  },

  // 1 column on mobile, 2 on tablet, 4 on desktop
  '1-2-4': {
    base: gridColumns[1],
    md: gridColumns[2],
    lg: gridColumns[4],
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },

  // 1 column on mobile, 3 on desktop
  '1-3': {
    base: gridColumns[1],
    lg: gridColumns[3],
    className: 'grid grid-cols-1 lg:grid-cols-3',
  },

  // 1 column on mobile, 4 on desktop
  '1-4': {
    base: gridColumns[1],
    lg: gridColumns[4],
    className: 'grid grid-cols-1 lg:grid-cols-4',
  },

  // 2 columns on all sizes
  '2-fixed': {
    base: gridColumns[2],
    className: 'grid grid-cols-2',
  },

  // 3 columns on all sizes
  '3-fixed': {
    base: gridColumns[3],
    className: 'grid grid-cols-3',
  },

  // 4 columns on all sizes
  '4-fixed': {
    base: gridColumns[4],
    className: 'grid grid-cols-4',
  },

  // 12-column grid (like Bootstrap)
  '12-column': {
    base: gridColumns[12],
    className: 'grid grid-cols-12',
  },

  // Auto-fit with min width
  autoFit: {
    base: 'repeat(auto-fit, minmax(250px, 1fr))',
    className: 'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
  },

  // Auto-fill with min width
  autoFill: {
    base: 'repeat(auto-fill, minmax(200px, 1fr))',
    className: 'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]',
  },
} as const;

export type ResponsiveGrid = keyof typeof responsiveGrids;

// ============================================================================
// GRID LAYOUTS (Specific Use Cases)
// ============================================================================

/**
 * Named grid layouts for common UI patterns
 */
export const gridLayouts = {
  // Dashboard with sidebar
  dashboardSidebar: {
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: '"sidebar main"',
    className: 'grid grid-cols-[240px_1fr] grid-areas-[sidebar_main]',
  },

  // Dashboard with collapsible sidebar
  dashboardSidebarCollapsible: {
    gridTemplateColumns: '64px 1fr',
    gridTemplateAreas: '"sidebar main"',
    className: 'grid grid-cols-[64px_1fr]',
  },

  // Header + Content + Footer
  pageLayout: {
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: '"header" "main" "footer"',
    className: 'grid grid-rows-[auto_1fr_auto] min-h-screen',
  },

  // Sidebar + Header + Content
  appLayout: {
    gridTemplateColumns: '240px 1fr',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: '"sidebar header" "sidebar main"',
    className: 'grid grid-cols-[240px_1fr] grid-rows-[auto_1fr] min-h-screen',
  },

  // Holy Grail Layout
  holyGrail: {
    gridTemplateColumns: '200px 1fr 200px',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: '"header header header" "nav main aside" "footer footer footer"',
    className: 'grid grid-cols-[200px_1fr_200px] grid-rows-[auto_1fr_auto] min-h-screen',
  },

  // Card grid (responsive)
  cardGrid: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: gridGap[6],
    className: 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6',
  },

  // Image gallery
  gallery: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: gridGap[4],
    className: 'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4',
  },

  // Masonry-like layout
  masonry2Col: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridAutoFlow: 'dense',
    className: 'grid grid-cols-2 auto-rows-auto',
  },

  // Feature grid (3 columns)
  featureGrid: {
    gridTemplateColumns: gridColumns[3],
    gap: gridGap[8],
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  },

  // Stats grid (4 columns)
  statsGrid: {
    gridTemplateColumns: gridColumns[4],
    gap: gridGap[6],
    className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  },

  // Form grid (2 columns)
  formGrid: {
    gridTemplateColumns: gridColumns[2],
    gap: gridGap[4],
    className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  },
} as const;

export type GridLayout = keyof typeof gridLayouts;

// ============================================================================
// GRID UTILITIES (Tailwind classes)
// ============================================================================

/**
 * Tailwind CSS classes for grids
 */
export const gridClasses = {
  // Display
  grid: 'grid',
  inlineGrid: 'inline-grid',

  // Columns
  cols1: 'grid-cols-1',
  cols2: 'grid-cols-2',
  cols3: 'grid-cols-3',
  cols4: 'grid-cols-4',
  cols5: 'grid-cols-5',
  cols6: 'grid-cols-6',
  cols12: 'grid-cols-12',

  // Rows
  rows1: 'grid-rows-1',
  rows2: 'grid-rows-2',
  rows3: 'grid-rows-3',
  rows4: 'grid-rows-4',

  // Gap
  gap0: 'gap-0',
  gap2: 'gap-2',
  gap4: 'gap-4',
  gap6: 'gap-6',
  gap8: 'gap-8',

  // Flow
  flowRow: 'grid-flow-row',
  flowCol: 'grid-flow-col',
  flowDense: 'grid-flow-dense',

  // Auto columns/rows
  autoColsAuto: 'auto-cols-auto',
  autoColsMin: 'auto-cols-min',
  autoColsMax: 'auto-cols-max',
  autoColsFr: 'auto-cols-fr',

  // Span
  colSpan1: 'col-span-1',
  colSpan2: 'col-span-2',
  colSpan3: 'col-span-3',
  colSpan4: 'col-span-4',
  colSpanFull: 'col-span-full',

  rowSpan1: 'row-span-1',
  rowSpan2: 'row-span-2',
  rowSpan3: 'row-span-3',
  rowSpanFull: 'row-span-full',

  // Alignment
  itemsStart: 'items-start',
  itemsCenter: 'items-center',
  itemsEnd: 'items-end',
  itemsStretch: 'items-stretch',

  justifyStart: 'justify-start',
  justifyCenter: 'justify-center',
  justifyEnd: 'justify-end',
  justifyBetween: 'justify-between',
} as const;

export type GridClass = keyof typeof gridClasses;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get grid columns value
 */
export function getGridColumns(key: GridColumns): string {
  return gridColumns[key];
}

/**
 * Get grid rows value
 */
export function getGridRows(key: GridRows): string {
  return gridRows[key];
}

/**
 * Get grid gap value
 */
export function getGridGap(key: GridGap): string {
  return gridGap[key];
}

/**
 * Get responsive grid pattern
 */
export function getResponsiveGrid(key: ResponsiveGrid): typeof responsiveGrids[ResponsiveGrid] {
  return responsiveGrids[key];
}

/**
 * Get grid layout
 */
export function getGridLayout(key: GridLayout): typeof gridLayouts[GridLayout] {
  return gridLayouts[key];
}

/**
 * Get grid class
 */
export function getGridClass(key: GridClass): string {
  return gridClasses[key];
}

/**
 * Create custom grid columns
 */
export function createGridColumns(count: number): string {
  return `repeat(${count}, minmax(0, 1fr))`;
}

/**
 * Create auto-fit grid with min width
 */
export function createAutoFitGrid(minWidth: string): string {
  return `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
}

/**
 * Create auto-fill grid with min width
 */
export function createAutoFillGrid(minWidth: string): string {
  return `repeat(auto-fill, minmax(${minWidth}, 1fr))`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const grids = {
  columns: gridColumns,
  rows: gridRows,
  gap: gridGap,
  responsive: responsiveGrids,
  layouts: gridLayouts,
  classes: gridClasses,
} as const;
