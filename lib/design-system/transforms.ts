/**
 * AssetWorks Design System - Transform Tokens
 *
 * CSS transform utilities for scale, rotate, translate, and skew.
 * Provides consistent transformation effects across all AssetWorks products.
 *
 * @module design-system/transforms
 */

// ============================================================================
// SCALE
// ============================================================================

/**
 * Scale transformation values
 * For hover effects, zoom, and size changes
 */
export const scale = {
  0: '0',
  50: '0.5',
  75: '0.75',
  90: '0.9',
  95: '0.95',
  100: '1',
  105: '1.05',
  110: '1.1',
  125: '1.25',
  150: '1.5',
  200: '2',
} as const;

export type Scale = keyof typeof scale;

// ============================================================================
// ROTATE
// ============================================================================

/**
 * Rotation values in degrees
 * For icon rotations, animations, and transformations
 */
export const rotate = {
  0: '0deg',
  1: '1deg',
  2: '2deg',
  3: '3deg',
  6: '6deg',
  12: '12deg',
  45: '45deg',
  90: '90deg',
  180: '180deg',
  270: '270deg',
  360: '360deg',
  '-1': '-1deg',
  '-2': '-2deg',
  '-3': '-3deg',
  '-6': '-6deg',
  '-12': '-12deg',
  '-45': '-45deg',
  '-90': '-90deg',
  '-180': '-180deg',
} as const;

export type Rotate = keyof typeof rotate;

// ============================================================================
// TRANSLATE
// ============================================================================

/**
 * Translation values (X and Y axis)
 * For positioning, animations, and offsets
 */
export const translate = {
  0: '0px',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '3/4': '75%',
  full: '100%',
} as const;

export type Translate = keyof typeof translate;

// ============================================================================
// SKEW
// ============================================================================

/**
 * Skew transformation values in degrees
 * For creative effects and animations
 */
export const skew = {
  0: '0deg',
  1: '1deg',
  2: '2deg',
  3: '3deg',
  6: '6deg',
  12: '12deg',
  '-1': '-1deg',
  '-2': '-2deg',
  '-3': '-3deg',
  '-6': '-6deg',
  '-12': '-12deg',
} as const;

export type Skew = keyof typeof skew;

// ============================================================================
// SEMANTIC TRANSFORMS
// ============================================================================

/**
 * Semantic transform values for common use cases
 */
export const semanticTransforms = {
  // Hover effects
  hoverScale: scale[105], // 105% - Subtle hover scale
  hoverScaleStrong: scale[110], // 110% - Strong hover scale
  pressedScale: scale[95], // 95% - Pressed/active scale

  // Button transforms
  buttonHover: scale[105],
  buttonPressed: scale[95],

  // Icon rotations
  iconRotate90: rotate[90],
  iconRotate180: rotate[180],
  iconRotate270: rotate[270],
  iconFlip: rotate[180],

  // Chevron/arrow rotations
  chevronDown: rotate[0],
  chevronUp: rotate[180],
  chevronLeft: rotate['-90'],
  chevronRight: rotate[90],

  // Tooltip/popover offsets
  tooltipOffset: translate[2], // 8px offset
  popoverOffset: translate[1], // 4px offset

  // Modal/drawer animations
  modalSlideUp: translate['-12'], // Slide from bottom
  drawerSlideLeft: translate.full, // Slide from right
  drawerSlideRight: translate['-full'], // Slide from left
} as const;

export type SemanticTransform = keyof typeof semanticTransforms;

// ============================================================================
// TRANSFORM COMBINATIONS
// ============================================================================

/**
 * Pre-built transform combinations for common patterns
 */
export const transformCombinations = {
  // Hover effects
  hoverLift: {
    transform: `scale(${scale[105]}) translateY(-${translate[1]})`,
    className: 'hover:scale-105 hover:-translate-y-1',
  },
  hoverGrow: {
    transform: `scale(${scale[110]})`,
    className: 'hover:scale-110',
  },
  hoverShrink: {
    transform: `scale(${scale[95]})`,
    className: 'hover:scale-95',
  },

  // Button press effects
  buttonPress: {
    transform: `scale(${scale[95]})`,
    className: 'active:scale-95',
  },

  // Icon rotations (with transitions)
  iconRotateSmooth: {
    transform: `rotate(${rotate[180]})`,
    className: 'transition-transform duration-200 rotate-180',
  },
  iconSpinSlow: {
    transform: `rotate(${rotate[360]})`,
    className: 'animate-spin-slow',
  },

  // Wiggle/shake effects
  wiggle: {
    transform: `rotate(${rotate[3]})`,
    className: 'animate-wiggle',
  },
  shake: {
    transform: `translateX(${translate[2]})`,
    className: 'animate-shake',
  },

  // Centered positioning
  centerAbsolute: {
    transform: `translate(-${translate['1/2']}, -${translate['1/2']})`,
    className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  },
  centerX: {
    transform: `translateX(-${translate['1/2']})`,
    className: 'left-1/2 -translate-x-1/2',
  },
  centerY: {
    transform: `translateY(-${translate['1/2']})`,
    className: 'top-1/2 -translate-y-1/2',
  },
} as const;

export type TransformCombination = keyof typeof transformCombinations;

// ============================================================================
// TRANSFORM UTILITIES
// ============================================================================

/**
 * Tailwind CSS classes for transforms
 */
export const transformClasses = {
  // Scale
  scale: 'scale-100',
  scaleHover: 'hover:scale-105',
  scalePressed: 'active:scale-95',
  scaleZoom: 'scale-110',

  // Rotate
  rotate0: 'rotate-0',
  rotate45: 'rotate-45',
  rotate90: 'rotate-90',
  rotate180: 'rotate-180',
  rotateNeg90: '-rotate-90',

  // Translate
  translateUp: '-translate-y-1',
  translateDown: 'translate-y-1',
  translateLeft: '-translate-x-1',
  translateRight: 'translate-x-1',

  // Center
  center: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  centerX: 'left-1/2 -translate-x-1/2',
  centerY: 'top-1/2 -translate-y-1/2',

  // Skew
  skew: 'skew-x-3',
  skewY: 'skew-y-3',

  // Origin
  originCenter: 'origin-center',
  originTop: 'origin-top',
  originBottom: 'origin-bottom',
  originLeft: 'origin-left',
  originRight: 'origin-right',
} as const;

export type TransformClass = keyof typeof transformClasses;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get scale value
 */
export function getScale(key: Scale): string {
  return scale[key];
}

/**
 * Get rotate value
 */
export function getRotate(key: Rotate): string {
  return rotate[key];
}

/**
 * Get translate value
 */
export function getTranslate(key: Translate): string {
  return translate[key];
}

/**
 * Get skew value
 */
export function getSkew(key: Skew): string {
  return skew[key];
}

/**
 * Get semantic transform
 */
export function getSemanticTransform(key: SemanticTransform): string {
  return semanticTransforms[key];
}

/**
 * Get transform combination
 */
export function getTransformCombination(
  key: TransformCombination
): typeof transformCombinations[TransformCombination] {
  return transformCombinations[key];
}

/**
 * Create custom scale transform
 */
export function createScale(value: Scale): string {
  return `scale(${scale[value]})`;
}

/**
 * Create custom rotate transform
 */
export function createRotate(value: Rotate): string {
  return `rotate(${rotate[value]})`;
}

/**
 * Create custom translate transform
 */
export function createTranslate(x: Translate, y?: Translate): string {
  if (y) {
    return `translate(${translate[x]}, ${translate[y]})`;
  }
  return `translate(${translate[x]})`;
}

/**
 * Combine multiple transforms
 */
export function combineTransforms(...transforms: string[]): string {
  return transforms.join(' ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export const transforms = {
  scale,
  rotate,
  translate,
  skew,
  semantic: semanticTransforms,
  combinations: transformCombinations,
  classes: transformClasses,
} as const;
