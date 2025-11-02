/**
 * AssetWorks Design System
 *
 * Centralized design system for consistent styling across all AssetWorks products.
 * Provides design tokens for colors, typography, spacing, shadows, animations, and breakpoints.
 *
 * @module design-system
 * @version 1.0.0
 *
 * ## Usage
 *
 * ```tsx
 * import { colors, typography, spacing } from '@/lib/design-system';
 *
 * // Use color tokens
 * const primaryColor = colors.primary.DEFAULT; // '#1B2951'
 *
 * // Use typography
 * const headingClasses = typography.typographyClasses.h1;
 *
 * // Use spacing
 * const cardPadding = spacing.semanticSpacing.cardPadding;
 * ```
 *
 * ## Design Tokens
 *
 * - **Colors**: Brand colors, semantic colors, UI colors
 * - **Typography**: Font families, sizes, weights, heading styles
 * - **Spacing**: 8px grid system, semantic spacing, border radius
 * - **Shadows**: Box shadows, elevation, focus rings
 * - **Animations**: Durations, easings, keyframes, transitions
 * - **Breakpoints**: Responsive breakpoints, media queries
 *
 * @see {@link ./colors.ts} for color tokens
 * @see {@link ./typography.ts} for typography tokens
 * @see {@link ./spacing.ts} for spacing tokens
 * @see {@link ./shadows.ts} for shadow tokens
 * @see {@link ./animations.ts} for animation tokens
 * @see {@link ./breakpoints.ts} for breakpoint tokens
 */

// ============================================================================
// COLOR SYSTEM
// ============================================================================

export {
  colors,
  cssVariables,
  darkModeColors,
  getColor,
  getColorShades,
  type ColorKey,
  type ColorShade,
} from './colors';

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  headings,
  bodyText,
  display,
  typographyClasses,
  responsiveHeadings,
  getFontSize,
  getHeadingStyle,
  getFontFamily,
  type FontSize,
  type FontWeight,
  type LineHeight,
  type HeadingLevel,
  type TypographyClass,
} from './typography';

// ============================================================================
// SPACING
// ============================================================================

export {
  spacing,
  semanticSpacing,
  responsiveSpacing,
  borderRadius,
  containerWidth,
  zIndex,
  spacingClasses,
  gridPatterns,
  flexPatterns,
  getSpacing,
  getSemanticSpacing,
  getBorderRadius,
  getZIndex,
  type SpacingKey,
  type SemanticSpacingKey,
  type BorderRadiusKey,
  type ZIndexKey,
  type GridPattern,
  type FlexPattern,
} from './spacing';

// ============================================================================
// SHADOWS
// ============================================================================

export {
  shadows,
  coloredShadows,
  elevation,
  semanticShadows,
  glow,
  dropShadow,
  shadowClasses,
  focusRing,
  focusClasses,
  getShadow,
  getElevation,
  getSemanticShadow,
  getColoredShadow,
  getFocusRing,
  type ShadowKey,
  type ElevationLevel,
  type SemanticShadowKey,
  type ColoredShadowKey,
  type FocusRingKey,
} from './shadows';

// ============================================================================
// ANIMATIONS
// ============================================================================

export {
  duration,
  easing,
  transition,
  keyframes,
  animations,
  animationClasses,
  hoverEffects,
  loadingStates,
  modalAnimations,
  dropdownAnimations,
  tooltipAnimations,
  framerVariants,
  getDuration,
  getEasing,
  createTransition,
  combineTransitions,
  type DurationKey,
  type EasingKey,
  type AnimationKey,
  type KeyframeKey,
  type HoverEffect,
} from './animations';

// ============================================================================
// BREAKPOINTS
// ============================================================================

export {
  breakpoints,
  breakpointValues,
  devices,
  mediaQueries,
  containerQueries,
  responsivePatterns,
  matchesBreakpoint,
  getCurrentBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getMediaQuery,
  createMinWidthQuery,
  createMaxWidthQuery,
  createRangeQuery,
  type Breakpoint,
  type BreakpointValue,
  type DeviceCategory,
  type MediaQuery,
  type ResponsivePattern,
} from './breakpoints';

// ============================================================================
// DESIGN SYSTEM METADATA
// ============================================================================

/**
 * Design system version and metadata
 */
export const designSystem = {
  version: '1.0.0',
  name: 'AssetWorks Design System',
  description: 'Centralized design system for AssetWorks products',
  lastUpdated: '2025-11-02',
  author: 'AssetWorks Team',
} as const;

// ============================================================================
// UTILITY HELPERS
// ============================================================================

/**
 * Combine Tailwind classes with proper deduplication
 * Uses the cn() utility from lib/utils.ts
 */
export { cn } from '../utils';

// ============================================================================
// QUICK ACCESS PRESETS
// ============================================================================

/**
 * Common component styling presets
 * Ready-to-use Tailwind class combinations
 */
export const componentPresets = {
  button: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm px-4 py-2 rounded-md font-medium transition-colors',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm px-4 py-2 rounded-md font-medium transition-colors',
    outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium transition-colors',
    ghost: 'hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium transition-colors',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm px-4 py-2 rounded-md font-medium transition-colors',
  },

  card: {
    default: 'bg-card text-card-foreground rounded-xl shadow p-6 border border-border',
    hover: 'bg-card text-card-foreground rounded-xl shadow hover:shadow-lg p-6 border border-border transition-shadow',
    elevated: 'bg-card text-card-foreground rounded-xl shadow-lg p-6 border border-border',
  },

  input: {
    default: 'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  },

  modal: {
    overlay: 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
    content: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-8 shadow-xl rounded-xl',
  },
} as const;

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

/**
 * Note: Import individual tokens directly for theme configuration
 *
 * Example:
 * ```ts
 * import { colors, spacing, shadows } from '@/lib/design-system';
 *
 * const theme = {
 *   colors,
 *   spacing,
 *   shadows,
 *   // ...other tokens
 * };
 * ```
 */
