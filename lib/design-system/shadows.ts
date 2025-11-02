/**
 * AssetWorks Design System - Shadow Tokens
 *
 * Centralized shadow system for depth and elevation.
 * Creates visual hierarchy through shadow layers.
 *
 * @module design-system/shadows
 */

// ============================================================================
// BOX SHADOWS
// ============================================================================

/**
 * Shadow scale from subtle to dramatic
 * Based on Material Design elevation principles
 */
export const shadows = {
  // No shadow
  none: 'none',

  // Subtle shadow for slight elevation
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  // Base shadow for cards and panels
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',

  // Medium shadow for hover states
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

  // Large shadow for dropdowns and popovers
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  // Extra large shadow for modals
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Maximum shadow for overlays
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Inner shadow for inset elements
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ============================================================================
// COLORED SHADOWS
// ============================================================================

/**
 * Shadows with brand colors for emphasis
 */
export const coloredShadows = {
  primary: '0 4px 14px 0 rgba(27, 41, 81, 0.15)',        // Navy
  secondary: '0 4px 14px 0 rgba(108, 123, 149, 0.15)',   // Blue-gray
  accent: '0 4px 14px 0 rgba(64, 93, 128, 0.15)',        // Deep blue
  success: '0 4px 14px 0 rgba(16, 185, 129, 0.15)',      // Green
  warning: '0 4px 14px 0 rgba(245, 158, 11, 0.15)',      // Amber
  error: '0 4px 14px 0 rgba(239, 68, 68, 0.15)',         // Red
  info: '0 4px 14px 0 rgba(59, 130, 246, 0.15)',         // Blue
} as const;

// ============================================================================
// ELEVATION SYSTEM
// ============================================================================

/**
 * Elevation levels following Material Design principles
 * Higher numbers = higher elevation = larger shadow
 */
export const elevation = {
  0: 'none',
  1: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  2: '0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  3: '0 6px 12px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.06)',
  4: '0 10px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.06)',
  5: '0 15px 30px 0 rgba(0, 0, 0, 0.1), 0 8px 16px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ============================================================================
// SEMANTIC SHADOWS
// ============================================================================

/**
 * Named shadows for specific UI elements
 */
export const semanticShadows = {
  // Component shadows
  card: shadows.DEFAULT,
  cardHover: shadows.lg,
  button: shadows.sm,
  buttonHover: shadows.md,
  dropdown: shadows.lg,
  modal: shadows.xl,
  tooltip: shadows.md,
  popover: shadows.lg,

  // Input shadows
  input: shadows.sm,
  inputFocus: '0 0 0 3px rgba(27, 41, 81, 0.1)',

  // Navigation shadows
  navbar: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  sidebar: '2px 0 4px 0 rgba(0, 0, 0, 0.05)',

  // Overlay shadows
  overlay: shadows['2xl'],
  backdropBlur: '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
} as const;

// ============================================================================
// GLOW EFFECTS
// ============================================================================

/**
 * Glowing shadows for interactive states
 */
export const glow = {
  primary: '0 0 20px rgba(27, 41, 81, 0.3)',
  secondary: '0 0 20px rgba(108, 123, 149, 0.3)',
  accent: '0 0 20px rgba(64, 93, 128, 0.3)',
  success: '0 0 20px rgba(16, 185, 129, 0.3)',
  warning: '0 0 20px rgba(245, 158, 11, 0.3)',
  error: '0 0 20px rgba(239, 68, 68, 0.3)',
  info: '0 0 20px rgba(59, 130, 246, 0.3)',
} as const;

// ============================================================================
// DROP SHADOWS (for SVG/Images)
// ============================================================================

/**
 * Drop shadow filters for SVG elements
 */
export const dropShadow = {
  sm: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
  DEFAULT: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  md: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
  lg: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
  xl: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.15))',
} as const;

// ============================================================================
// TAILWIND CLASS UTILITIES
// ============================================================================

/**
 * Pre-built Tailwind shadow classes
 */
export const shadowClasses = {
  // Standard shadows
  none: 'shadow-none',
  sm: 'shadow-sm',
  base: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',

  // Hover effects
  hoverSm: 'shadow-sm hover:shadow-md transition-shadow',
  hoverBase: 'shadow hover:shadow-lg transition-shadow',
  hoverLg: 'shadow-lg hover:shadow-xl transition-shadow',

  // Component-specific
  card: 'shadow hover:shadow-lg transition-shadow',
  button: 'shadow-sm hover:shadow-md transition-shadow',
  modal: 'shadow-2xl',
  dropdown: 'shadow-lg',
} as const;

// ============================================================================
// FOCUS RING SHADOWS
// ============================================================================

/**
 * Focus ring styles for accessibility
 */
export const focusRing = {
  // Standard focus rings
  default: '0 0 0 3px rgba(27, 41, 81, 0.1)',
  primary: '0 0 0 3px rgba(27, 41, 81, 0.15)',
  secondary: '0 0 0 3px rgba(108, 123, 149, 0.15)',
  accent: '0 0 0 3px rgba(64, 93, 128, 0.15)',
  destructive: '0 0 0 3px rgba(220, 53, 69, 0.15)',

  // Offset focus rings (with background color gap)
  offset: '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(27, 41, 81, 0.2)',
} as const;

// ============================================================================
// TAILWIND FOCUS CLASSES
// ============================================================================

export const focusClasses = {
  default: 'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  primary: 'focus:ring-2 focus:ring-primary focus:ring-offset-2',
  secondary: 'focus:ring-2 focus:ring-secondary focus:ring-offset-2',
  accent: 'focus:ring-2 focus:ring-accent focus:ring-offset-2',
  destructive: 'focus:ring-2 focus:ring-destructive focus:ring-offset-2',
  none: 'focus:outline-none',
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get shadow value by key
 */
export function getShadow(key: keyof typeof shadows): string {
  return shadows[key];
}

/**
 * Get elevation shadow
 */
export function getElevation(level: keyof typeof elevation): string {
  return elevation[level];
}

/**
 * Get semantic shadow
 */
export function getSemanticShadow(key: keyof typeof semanticShadows): string {
  return semanticShadows[key];
}

/**
 * Get colored shadow
 */
export function getColoredShadow(key: keyof typeof coloredShadows): string {
  return coloredShadows[key];
}

/**
 * Get focus ring shadow
 */
export function getFocusRing(key: keyof typeof focusRing): string {
  return focusRing[key];
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ShadowKey = keyof typeof shadows;
export type ElevationLevel = keyof typeof elevation;
export type SemanticShadowKey = keyof typeof semanticShadows;
export type ColoredShadowKey = keyof typeof coloredShadows;
export type FocusRingKey = keyof typeof focusRing;
