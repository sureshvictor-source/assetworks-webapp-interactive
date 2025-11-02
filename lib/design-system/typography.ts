/**
 * AssetWorks Design System - Typography Tokens
 *
 * Centralized typography system including fonts, sizes, weights, and line heights.
 * Follows a modular type scale for consistent hierarchy.
 *
 * @module design-system/typography
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

export const fontFamily = {
  /**
   * Primary brand font - Euclid Circular A
   * Used for all headings and body text
   */
  primary: [
    'Euclid Circular A',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ],

  /**
   * Monospace font for code blocks
   */
  mono: [
    'SF Mono',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
} as const;

// ============================================================================
// FONT SIZES
// ============================================================================

/**
 * Font size scale following a modular scale
 * Base: 16px (1rem)
 * Ratio: 1.25 (Major Third)
 */
export const fontSize = {
  // Extra small text
  xs: {
    size: '0.75rem',     // 12px
    lineHeight: '1rem',   // 16px
  },
  // Small text
  sm: {
    size: '0.875rem',    // 14px
    lineHeight: '1.25rem', // 20px
  },
  // Base size - body text
  base: {
    size: '1rem',        // 16px
    lineHeight: '1.5rem', // 24px
  },
  // Large text
  lg: {
    size: '1.125rem',    // 18px
    lineHeight: '1.75rem', // 28px
  },
  // Extra large
  xl: {
    size: '1.25rem',     // 20px
    lineHeight: '1.75rem', // 28px
  },
  // 2X large
  '2xl': {
    size: '1.5rem',      // 24px
    lineHeight: '2rem',   // 32px
  },
  // 3X large
  '3xl': {
    size: '1.875rem',    // 30px
    lineHeight: '2.25rem', // 36px
  },
  // 4X large
  '4xl': {
    size: '2.25rem',     // 36px
    lineHeight: '2.75rem', // 44px
  },
  // 5X large
  '5xl': {
    size: '3rem',        // 48px
    lineHeight: '3.5rem', // 56px
  },
  // 6X large
  '6xl': {
    size: '3.75rem',     // 60px
    lineHeight: '4.25rem', // 68px
  },
  // 7X large
  '7xl': {
    size: '4.5rem',      // 72px
    lineHeight: '5rem',   // 80px
  },
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// ============================================================================
// LINE HEIGHTS
// ============================================================================

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// ============================================================================
// LETTER SPACING
// ============================================================================

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// ============================================================================
// HEADING STYLES
// ============================================================================

/**
 * Pre-configured heading styles for consistent typography hierarchy
 */
export const headings = {
  h1: {
    fontSize: '3rem',           // 48px
    lineHeight: '3.5rem',       // 56px
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: '2.25rem',        // 36px
    lineHeight: '2.75rem',      // 44px
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: '1.875rem',       // 30px
    lineHeight: '2.25rem',      // 36px
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: '1.5rem',         // 24px
    lineHeight: '2rem',         // 32px
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: '1.25rem',        // 20px
    lineHeight: '1.75rem',      // 28px
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: '1rem',           // 16px
    lineHeight: '1.5rem',       // 24px
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  },
} as const;

// ============================================================================
// BODY TEXT STYLES
// ============================================================================

export const bodyText = {
  // Large body text
  large: {
    fontSize: fontSize.lg.size,
    lineHeight: fontSize.lg.lineHeight,
    fontWeight: fontWeight.normal,
  },
  // Default body text
  base: {
    fontSize: fontSize.base.size,
    lineHeight: fontSize.base.lineHeight,
    fontWeight: fontWeight.normal,
  },
  // Small body text
  small: {
    fontSize: fontSize.sm.size,
    lineHeight: fontSize.sm.lineHeight,
    fontWeight: fontWeight.normal,
  },
  // Extra small (captions, labels)
  tiny: {
    fontSize: fontSize.xs.size,
    lineHeight: fontSize.xs.lineHeight,
    fontWeight: fontWeight.normal,
  },
} as const;

// ============================================================================
// DISPLAY TEXT STYLES
// ============================================================================

/**
 * Large display text for hero sections and major headings
 */
export const display = {
  // Extra large display
  xl: {
    fontSize: '4.5rem',         // 72px
    lineHeight: '5rem',         // 80px
    fontWeight: fontWeight.extrabold,
    letterSpacing: letterSpacing.tight,
  },
  // Large display
  lg: {
    fontSize: '3.75rem',        // 60px
    lineHeight: '4.25rem',      // 68px
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  // Medium display
  md: {
    fontSize: '3rem',           // 48px
    lineHeight: '3.5rem',       // 56px
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  // Small display
  sm: {
    fontSize: '2.25rem',        // 36px
    lineHeight: '2.75rem',      // 44px
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
} as const;

// ============================================================================
// TAILWIND CSS CLASS UTILITIES
// ============================================================================

/**
 * Pre-built Tailwind class strings for common typography styles
 */
export const typographyClasses = {
  h1: 'text-5xl font-bold leading-tight tracking-tight',
  h2: 'text-4xl font-semibold leading-tight tracking-tight',
  h3: 'text-3xl font-semibold leading-tight',
  h4: 'text-2xl font-medium leading-snug',
  h5: 'text-xl font-medium leading-snug',
  h6: 'text-base font-medium leading-normal tracking-wide',
  body: 'text-base font-normal leading-normal',
  bodyLarge: 'text-lg font-normal leading-relaxed',
  bodySmall: 'text-sm font-normal leading-snug',
  caption: 'text-xs font-normal leading-tight',
  label: 'text-sm font-medium leading-snug',
  button: 'text-sm font-medium leading-none',
  code: 'font-mono text-sm',
} as const;

// ============================================================================
// RESPONSIVE TYPOGRAPHY
// ============================================================================

/**
 * Responsive typography that scales with screen size
 */
export const responsiveHeadings = {
  h1: 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight',
  h2: 'text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight',
  h3: 'text-xl sm:text-2xl md:text-3xl font-semibold leading-tight',
  h4: 'text-lg sm:text-xl md:text-2xl font-medium leading-snug',
  h5: 'text-base sm:text-lg md:text-xl font-medium leading-snug',
  h6: 'text-sm sm:text-base md:text-lg font-medium leading-normal',
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate font size CSS string
 */
export function getFontSize(size: keyof typeof fontSize): string {
  return fontSize[size].size;
}

/**
 * Generate complete typography style object
 */
export function getHeadingStyle(level: keyof typeof headings) {
  return headings[level];
}

/**
 * Generate font family CSS string
 */
export function getFontFamily(family: keyof typeof fontFamily = 'primary'): string {
  return fontFamily[family].join(', ');
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type HeadingLevel = keyof typeof headings;
export type TypographyClass = keyof typeof typographyClasses;
