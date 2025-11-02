/**
 * AssetWorks Design System - Spacing Tokens
 *
 * Centralized spacing system based on 8px baseline grid.
 * Provides consistent spacing for margins, padding, and gaps.
 *
 * @module design-system/spacing
 */

// ============================================================================
// SPACING SCALE (8px baseline grid)
// ============================================================================

/**
 * Base spacing scale following 8px grid system
 * All values are multiples or fractions of 8px
 */
export const spacing = {
  0: '0px',         // 0
  px: '1px',        // 1px (border widths)
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px  ⭐ Base unit
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px ⭐ Common default
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px ⭐ Card padding
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px ⭐ Section spacing
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px ⭐ Large spacing
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px ⭐ Extra large
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// ============================================================================
// SEMANTIC SPACING
// ============================================================================

/**
 * Named spacing values for common use cases
 */
export const semanticSpacing = {
  // Component spacing
  buttonPaddingX: spacing[4],      // 16px horizontal
  buttonPaddingY: spacing[2],      // 8px vertical
  inputPadding: spacing[3],        // 12px
  cardPadding: spacing[6],         // 24px
  modalPadding: spacing[8],        // 32px

  // Layout spacing
  sectionGap: spacing[8],          // 32px between sections
  containerPadding: spacing[4],    // 16px default container padding
  containerPaddingSm: spacing[6],  // 24px small screens
  containerPaddingLg: spacing[8],  // 32px large screens

  // Grid & Flex gaps
  gapXs: spacing[2],               // 8px
  gapSm: spacing[3],               // 12px
  gapMd: spacing[4],               // 16px ⭐ Most common
  gapLg: spacing[6],               // 24px
  gapXl: spacing[8],               // 32px

  // Navigation
  navItemGap: spacing[4],          // 16px
  navPadding: spacing[6],          // 24px

  // Stack spacing (vertical rhythm)
  stackXs: spacing[2],             // 8px
  stackSm: spacing[4],             // 16px
  stackMd: spacing[6],             // 24px
  stackLg: spacing[8],             // 32px
  stackXl: spacing[12],            // 48px
} as const;

// ============================================================================
// RESPONSIVE SPACING
// ============================================================================

/**
 * Responsive spacing patterns that change with screen size
 */
export const responsiveSpacing = {
  container: {
    mobile: spacing[4],      // 16px
    tablet: spacing[6],      // 24px
    desktop: spacing[8],     // 32px
  },
  section: {
    mobile: spacing[8],      // 32px
    tablet: spacing[12],     // 48px
    desktop: spacing[16],    // 64px
  },
  grid: {
    mobile: spacing[4],      // 16px
    tablet: spacing[6],      // 24px
    desktop: spacing[8],     // 32px
  },
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

/**
 * Border radius scale for rounded corners
 */
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',     // 2px
  DEFAULT: '0.375rem', // 6px ⭐ UI default
  md: '0.5rem',       // 8px
  lg: '0.75rem',      // 12px ⭐ Cards
  xl: '1rem',         // 16px
  '2xl': '1.5rem',    // 24px
  '3xl': '2rem',      // 32px
  full: '9999px',     // Circles/Pills
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

/**
 * Max-width constraints for containers
 */
export const containerWidth = {
  xs: '20rem',        // 320px
  sm: '24rem',        // 384px
  md: '28rem',        // 448px
  lg: '32rem',        // 512px
  xl: '36rem',        // 576px
  '2xl': '42rem',     // 672px
  '3xl': '48rem',     // 768px
  '4xl': '56rem',     // 896px
  '5xl': '64rem',     // 1024px
  '6xl': '72rem',     // 1152px
  '7xl': '80rem',     // 1280px
  full: '100%',
  screen: '100vw',
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

/**
 * Z-index layering system for stacking context
 */
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  // Named layers
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
  max: 9999,
} as const;

// ============================================================================
// TAILWIND CLASS UTILITIES
// ============================================================================

/**
 * Common spacing class patterns
 */
export const spacingClasses = {
  // Padding
  buttonPadding: 'px-4 py-2',           // 16px/8px
  buttonPaddingSm: 'px-3 py-1.5',       // 12px/6px
  buttonPaddingLg: 'px-6 py-3',         // 24px/12px
  cardPadding: 'p-6',                    // 24px
  modalPadding: 'p-8',                   // 32px
  inputPadding: 'px-3 py-2',            // 12px/8px

  // Container
  container: 'px-4 sm:px-6 lg:px-8',    // Responsive container
  section: 'py-8 md:py-12 lg:py-16',    // Responsive section

  // Gaps
  gapXs: 'gap-2',                        // 8px
  gapSm: 'gap-3',                        // 12px
  gapMd: 'gap-4',                        // 16px
  gapLg: 'gap-6',                        // 24px
  gapXl: 'gap-8',                        // 32px

  // Stack (vertical spacing)
  stackXs: 'space-y-2',                  // 8px
  stackSm: 'space-y-4',                  // 16px
  stackMd: 'space-y-6',                  // 24px
  stackLg: 'space-y-8',                  // 32px
  stackXl: 'space-y-12',                 // 48px
} as const;

// ============================================================================
// GRID PATTERNS
// ============================================================================

/**
 * Common grid layout patterns
 */
export const gridPatterns = {
  // Auto-fit responsive grids
  autoFit1: 'grid grid-cols-1 gap-4',
  autoFit2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  autoFit3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  autoFit4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
  autoFit5: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4',

  // Dashboard grids
  dashboard: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  dashboardWide: 'grid grid-cols-1 lg:grid-cols-2 gap-8',

  // Sidebar layouts
  sidebar: 'grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8',
  sidebarWide: 'grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8',
} as const;

// ============================================================================
// FLEX PATTERNS
// ============================================================================

/**
 * Common flexbox layout patterns
 */
export const flexPatterns = {
  // Horizontal layouts
  row: 'flex flex-row items-center gap-4',
  rowBetween: 'flex flex-row items-center justify-between gap-4',
  rowStart: 'flex flex-row items-start gap-4',
  rowEnd: 'flex flex-row items-end gap-4',

  // Vertical layouts
  col: 'flex flex-col gap-4',
  colBetween: 'flex flex-col justify-between gap-4',
  colCenter: 'flex flex-col items-center gap-4',

  // Centered content
  center: 'flex items-center justify-center',
  centerCol: 'flex flex-col items-center justify-center gap-4',

  // Wrap patterns
  wrap: 'flex flex-wrap gap-4',
  wrapBetween: 'flex flex-wrap items-center justify-between gap-4',
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get spacing value by key
 */
export function getSpacing(key: keyof typeof spacing): string {
  return spacing[key];
}

/**
 * Get semantic spacing value
 */
export function getSemanticSpacing(key: keyof typeof semanticSpacing): string {
  return semanticSpacing[key];
}

/**
 * Get border radius value
 */
export function getBorderRadius(key: keyof typeof borderRadius): string {
  return borderRadius[key];
}

/**
 * Get z-index value
 */
export function getZIndex(key: keyof typeof zIndex): number {
  return zIndex[key];
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type SpacingKey = keyof typeof spacing;
export type SemanticSpacingKey = keyof typeof semanticSpacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ZIndexKey = keyof typeof zIndex;
export type GridPattern = keyof typeof gridPatterns;
export type FlexPattern = keyof typeof flexPatterns;
