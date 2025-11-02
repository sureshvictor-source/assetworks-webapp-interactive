/**
 * AssetWorks Design System - Blur Tokens
 *
 * Backdrop blur and filter blur utilities for glassmorphism and focus effects.
 * Provides consistent blur effects across all AssetWorks products.
 *
 * @module design-system/blur
 */

// ============================================================================
// BLUR SCALE
// ============================================================================

/**
 * Blur scale in pixels
 * From subtle to very strong blur
 */
export const blur = {
  none: '0px',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
} as const;

export type Blur = keyof typeof blur;

// ============================================================================
// BACKDROP BLUR
// ============================================================================

/**
 * Backdrop blur values for backgrounds
 * Used with backdrop-filter CSS property
 */
export const backdropBlur = {
  none: 'blur(0px)',
  sm: 'blur(4px)',
  DEFAULT: 'blur(8px)',
  md: 'blur(12px)',
  lg: 'blur(16px)',
  xl: 'blur(24px)',
  '2xl': 'blur(40px)',
  '3xl': 'blur(64px)',
} as const;

export type BackdropBlur = keyof typeof backdropBlur;

// ============================================================================
// FILTER BLUR
// ============================================================================

/**
 * Filter blur values for foreground elements
 * Used with filter CSS property
 */
export const filterBlur = {
  none: 'blur(0px)',
  sm: 'blur(4px)',
  DEFAULT: 'blur(8px)',
  md: 'blur(12px)',
  lg: 'blur(16px)',
  xl: 'blur(24px)',
  '2xl': 'blur(40px)',
  '3xl': 'blur(64px)',
} as const;

export type FilterBlur = keyof typeof filterBlur;

// ============================================================================
// SEMANTIC BLUR
// ============================================================================

/**
 * Semantic blur values for common use cases
 */
export const semanticBlur = {
  // Glass effects
  glassSubtle: blur.sm, // 4px - Subtle glass effect
  glassDefault: blur.DEFAULT, // 8px - Default glass effect
  glassMedium: blur.md, // 12px - Medium glass effect
  glassStrong: blur.lg, // 16px - Strong glass effect

  // Overlay effects
  overlaySubtle: blur.DEFAULT, // 8px - Subtle overlay blur
  overlayMedium: blur.md, // 12px - Medium overlay blur
  overlayStrong: blur.lg, // 16px - Strong overlay blur

  // Background blur (for modals, dialogs)
  backgroundModal: blur.md, // 12px - Modal backdrop
  backgroundDrawer: blur.sm, // 4px - Drawer backdrop
  backgroundDropdown: blur.sm, // 4px - Dropdown backdrop

  // Image blur
  imageLoading: blur.xl, // 24px - Image loading state
  imagePlaceholder: blur['2xl'], // 40px - Image placeholder

  // Privacy/redaction
  redacted: blur['3xl'], // 64px - Redacted/private content
  privacyBlur: blur['2xl'], // 40px - Privacy blur
} as const;

export type SemanticBlur = keyof typeof semanticBlur;

// ============================================================================
// BLUR UTILITIES
// ============================================================================

/**
 * Tailwind CSS classes for blur effects
 */
export const blurClasses = {
  // Backdrop blur (for backgrounds)
  backdropNone: 'backdrop-blur-none',
  backdropSm: 'backdrop-blur-sm',
  backdrop: 'backdrop-blur',
  backdropMd: 'backdrop-blur-md',
  backdropLg: 'backdrop-blur-lg',
  backdropXl: 'backdrop-blur-xl',
  backdrop2xl: 'backdrop-blur-2xl',
  backdrop3xl: 'backdrop-blur-3xl',

  // Filter blur (for foreground)
  blurNone: 'blur-none',
  blurSm: 'blur-sm',
  blur: 'blur',
  blurMd: 'blur-md',
  blurLg: 'blur-lg',
  blurXl: 'blur-xl',
  blur2xl: 'blur-2xl',
  blur3xl: 'blur-3xl',

  // Common patterns
  glass: 'backdrop-blur-md bg-white/70',
  glassDark: 'backdrop-blur-md bg-black/30',
  overlay: 'backdrop-blur-sm bg-black/50',
  modal: 'backdrop-blur-md bg-black/80',
} as const;

export type BlurClass = keyof typeof blurClasses;

// ============================================================================
// GLASSMORPHISM BLUR PRESETS
// ============================================================================

/**
 * Complete glassmorphism presets with blur
 */
export const glassBlurPresets = {
  light: {
    backdropFilter: backdropBlur.md,
    background: 'rgba(255, 255, 255, 0.7)',
    className: 'backdrop-blur-md bg-white/70 border border-white/20',
  },
  medium: {
    backdropFilter: backdropBlur.lg,
    background: 'rgba(255, 255, 255, 0.5)',
    className: 'backdrop-blur-lg bg-white/50 border border-white/10',
  },
  dark: {
    backdropFilter: backdropBlur.md,
    background: 'rgba(0, 0, 0, 0.3)',
    className: 'backdrop-blur-md bg-black/30 border border-white/5',
  },
  colored: {
    backdropFilter: backdropBlur.lg,
    background: 'rgba(27, 41, 81, 0.4)', // Primary with opacity
    className: 'backdrop-blur-lg bg-primary/40 border border-white/10',
  },
} as const;

export type GlassBlurPreset = keyof typeof glassBlurPresets;

// ============================================================================
// MODAL/OVERLAY BLUR PRESETS
// ============================================================================

/**
 * Blur presets specifically for modals and overlays
 */
export const overlayBlurPresets = {
  // Modal overlays
  modalLight: {
    backdropFilter: backdropBlur.sm,
    background: 'rgba(0, 0, 0, 0.5)',
    className: 'backdrop-blur-sm bg-black/50',
  },
  modalMedium: {
    backdropFilter: backdropBlur.DEFAULT,
    background: 'rgba(0, 0, 0, 0.7)',
    className: 'backdrop-blur bg-black/70',
  },
  modalDark: {
    backdropFilter: backdropBlur.md,
    background: 'rgba(0, 0, 0, 0.8)',
    className: 'backdrop-blur-md bg-black/80',
  },

  // Drawer overlays
  drawer: {
    backdropFilter: backdropBlur.sm,
    background: 'rgba(0, 0, 0, 0.4)',
    className: 'backdrop-blur-sm bg-black/40',
  },

  // Popover/dropdown overlays (lighter)
  popover: {
    backdropFilter: backdropBlur.none,
    background: 'rgba(0, 0, 0, 0.1)',
    className: 'bg-black/10',
  },
} as const;

export type OverlayBlurPreset = keyof typeof overlayBlurPresets;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get blur value
 */
export function getBlur(key: Blur): string {
  return blur[key];
}

/**
 * Get backdrop blur value
 */
export function getBackdropBlur(key: BackdropBlur): string {
  return backdropBlur[key];
}

/**
 * Get filter blur value
 */
export function getFilterBlur(key: FilterBlur): string {
  return filterBlur[key];
}

/**
 * Get semantic blur value
 */
export function getSemanticBlur(key: SemanticBlur): string {
  return semanticBlur[key];
}

/**
 * Get blur class
 */
export function getBlurClass(key: BlurClass): string {
  return blurClasses[key];
}

/**
 * Get glass blur preset
 */
export function getGlassBlurPreset(key: GlassBlurPreset): typeof glassBlurPresets[GlassBlurPreset] {
  return glassBlurPresets[key];
}

/**
 * Get overlay blur preset
 */
export function getOverlayBlurPreset(
  key: OverlayBlurPreset
): typeof overlayBlurPresets[OverlayBlurPreset] {
  return overlayBlurPresets[key];
}

/**
 * Create custom backdrop filter with blur
 */
export function createBackdropBlur(blurAmount: string): string {
  return `blur(${blurAmount})`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const blurSystem = {
  scale: blur,
  backdrop: backdropBlur,
  filter: filterBlur,
  semantic: semanticBlur,
  classes: blurClasses,
  glass: glassBlurPresets,
  overlay: overlayBlurPresets,
} as const;
