/**
 * AssetWorks Design System - Breakpoint Tokens
 *
 * Centralized responsive breakpoint system for consistent media queries.
 * Mobile-first approach with Tailwind CSS integration.
 *
 * @module design-system/breakpoints
 */

// ============================================================================
// BREAKPOINT VALUES
// ============================================================================

/**
 * Responsive breakpoints following Tailwind defaults
 * Mobile-first: styles apply to this width and above
 */
export const breakpoints = {
  sm: '640px',      // Small tablets (portrait)
  md: '768px',      // Tablets (landscape), small laptops
  lg: '1024px',     // Desktops
  xl: '1280px',     // Large desktops
  '2xl': '1536px',  // Extra large screens
} as const;

// ============================================================================
// NUMERIC BREAKPOINTS (for JS calculations)
// ============================================================================

/**
 * Breakpoint values as numbers (in pixels)
 * Useful for JavaScript calculations and logic
 */
export const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================================================
// DEVICE CATEGORIES
// ============================================================================

/**
 * Semantic device categories
 */
export const devices = {
  mobile: {
    min: 0,
    max: breakpointValues.sm - 1,    // 0-639px
    description: 'Mobile phones',
  },
  tablet: {
    min: breakpointValues.sm,
    max: breakpointValues.md - 1,    // 640-767px
    description: 'Small tablets (portrait)',
  },
  tabletLandscape: {
    min: breakpointValues.md,
    max: breakpointValues.lg - 1,    // 768-1023px
    description: 'Tablets (landscape), small laptops',
  },
  desktop: {
    min: breakpointValues.lg,
    max: breakpointValues.xl - 1,    // 1024-1279px
    description: 'Desktop computers',
  },
  desktopLarge: {
    min: breakpointValues.xl,
    max: breakpointValues['2xl'] - 1, // 1280-1535px
    description: 'Large desktop screens',
  },
  desktopXL: {
    min: breakpointValues['2xl'],
    max: Infinity,                    // 1536px+
    description: 'Extra large screens',
  },
} as const;

// ============================================================================
// MEDIA QUERIES
// ============================================================================

/**
 * CSS media query strings for use in styled-components or CSS-in-JS
 */
export const mediaQueries = {
  // Min-width queries (mobile-first)
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,

  // Max-width queries (desktop-first, use sparingly)
  maxSm: `@media (max-width: ${breakpointValues.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpointValues.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpointValues.lg - 1}px)`,
  maxXl: `@media (max-width: ${breakpointValues.xl - 1}px)`,
  max2xl: `@media (max-width: ${breakpointValues['2xl'] - 1}px)`,

  // Range queries
  mobileOnly: `@media (max-width: ${breakpointValues.sm - 1}px)`,
  tabletOnly: `@media (min-width: ${breakpoints.sm}) and (max-width: ${breakpointValues.md - 1}px)`,
  desktopOnly: `@media (min-width: ${breakpoints.lg})`,

  // Special queries
  touchDevice: '@media (hover: none) and (pointer: coarse)',
  hoverDevice: '@media (hover: hover) and (pointer: fine)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',
  highContrast: '@media (prefers-contrast: high)',
  print: '@media print',
} as const;

// ============================================================================
// CONTAINER QUERIES (experimental)
// ============================================================================

/**
 * Container query breakpoints for component-level responsiveness
 */
export const containerQueries = {
  xs: '@container (min-width: 20rem)',    // 320px
  sm: '@container (min-width: 24rem)',    // 384px
  md: '@container (min-width: 28rem)',    // 448px
  lg: '@container (min-width: 32rem)',    // 512px
  xl: '@container (min-width: 36rem)',    // 576px
  '2xl': '@container (min-width: 42rem)', // 672px
} as const;

// ============================================================================
// TAILWIND RESPONSIVE PATTERNS
// ============================================================================

/**
 * Common responsive Tailwind class patterns
 */
export const responsivePatterns = {
  // Show/Hide patterns
  showOnMobile: 'block md:hidden',
  hideOnMobile: 'hidden md:block',
  showOnTablet: 'hidden md:block lg:hidden',
  showOnDesktop: 'hidden lg:block',

  // Flex direction
  stackOnMobile: 'flex-col md:flex-row',
  rowOnMobile: 'flex-row md:flex-col',

  // Text alignment
  centerOnMobile: 'text-center md:text-left',
  leftOnDesktop: 'text-center lg:text-left',

  // Grid columns
  grid1to2: 'grid-cols-1 md:grid-cols-2',
  grid1to3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  grid1to4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  grid2to4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',

  // Padding
  paddingResponsive: 'px-4 sm:px-6 lg:px-8',
  paddingYResponsive: 'py-8 md:py-12 lg:py-16',

  // Font sizes
  headingResponsive: 'text-2xl md:text-3xl lg:text-4xl',
  bodyResponsive: 'text-sm md:text-base lg:text-lg',
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if current viewport matches a breakpoint (client-side only)
 */
export function matchesBreakpoint(breakpoint: keyof typeof breakpointValues): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpointValues[breakpoint];
}

/**
 * Get current active breakpoint (client-side only)
 */
export function getCurrentBreakpoint(): keyof typeof breakpoints | 'mobile' {
  if (typeof window === 'undefined') return 'mobile';

  const width = window.innerWidth;

  if (width >= breakpointValues['2xl']) return '2xl';
  if (width >= breakpointValues.xl) return 'xl';
  if (width >= breakpointValues.lg) return 'lg';
  if (width >= breakpointValues.md) return 'md';
  if (width >= breakpointValues.sm) return 'sm';
  return 'mobile';
}

/**
 * Check if device is mobile (client-side only)
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpointValues.md;
}

/**
 * Check if device is tablet (client-side only)
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= breakpointValues.sm && width < breakpointValues.lg;
}

/**
 * Check if device is desktop (client-side only)
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpointValues.lg;
}

/**
 * Get media query string for a breakpoint
 */
export function getMediaQuery(breakpoint: keyof typeof breakpoints): string {
  return mediaQueries[breakpoint];
}

/**
 * Create custom media query with min-width
 */
export function createMinWidthQuery(pixels: number): string {
  return `@media (min-width: ${pixels}px)`;
}

/**
 * Create custom media query with max-width
 */
export function createMaxWidthQuery(pixels: number): string {
  return `@media (max-width: ${pixels}px)`;
}

/**
 * Create range media query
 */
export function createRangeQuery(min: number, max: number): string {
  return `@media (min-width: ${min}px) and (max-width: ${max}px)`;
}

// ============================================================================
// REACT HOOK (for use in components)
// ============================================================================

/**
 * Hook to detect current breakpoint in React components
 * Usage:
 * ```tsx
 * const breakpoint = useBreakpoint();
 * if (breakpoint === 'mobile') { ... }
 * ```
 *
 * Note: This is a utility function. Implement in your codebase:
 * ```tsx
 * import { useState, useEffect } from 'react';
 *
 * export function useBreakpoint() {
 *   const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());
 *
 *   useEffect(() => {
 *     const handleResize = () => setBreakpoint(getCurrentBreakpoint());
 *     window.addEventListener('resize', handleResize);
 *     return () => window.removeEventListener('resize', handleResize);
 *   }, []);
 *
 *   return breakpoint;
 * }
 * ```
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Breakpoint = keyof typeof breakpoints;
export type BreakpointValue = keyof typeof breakpointValues;
export type DeviceCategory = keyof typeof devices;
export type MediaQuery = keyof typeof mediaQueries;
export type ResponsivePattern = keyof typeof responsivePatterns;
