/**
 * AssetWorks Design System - Opacity Tokens
 *
 * Opacity scale and semantic values for transparency effects.
 * Provides consistent opacity levels across all AssetWorks products.
 *
 * @module design-system/opacity
 */

// ============================================================================
// OPACITY SCALE
// ============================================================================

/**
 * Opacity scale from 0% to 100%
 * Increments of 5% for fine-grained control
 */
export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  15: '0.15',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  35: '0.35',
  40: '0.4',
  45: '0.45',
  50: '0.5',
  55: '0.55',
  60: '0.6',
  65: '0.65',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  85: '0.85',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

export type Opacity = keyof typeof opacity;

// ============================================================================
// SEMANTIC OPACITY
// ============================================================================

/**
 * Semantic opacity values for common use cases
 */
export const semanticOpacity = {
  // Disabled states
  disabled: opacity[40], // 40% - Elements that cannot be interacted with
  disabledSubtle: opacity[20], // 20% - Very subtle disabled state

  // Hover & interactive states
  hover: opacity[90], // 90% - Hover state reduction
  hoverStrong: opacity[80], // 80% - Strong hover effect
  pressed: opacity[70], // 70% - Active/pressed state

  // Overlay backgrounds
  overlay: opacity[80], // 80% - Modal/dialog overlays
  overlayLight: opacity[50], // 50% - Light overlay
  overlayDark: opacity[90], // 90% - Dark overlay

  // Loading states
  loading: opacity[60], // 60% - Loading elements
  skeleton: opacity[10], // 10% - Skeleton placeholders

  // Focus states
  focus: opacity[20], // 20% - Focus ring background
  focusVisible: opacity[15], // 15% - Visible focus indicator

  // Dividers & borders
  divider: opacity[10], // 10% - Subtle dividers
  dividerStrong: opacity[20], // 20% - More prominent dividers

  // Backgrounds
  backgroundSubtle: opacity[5], // 5% - Very subtle backgrounds
  backgroundMedium: opacity[10], // 10% - Medium backgrounds
  backgroundStrong: opacity[20], // 20% - Strong backgrounds

  // Shadows & depth
  shadowSubtle: opacity[5], // 5% - Very subtle shadows
  shadowMedium: opacity[10], // 10% - Medium shadows
  shadowStrong: opacity[20], // 20% - Strong shadows

  // Images & media
  imagePlaceholder: opacity[10], // 10% - Image loading placeholder
  videoOverlay: opacity[30], // 30% - Video player overlay

  // Tooltips & popovers
  tooltip: opacity[95], // 95% - Tooltip backgrounds
  popover: opacity[100], // 100% - Popover backgrounds

  // Badges & indicators
  badgeBackground: opacity[10], // 10% - Badge background tint
  indicatorBackground: opacity[20], // 20% - Status indicator background

  // Glass effects
  glassLight: opacity[70], // 70% - Light glass effect
  glassMedium: opacity[50], // 50% - Medium glass effect
  glassDark: opacity[30], // 30% - Dark glass effect

  // Full visibility
  visible: opacity[100], // 100% - Fully visible
  invisible: opacity[0], // 0% - Fully invisible
} as const;

export type SemanticOpacity = keyof typeof semanticOpacity;

// ============================================================================
// OPACITY UTILITIES
// ============================================================================

/**
 * Tailwind CSS classes for opacity
 */
export const opacityClasses = {
  // Disabled states
  disabled: 'opacity-40',
  disabledSubtle: 'opacity-20',

  // Hover states (with hover: prefix)
  hover: 'hover:opacity-90',
  hoverStrong: 'hover:opacity-80',

  // Interactive states
  pressed: 'active:opacity-70',
  focus: 'focus:opacity-100',

  // Loading
  loading: 'opacity-60 cursor-wait',
  skeleton: 'opacity-10 animate-pulse',

  // Overlay
  overlay: 'opacity-80',
  overlayLight: 'opacity-50',
  overlayDark: 'opacity-90',

  // Full states
  visible: 'opacity-100',
  invisible: 'opacity-0',
  hidden: 'opacity-0 pointer-events-none',

  // Transitions
  fadeIn: 'opacity-0 animate-fade-in',
  fadeOut: 'opacity-100 animate-fade-out',
} as const;

export type OpacityClass = keyof typeof opacityClasses;

// ============================================================================
// OPACITY GROUPS (for state combinations)
// ============================================================================

/**
 * Common opacity combinations for different UI states
 */
export const opacityStates = {
  // Default state
  default: {
    rest: opacity[100],
    hover: opacity[90],
    active: opacity[80],
    disabled: opacity[40],
  },

  // Subtle state (for secondary elements)
  subtle: {
    rest: opacity[70],
    hover: opacity[80],
    active: opacity[60],
    disabled: opacity[30],
  },

  // Ghost state (for ghost buttons, minimal elements)
  ghost: {
    rest: opacity[0],
    hover: opacity[10],
    active: opacity[20],
    disabled: opacity[0],
  },

  // Overlay state (for modals, drawers)
  overlay: {
    light: opacity[50],
    medium: opacity[70],
    dark: opacity[90],
  },

  // Loading state
  loading: {
    primary: opacity[60],
    secondary: opacity[40],
    placeholder: opacity[10],
  },
} as const;

export type OpacityState = keyof typeof opacityStates;

// ============================================================================
// GLASSMORPHISM PRESETS
// ============================================================================

/**
 * Glassmorphism (frosted glass) effect presets
 * Combines opacity with backdrop blur
 */
export const glassPresets = {
  light: {
    background: `rgba(255, 255, 255, ${opacity[70]})`,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  medium: {
    background: `rgba(255, 255, 255, ${opacity[50]})`,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  dark: {
    background: `rgba(0, 0, 0, ${opacity[30]})`,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  colored: {
    background: `rgba(27, 41, 81, ${opacity[40]})`, // Primary color with opacity
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
} as const;

export type GlassPreset = keyof typeof glassPresets;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get opacity value
 */
export function getOpacity(key: Opacity | SemanticOpacity): string {
  if (key in opacity) {
    return opacity[key as Opacity];
  }
  return semanticOpacity[key as SemanticOpacity];
}

/**
 * Convert opacity percentage (0-100) to decimal value
 */
export function percentToOpacity(percent: number): string {
  const clamped = Math.max(0, Math.min(100, percent));
  return (clamped / 100).toFixed(2);
}

/**
 * Convert decimal opacity (0-1) to percentage
 */
export function opacityToPercent(opacity: number): number {
  const clamped = Math.max(0, Math.min(1, opacity));
  return Math.round(clamped * 100);
}

/**
 * Get opacity class for Tailwind
 */
export function getOpacityClass(key: OpacityClass): string {
  return opacityClasses[key];
}

/**
 * Get glass preset styles
 */
export function getGlassPreset(key: GlassPreset): typeof glassPresets[GlassPreset] {
  return glassPresets[key];
}

/**
 * Create custom RGBA color with opacity
 */
export function withOpacity(rgb: string, opacityValue: Opacity | SemanticOpacity): string {
  const opacityNum = getOpacity(opacityValue);
  // Extract RGB values from hex or rgb string
  const isHex = rgb.startsWith('#');

  if (isHex) {
    const hex = rgb.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacityNum})`;
  }

  // Assume RGB format
  return rgb.replace('rgb(', 'rgba(').replace(')', `, ${opacityNum})`);
}

// ============================================================================
// EXPORTS
// ============================================================================

export const opacitySystem = {
  scale: opacity,
  semantic: semanticOpacity,
  classes: opacityClasses,
  states: opacityStates,
  glass: glassPresets,
} as const;
