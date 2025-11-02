/**
 * AssetWorks Design System - Container Tokens
 *
 * Container utilities for consistent layout and content width management.
 * Provides responsive containers and padding patterns across all AssetWorks products.
 *
 * @module design-system/containers
 */

import { spacing } from './spacing';
import { breakpoints } from './breakpoints';

// ============================================================================
// CONTAINER MAX WIDTHS
// ============================================================================

/**
 * Container max-width values matching breakpoints
 */
export const containerMaxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  full: '100%',
  none: 'none',
} as const;

export type ContainerMaxWidth = keyof typeof containerMaxWidth;

// ============================================================================
// CONTAINER PADDING
// ============================================================================

/**
 * Responsive container padding values
 */
export const containerPadding = {
  none: spacing[0],
  xs: spacing[2], // 8px
  sm: spacing[4], // 16px
  md: spacing[6], // 24px
  lg: spacing[8], // 32px
  xl: spacing[12], // 48px
  '2xl': spacing[16], // 64px
} as const;

export type ContainerPadding = keyof typeof containerPadding;

// ============================================================================
// SEMANTIC CONTAINERS
// ============================================================================

/**
 * Semantic container configurations for common use cases
 */
export const semanticContainers = {
  // Page containers
  page: {
    maxWidth: containerMaxWidth.xl,
    padding: containerPadding.md,
    className: 'container mx-auto px-6 max-w-screen-xl',
  },

  pageWide: {
    maxWidth: containerMaxWidth['2xl'],
    padding: containerPadding.lg,
    className: 'container mx-auto px-8 max-w-screen-2xl',
  },

  pageNarrow: {
    maxWidth: containerMaxWidth.lg,
    padding: containerPadding.md,
    className: 'container mx-auto px-6 max-w-screen-lg',
  },

  // Content containers
  content: {
    maxWidth: containerMaxWidth.md,
    padding: containerPadding.sm,
    className: 'container mx-auto px-4 max-w-screen-md',
  },

  contentWide: {
    maxWidth: containerMaxWidth.lg,
    padding: containerPadding.md,
    className: 'container mx-auto px-6 max-w-screen-lg',
  },

  // Section containers
  section: {
    maxWidth: containerMaxWidth.xl,
    paddingY: spacing[20], // 80px vertical
    paddingX: containerPadding.md,
    className: 'container mx-auto px-6 py-20 max-w-screen-xl',
  },

  sectionNarrow: {
    maxWidth: containerMaxWidth.lg,
    paddingY: spacing[16], // 64px vertical
    paddingX: containerPadding.md,
    className: 'container mx-auto px-6 py-16 max-w-screen-lg',
  },

  // Card containers
  card: {
    padding: containerPadding.md,
    className: 'p-6',
  },

  cardLarge: {
    padding: containerPadding.lg,
    className: 'p-8',
  },

  cardSmall: {
    padding: containerPadding.sm,
    className: 'p-4',
  },

  // Modal containers
  modal: {
    maxWidth: containerMaxWidth.md,
    padding: containerPadding.lg,
    className: 'max-w-md p-8',
  },

  modalLarge: {
    maxWidth: containerMaxWidth.xl,
    padding: containerPadding.lg,
    className: 'max-w-xl p-8',
  },

  // Dashboard containers
  dashboard: {
    maxWidth: containerMaxWidth.full,
    padding: containerPadding.md,
    className: 'w-full px-6',
  },

  // Prose/article containers (for long-form content)
  prose: {
    maxWidth: '65ch', // ~65 characters per line for readability
    padding: containerPadding.md,
    className: 'max-w-prose mx-auto px-6',
  },
} as const;

export type SemanticContainer = keyof typeof semanticContainers;

// ============================================================================
// RESPONSIVE CONTAINER CONFIGURATIONS
// ============================================================================

/**
 * Responsive container configurations with breakpoint-specific widths
 */
export const responsiveContainers = {
  // Default responsive container
  default: {
    sm: containerMaxWidth.sm,
    md: containerMaxWidth.md,
    lg: containerMaxWidth.lg,
    xl: containerMaxWidth.xl,
    '2xl': containerMaxWidth['2xl'],
    className: 'container mx-auto px-4 sm:px-6 lg:px-8',
  },

  // Narrow responsive container
  narrow: {
    sm: containerMaxWidth.sm,
    md: containerMaxWidth.md,
    lg: containerMaxWidth.lg,
    className: 'container mx-auto px-4 sm:px-6 max-w-screen-lg',
  },

  // Wide responsive container
  wide: {
    sm: containerMaxWidth.sm,
    md: containerMaxWidth.md,
    lg: containerMaxWidth.lg,
    xl: containerMaxWidth.xl,
    '2xl': containerMaxWidth['2xl'],
    '3xl': containerMaxWidth['3xl'],
    className: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-3xl',
  },

  // Fluid container (no max-width)
  fluid: {
    width: '100%',
    className: 'w-full px-4 sm:px-6 lg:px-8',
  },
} as const;

export type ResponsiveContainer = keyof typeof responsiveContainers;

// ============================================================================
// CONTAINER UTILITIES (Tailwind classes)
// ============================================================================

/**
 * Tailwind CSS classes for containers
 */
export const containerClasses = {
  // Base container
  base: 'container mx-auto',
  fluid: 'w-full',

  // Max widths
  maxSm: 'max-w-screen-sm',
  maxMd: 'max-w-screen-md',
  maxLg: 'max-w-screen-lg',
  maxXl: 'max-w-screen-xl',
  max2xl: 'max-w-screen-2xl',
  maxFull: 'max-w-full',
  maxNone: 'max-w-none',

  // Padding
  px4: 'px-4',
  px6: 'px-6',
  px8: 'px-8',
  py12: 'py-12',
  py16: 'py-16',
  py20: 'py-20',

  // Responsive padding
  responsivePx: 'px-4 sm:px-6 lg:px-8',
  responsivePy: 'py-8 sm:py-12 lg:py-16',

  // Centering
  center: 'mx-auto',
  centerX: 'mx-auto',
  centerY: 'my-auto',

  // Common combinations
  default: 'container mx-auto px-4 sm:px-6 lg:px-8',
  page: 'container mx-auto px-6 max-w-screen-xl',
  section: 'container mx-auto px-6 py-20',
  card: 'p-6',
  modal: 'max-w-md p-8',
} as const;

export type ContainerClass = keyof typeof containerClasses;

// ============================================================================
// SECTION SPACING
// ============================================================================

/**
 * Vertical spacing for sections
 */
export const sectionSpacing = {
  xs: {
    paddingY: spacing[8], // 32px
    className: 'py-8',
  },
  sm: {
    paddingY: spacing[12], // 48px
    className: 'py-12',
  },
  md: {
    paddingY: spacing[16], // 64px
    className: 'py-16',
  },
  lg: {
    paddingY: spacing[20], // 80px
    className: 'py-20',
  },
  xl: {
    paddingY: spacing[24], // 96px
    className: 'py-24',
  },
  '2xl': {
    paddingY: spacing[32], // 128px
    className: 'py-32',
  },
} as const;

export type SectionSpacing = keyof typeof sectionSpacing;

// ============================================================================
// CONTENT WIDTH PRESETS
// ============================================================================

/**
 * Content width presets for different content types
 */
export const contentWidths = {
  // Prose (articles, blog posts)
  prose: '65ch', // ~65 characters
  proseNarrow: '55ch',
  proseWide: '75ch',

  // Forms
  formNarrow: '448px', // 28rem
  form: '512px', // 32rem
  formWide: '640px', // 40rem

  // Modals/dialogs
  modalSm: '384px', // 24rem
  modal: '512px', // 32rem
  modalLg: '640px', // 40rem
  modalXl: '768px', // 48rem

  // Cards
  cardNarrow: '320px',
  card: '384px',
  cardWide: '448px',

  // Sidebars
  sidebarCollapsed: '64px',
  sidebar: '240px',
  sidebarWide: '320px',
} as const;

export type ContentWidth = keyof typeof contentWidths;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get container max width
 */
export function getContainerMaxWidth(key: ContainerMaxWidth): string {
  return containerMaxWidth[key];
}

/**
 * Get container padding
 */
export function getContainerPadding(key: ContainerPadding): string {
  return containerPadding[key];
}

/**
 * Get semantic container
 */
export function getSemanticContainer(key: SemanticContainer): typeof semanticContainers[SemanticContainer] {
  return semanticContainers[key];
}

/**
 * Get responsive container
 */
export function getResponsiveContainer(
  key: ResponsiveContainer
): typeof responsiveContainers[ResponsiveContainer] {
  return responsiveContainers[key];
}

/**
 * Get container class
 */
export function getContainerClass(key: ContainerClass): string {
  return containerClasses[key];
}

/**
 * Get section spacing
 */
export function getSectionSpacing(key: SectionSpacing): typeof sectionSpacing[SectionSpacing] {
  return sectionSpacing[key];
}

/**
 * Get content width
 */
export function getContentWidth(key: ContentWidth): string {
  return contentWidths[key];
}

/**
 * Create custom container with max-width and padding
 */
export function createContainer(maxWidth: string, padding: string): {
  maxWidth: string;
  padding: string;
} {
  return { maxWidth, padding };
}

/**
 * Build container class string
 */
export function buildContainerClass(options: {
  maxWidth?: ContainerMaxWidth;
  padding?: ContainerPadding;
  centered?: boolean;
}): string {
  const classes: string[] = [];

  if (options.centered) {
    classes.push('mx-auto');
  }

  if (options.maxWidth) {
    const maxWidthClass = `max-w-screen-${options.maxWidth}`;
    classes.push(maxWidthClass);
  }

  if (options.padding) {
    const paddingValue = containerPadding[options.padding];
    // Convert rem to Tailwind class (simplified)
    const paddingClass = `px-${options.padding}`;
    classes.push(paddingClass);
  }

  return classes.join(' ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export const containers = {
  maxWidth: containerMaxWidth,
  padding: containerPadding,
  semantic: semanticContainers,
  responsive: responsiveContainers,
  classes: containerClasses,
  sectionSpacing,
  contentWidths,
} as const;
