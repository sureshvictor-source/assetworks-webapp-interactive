/**
 * AssetWorks Design System - Border Tokens
 *
 * Comprehensive border utilities for widths, styles, and colors.
 * Provides consistent border styling across all AssetWorks products.
 *
 * @module design-system/borders
 */

// ============================================================================
// BORDER WIDTHS
// ============================================================================

/**
 * Border width scale
 * From hairline to extra thick borders
 */
export const borderWidth = {
  0: '0px',
  DEFAULT: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

export type BorderWidth = keyof typeof borderWidth;

// ============================================================================
// BORDER STYLES
// ============================================================================

/**
 * Border style variants
 * All CSS border-style values
 */
export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  none: 'none',
} as const;

export type BorderStyle = keyof typeof borderStyle;

// ============================================================================
// SEMANTIC BORDER COLORS
// ============================================================================

/**
 * Semantic border colors
 * Mapped to CSS variables for theme support
 */
export const borderColor = {
  DEFAULT: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  accent: 'hsl(var(--accent))',
  muted: 'hsl(var(--muted))',
  success: 'hsl(var(--success))',
  warning: 'hsl(var(--warning))',
  error: 'hsl(var(--error))',
  info: 'hsl(var(--info))',
  transparent: 'transparent',
} as const;

export type BorderColor = keyof typeof borderColor;

// ============================================================================
// SEMANTIC BORDERS
// ============================================================================

/**
 * Complete border definitions combining width, style, and color
 */
export const semanticBorders = {
  // Card borders
  card: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.DEFAULT}`,
  cardHover: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.primary}`,

  // Input borders
  input: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.input}`,
  inputFocus: `${borderWidth[2]} ${borderStyle.solid} ${borderColor.ring}`,
  inputError: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.error}`,
  inputSuccess: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.success}`,

  // Button borders
  buttonOutline: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.primary}`,
  buttonGhost: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.transparent}`,

  // Status borders
  success: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.success}`,
  warning: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.warning}`,
  error: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.error}`,
  info: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.info}`,

  // Divider borders
  divider: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.DEFAULT}`,
  dividerDashed: `${borderWidth.DEFAULT} ${borderStyle.dashed} ${borderColor.muted}`,

  // Focus borders
  focus: `${borderWidth[2]} ${borderStyle.solid} ${borderColor.ring}`,
  focusVisible: `${borderWidth[2]} ${borderStyle.solid} ${borderColor.primary}`,

  // Table borders
  table: `${borderWidth.DEFAULT} ${borderStyle.solid} ${borderColor.DEFAULT}`,

  // None
  none: 'none',
} as const;

export type SemanticBorder = keyof typeof semanticBorders;

// ============================================================================
// OUTLINE STYLES (for accessibility)
// ============================================================================

/**
 * Outline utilities for focus states and accessibility
 */
export const outline = {
  none: 'none',
  DEFAULT: `${borderWidth[2]} solid ${borderColor.ring}`,
  offset: `${borderWidth[2]} solid ${borderColor.ring}`,
  dashed: `${borderWidth[2]} dashed ${borderColor.ring}`,
  dotted: `${borderWidth[2]} dotted ${borderColor.ring}`,
} as const;

export type Outline = keyof typeof outline;

/**
 * Outline offset values (distance from element)
 */
export const outlineOffset = {
  0: '0px',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

export type OutlineOffset = keyof typeof outlineOffset;

// ============================================================================
// BORDER UTILITIES
// ============================================================================

/**
 * Tailwind CSS classes for common border patterns
 */
export const borderClasses = {
  // Basic borders
  default: 'border border-border',
  input: 'border border-input',
  primary: 'border border-primary',

  // Border sides
  top: 'border-t',
  right: 'border-r',
  bottom: 'border-b',
  left: 'border-l',
  horizontal: 'border-x',
  vertical: 'border-y',

  // Border widths
  thin: 'border',
  thick: 'border-2',
  thicker: 'border-4',
  none: 'border-0',

  // Border styles
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',

  // Interactive borders
  hover: 'hover:border-primary',
  focus: 'focus:border-ring focus:border-2',
  disabled: 'border-muted',

  // Status borders
  success: 'border-success',
  warning: 'border-warning',
  error: 'border-error',
  info: 'border-info',
} as const;

export type BorderClass = keyof typeof borderClasses;

// ============================================================================
// DIVIDER PATTERNS
// ============================================================================

/**
 * Pre-built divider patterns for sections and content
 */
export const dividerPatterns = {
  horizontal: 'border-t border-border w-full',
  vertical: 'border-l border-border h-full',
  horizontalDashed: 'border-t border-dashed border-muted w-full',
  verticalDashed: 'border-l border-dashed border-muted h-full',
  horizontalThick: 'border-t-2 border-border w-full',
  verticalThick: 'border-l-2 border-border h-full',
  horizontalAccent: 'border-t-2 border-primary w-full',
  verticalAccent: 'border-l-2 border-primary h-full',
} as const;

export type DividerPattern = keyof typeof dividerPatterns;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get border width value
 */
export function getBorderWidth(key: BorderWidth): string {
  return borderWidth[key];
}

/**
 * Get border style value
 */
export function getBorderStyle(key: BorderStyle): string {
  return borderStyle[key];
}

/**
 * Get border color value
 */
export function getBorderColor(key: BorderColor): string {
  return borderColor[key];
}

/**
 * Get semantic border value
 */
export function getSemanticBorder(key: SemanticBorder): string {
  return semanticBorders[key];
}

/**
 * Create custom border
 */
export function createBorder(
  width: BorderWidth = 'DEFAULT',
  style: BorderStyle = 'solid',
  color: BorderColor = 'DEFAULT'
): string {
  return `${borderWidth[width]} ${borderStyle[style]} ${borderColor[color]}`;
}

/**
 * Get divider pattern class
 */
export function getDividerPattern(key: DividerPattern): string {
  return dividerPatterns[key];
}

// ============================================================================
// EXPORTS
// ============================================================================

export const borders = {
  width: borderWidth,
  style: borderStyle,
  color: borderColor,
  semantic: semanticBorders,
  outline,
  outlineOffset,
  classes: borderClasses,
  dividers: dividerPatterns,
} as const;
