/**
 * AssetWorks Design System - Transition Tokens
 *
 * Extended transition utilities for smooth animations and interactions.
 * Provides consistent transition effects across all AssetWorks products.
 *
 * @module design-system/transitions
 */

import { duration, easing, type DurationKey, type EasingKey } from './animations';

// ============================================================================
// TRANSITION PROPERTIES
// ============================================================================

/**
 * CSS properties that can be transitioned
 */
export const transitionProperty = {
  none: 'none',
  all: 'all',
  default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  colors: 'background-color, border-color, color, fill, stroke',
  opacity: 'opacity',
  shadow: 'box-shadow',
  transform: 'transform',
  background: 'background-color',
  border: 'border-color',
  width: 'width',
  height: 'height',
  spacing: 'margin, padding',
  layout: 'width, height, margin, padding',
} as const;

export type TransitionProperty = keyof typeof transitionProperty;

// ============================================================================
// COMPLETE TRANSITIONS
// ============================================================================

/**
 * Complete transition definitions with property, duration, and easing
 */
export const transitions = {
  // Default transitions
  default: `${transitionProperty.default} ${duration.md} ${easing.inOut}`,
  fast: `${transitionProperty.default} ${duration.sm} ${easing.inOut}`,
  slow: `${transitionProperty.default} ${duration.lg} ${easing.inOut}`,

  // Color transitions
  colors: `${transitionProperty.colors} ${duration.md} ${easing.inOut}`,
  colorsFast: `${transitionProperty.colors} ${duration.sm} ${easing.inOut}`,
  colorsSlow: `${transitionProperty.colors} ${duration.lg} ${easing.inOut}`,

  // Opacity transitions
  opacity: `${transitionProperty.opacity} ${duration.md} ${easing.inOut}`,
  opacityFast: `${transitionProperty.opacity} ${duration.sm} ${easing.inOut}`,
  opacitySlow: `${transitionProperty.opacity} ${duration.lg} ${easing.inOut}`,

  // Shadow transitions
  shadow: `${transitionProperty.shadow} ${duration.md} ${easing.inOut}`,
  shadowFast: `${transitionProperty.shadow} ${duration.sm} ${easing.inOut}`,
  shadowSlow: `${transitionProperty.shadow} ${duration.lg} ${easing.inOut}`,

  // Transform transitions
  transform: `${transitionProperty.transform} ${duration.md} ${easing.inOut}`,
  transformFast: `${transitionProperty.transform} ${duration.sm} ${easing.inOut}`,
  transformSlow: `${transitionProperty.transform} ${duration.lg} ${easing.inOut}`,
  transformSpring: `${transitionProperty.transform} ${duration.md} ${easing.spring}`,

  // Layout transitions
  layout: `${transitionProperty.layout} ${duration.md} ${easing.inOut}`,
  layoutFast: `${transitionProperty.layout} ${duration.sm} ${easing.inOut}`,
  layoutSlow: `${transitionProperty.layout} ${duration.lg} ${easing.inOut}`,

  // All properties
  all: `${transitionProperty.all} ${duration.md} ${easing.inOut}`,
  allFast: `${transitionProperty.all} ${duration.sm} ${easing.inOut}`,
  allSlow: `${transitionProperty.all} ${duration.lg} ${easing.inOut}`,

  // None
  none: 'none',
} as const;

export type Transition = keyof typeof transitions;

// ============================================================================
// SEMANTIC TRANSITIONS
// ============================================================================

/**
 * Semantic transitions for specific UI patterns
 */
export const semanticTransitions = {
  // Interactive elements
  button: `${transitionProperty.colors} ${duration.sm} ${easing.inOut}, ${transitionProperty.transform} ${duration.sm} ${easing.spring}`,
  buttonHover: `${transitionProperty.all} ${duration.fast} ${easing.out}`,
  link: `${transitionProperty.colors} ${duration.fast} ${easing.inOut}`,

  // Forms
  input: `${transitionProperty.border} ${duration.sm} ${easing.inOut}, ${transitionProperty.shadow} ${duration.sm} ${easing.inOut}`,
  inputFocus: `${transitionProperty.all} ${duration.fast} ${easing.out}`,
  checkbox: `${transitionProperty.all} ${duration.fast} ${easing.spring}`,
  switch: `${transitionProperty.all} ${duration.sm} ${easing.spring}`,

  // Overlays
  modal: `${transitionProperty.opacity} ${duration.md} ${easing.inOut}`,
  modalBackdrop: `${transitionProperty.opacity} ${duration.md} ${easing.in}`,
  drawer: `${transitionProperty.transform} ${duration.md} ${easing.smoothOut}`,
  dropdown: `${transitionProperty.opacity} ${duration.sm} ${easing.out}, ${transitionProperty.transform} ${duration.sm} ${easing.out}`,
  tooltip: `${transitionProperty.opacity} ${duration.fast} ${easing.out}`,
  popover: `${transitionProperty.opacity} ${duration.sm} ${easing.out}, ${transitionProperty.transform} ${duration.sm} ${easing.out}`,

  // Navigation
  tab: `${transitionProperty.colors} ${duration.sm} ${easing.inOut}`,
  tabIndicator: `${transitionProperty.transform} ${duration.md} ${easing.smoothOut}`,
  accordion: `${transitionProperty.height} ${duration.md} ${easing.smoothInOut}`,
  menu: `${transitionProperty.all} ${duration.fast} ${easing.out}`,

  // Cards & containers
  card: `${transitionProperty.shadow} ${duration.md} ${easing.inOut}, ${transitionProperty.transform} ${duration.md} ${easing.out}`,
  cardHover: `${transitionProperty.all} ${duration.sm} ${easing.out}`,

  // Feedback
  alert: `${transitionProperty.opacity} ${duration.md} ${easing.inOut}`,
  toast: `${transitionProperty.all} ${duration.md} ${easing.smoothOut}`,
  progress: `${transitionProperty.width} ${duration.md} ${easing.linear}`,
  spinner: `${transitionProperty.transform} ${duration.md} ${easing.linear}`,

  // Images & media
  image: `${transitionProperty.opacity} ${duration.md} ${easing.inOut}`,
  imageZoom: `${transitionProperty.transform} ${duration.md} ${easing.smoothInOut}`,

  // Skeleton/loading
  skeleton: `${transitionProperty.opacity} ${duration.lg} ${easing.inOut}`,
} as const;

export type SemanticTransition = keyof typeof semanticTransitions;

// ============================================================================
// TRANSITION UTILITIES (Tailwind classes)
// ============================================================================

/**
 * Tailwind CSS classes for transitions
 */
export const transitionClasses = {
  // Base transitions
  none: 'transition-none',
  all: 'transition-all',
  default: 'transition',
  colors: 'transition-colors',
  opacity: 'transition-opacity',
  shadow: 'transition-shadow',
  transform: 'transition-transform',

  // Durations
  fast: 'duration-150',
  normal: 'duration-200',
  slow: 'duration-300',
  slower: 'duration-500',

  // Easings
  linear: 'ease-linear',
  in: 'ease-in',
  out: 'ease-out',
  inOut: 'ease-in-out',

  // Common combinations
  colorsDefault: 'transition-colors duration-200 ease-in-out',
  colorsFast: 'transition-colors duration-150 ease-in-out',
  allDefault: 'transition-all duration-200 ease-in-out',
  allFast: 'transition-all duration-150 ease-in-out',
  transformDefault: 'transition-transform duration-200 ease-out',
  transformFast: 'transition-transform duration-150 ease-out',
} as const;

export type TransitionClass = keyof typeof transitionClasses;

// ============================================================================
// DELAY VALUES
// ============================================================================

/**
 * Transition delay values
 */
export const transitionDelay = {
  0: '0ms',
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

export type TransitionDelay = keyof typeof transitionDelay;

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

/**
 * Stagger delay values for animating lists
 */
export const staggerDelay = {
  children: {
    fast: '50ms',
    default: '75ms',
    slow: '100ms',
  },
  items: {
    fast: '30ms',
    default: '50ms',
    slow: '75ms',
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get transition value
 */
export function getTransition(key: Transition | SemanticTransition): string {
  if (key in transitions) {
    return transitions[key as Transition];
  }
  return semanticTransitions[key as SemanticTransition];
}

/**
 * Get transition class
 */
export function getTransitionClass(key: TransitionClass): string {
  return transitionClasses[key];
}

/**
 * Get transition delay
 */
export function getTransitionDelay(key: TransitionDelay): string {
  return transitionDelay[key];
}

/**
 * Create custom transition
 * @param property - CSS property to transition
 * @param durationKey - Duration from duration tokens
 * @param easingKey - Easing from easing tokens
 * @param delayMs - Optional delay in milliseconds
 */
export function createTransition(
  property: TransitionProperty | string,
  durationKey: DurationKey = 'md',
  easingKey: EasingKey = 'inOut',
  delayMs: number = 0
): string {
  const prop = property in transitionProperty
    ? transitionProperty[property as TransitionProperty]
    : property;

  const delay = delayMs > 0 ? ` ${delayMs}ms` : '';

  return `${prop} ${duration[durationKey]} ${easing[easingKey]}${delay}`;
}

/**
 * Combine multiple transitions
 */
export function combineTransitions(...transitions: string[]): string {
  return transitions.join(', ');
}

/**
 * Create stagger delay for nth child
 * @param index - Child index (0-based)
 * @param baseDelay - Base delay in ms
 */
export function createStaggerDelay(index: number, baseDelay: number = 50): string {
  return `${index * baseDelay}ms`;
}

/**
 * Generate stagger delay object for animation libraries
 * @param itemCount - Number of items
 * @param baseDelay - Base delay in ms
 */
export function generateStaggerDelays(itemCount: number, baseDelay: number = 50): Record<number, string> {
  const delays: Record<number, string> = {};
  for (let i = 0; i < itemCount; i++) {
    delays[i] = createStaggerDelay(i, baseDelay);
  }
  return delays;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const transitionSystem = {
  properties: transitionProperty,
  base: transitions,
  semantic: semanticTransitions,
  classes: transitionClasses,
  delay: transitionDelay,
  stagger: staggerDelay,
} as const;
