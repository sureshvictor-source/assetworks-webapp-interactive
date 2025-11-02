/**
 * AssetWorks Design System - Size Tokens
 *
 * Width, height, and dimension utilities for consistent sizing.
 * Provides predefined sizes for icons, buttons, inputs, and components.
 *
 * @module design-system/sizes
 */

// ============================================================================
// SIZE SCALE
// ============================================================================

/**
 * Base size scale (same as spacing for consistency)
 * From 0px to 384px (96 * 4px)
 */
export const size = {
  0: '0px',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const;

export type Size = keyof typeof size;

// ============================================================================
// FRACTIONAL SIZES
// ============================================================================

/**
 * Fractional sizes (percentages)
 */
export const fractionalSize = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '5/12': '41.666667%',
  '7/12': '58.333333%',
  '11/12': '91.666667%',
  full: '100%',
  screen: '100vh',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
} as const;

export type FractionalSize = keyof typeof fractionalSize;

// ============================================================================
// ICON SIZES
// ============================================================================

/**
 * Standardized icon sizes
 */
export const iconSize = {
  xs: size[3], // 12px
  sm: size[4], // 16px
  base: size[5], // 20px
  md: size[6], // 24px
  lg: size[8], // 32px
  xl: size[10], // 40px
  '2xl': size[12], // 48px
  '3xl': size[16], // 64px
} as const;

export type IconSize = keyof typeof iconSize;

// ============================================================================
// BUTTON SIZES
// ============================================================================

/**
 * Button height sizes
 */
export const buttonSize = {
  xs: size[6], // 24px
  sm: size[8], // 32px
  base: size[10], // 40px
  md: size[11], // 44px
  lg: size[12], // 48px
  xl: size[14], // 56px
} as const;

export type ButtonSize = keyof typeof buttonSize;

// ============================================================================
// INPUT SIZES
// ============================================================================

/**
 * Input/form element height sizes
 */
export const inputSize = {
  sm: size[8], // 32px
  base: size[10], // 40px
  md: size[11], // 44px
  lg: size[12], // 48px
  xl: size[14], // 56px
} as const;

export type InputSize = keyof typeof inputSize;

// ============================================================================
// AVATAR SIZES
// ============================================================================

/**
 * Avatar/profile picture sizes
 */
export const avatarSize = {
  xs: size[6], // 24px
  sm: size[8], // 32px
  base: size[10], // 40px
  md: size[12], // 48px
  lg: size[16], // 64px
  xl: size[20], // 80px
  '2xl': size[24], // 96px
  '3xl': size[32], // 128px
} as const;

export type AvatarSize = keyof typeof avatarSize;

// ============================================================================
// BADGE SIZES
// ============================================================================

/**
 * Badge height sizes
 */
export const badgeSize = {
  sm: size[5], // 20px
  base: size[6], // 24px
  md: size[7], // 28px
  lg: size[8], // 32px
} as const;

export type BadgeSize = keyof typeof badgeSize;

// ============================================================================
// SPINNER/LOADER SIZES
// ============================================================================

/**
 * Spinner and loading indicator sizes
 */
export const spinnerSize = {
  xs: size[4], // 16px
  sm: size[5], // 20px
  base: size[6], // 24px
  md: size[8], // 32px
  lg: size[10], // 40px
  xl: size[12], // 48px
} as const;

export type SpinnerSize = keyof typeof spinnerSize;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

/**
 * Container max-width values for responsive layouts
 */
export const containerWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
  full: '100%',
  screen: '100vw',
} as const;

export type ContainerWidth = keyof typeof containerWidth;

// ============================================================================
// MODAL/DIALOG WIDTHS
// ============================================================================

/**
 * Modal and dialog max-width values
 */
export const modalWidth = {
  xs: '320px',
  sm: '384px', // 24rem
  base: '448px', // 28rem
  md: '512px', // 32rem
  lg: '640px', // 40rem
  xl: '768px', // 48rem
  '2xl': '896px', // 56rem
  '3xl': '1024px', // 64rem
  full: '100%',
} as const;

export type ModalWidth = keyof typeof modalWidth;

// ============================================================================
// SEMANTIC SIZES
// ============================================================================

/**
 * Semantic size values for common use cases
 */
export const semanticSizes = {
  // Touch targets (min size for mobile)
  touchTarget: size[11], // 44px - iOS minimum
  touchTargetLarge: size[12], // 48px - Android minimum

  // Click targets (desktop)
  clickTarget: size[8], // 32px
  clickTargetLarge: size[10], // 40px

  // Common component sizes
  checkboxDefault: size[5], // 20px
  radioDefault: size[5], // 20px
  switchWidth: size[11], // 44px
  switchHeight: size[6], // 24px
  toggleWidth: size[12], // 48px
  toggleHeight: size[7], // 28px

  // Divider thickness
  dividerThin: size[0], // 1px (via border)
  dividerDefault: size[1], // 4px
  dividerThick: size[2], // 8px

  // Progress bars
  progressThin: size[1], // 4px
  progressDefault: size[2], // 8px
  progressThick: size[3], // 12px

  // Skeleton heights
  skeletonText: size[5], // 20px
  skeletonHeading: size[8], // 32px
  skeletonAvatar: size[12], // 48px
  skeletonButton: size[10], // 40px
} as const;

export type SemanticSize = keyof typeof semanticSizes;

// ============================================================================
// SIZE UTILITIES (Tailwind classes)
// ============================================================================

/**
 * Tailwind CSS classes for common sizes
 */
export const sizeClasses = {
  // Square sizes (w-X h-X)
  icon: 'w-5 h-5', // 20px
  iconSm: 'w-4 h-4', // 16px
  iconLg: 'w-6 h-6', // 24px
  iconXl: 'w-8 h-8', // 32px

  // Button sizes
  buttonSm: 'h-8 px-3', // 32px height
  button: 'h-10 px-4', // 40px height
  buttonLg: 'h-11 px-8', // 44px height
  buttonXl: 'h-12 px-8', // 48px height

  // Input sizes
  inputSm: 'h-8 px-3', // 32px height
  input: 'h-10 px-3', // 40px height
  inputLg: 'h-11 px-4', // 44px height
  inputXl: 'h-12 px-4', // 48px height

  // Avatar sizes
  avatarXs: 'w-6 h-6', // 24px
  avatarSm: 'w-8 h-8', // 32px
  avatar: 'w-10 h-10', // 40px
  avatarLg: 'w-16 h-16', // 64px
  avatarXl: 'w-20 h-20', // 80px

  // Full sizes
  full: 'w-full h-full',
  fullWidth: 'w-full',
  fullHeight: 'h-full',
  fullScreen: 'w-screen h-screen',

  // Min/max sizes
  minFull: 'min-w-full min-h-full',
  maxFull: 'max-w-full max-h-full',
} as const;

export type SizeClass = keyof typeof sizeClasses;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get size value
 */
export function getSize(key: Size | FractionalSize): string {
  if (key in size) {
    return size[key as Size];
  }
  return fractionalSize[key as FractionalSize];
}

/**
 * Get icon size
 */
export function getIconSize(key: IconSize): string {
  return iconSize[key];
}

/**
 * Get button size
 */
export function getButtonSize(key: ButtonSize): string {
  return buttonSize[key];
}

/**
 * Get input size
 */
export function getInputSize(key: InputSize): string {
  return inputSize[key];
}

/**
 * Get avatar size
 */
export function getAvatarSize(key: AvatarSize): string {
  return avatarSize[key];
}

/**
 * Get spinner size
 */
export function getSpinnerSize(key: SpinnerSize): string {
  return spinnerSize[key];
}

/**
 * Get container width
 */
export function getContainerWidth(key: ContainerWidth): string {
  return containerWidth[key];
}

/**
 * Get modal width
 */
export function getModalWidth(key: ModalWidth): string {
  return modalWidth[key];
}

/**
 * Get semantic size
 */
export function getSemanticSize(key: SemanticSize): string {
  return semanticSizes[key];
}

/**
 * Get size class
 */
export function getSizeClass(key: SizeClass): string {
  return sizeClasses[key];
}

/**
 * Create custom size
 * @param value - Numeric value
 * @param unit - Unit (px, rem, %, etc.)
 */
export function createSize(value: number, unit: 'px' | 'rem' | '%' | 'em' | 'vh' | 'vw' = 'px'): string {
  return `${value}${unit}`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const sizes = {
  scale: size,
  fractional: fractionalSize,
  icon: iconSize,
  button: buttonSize,
  input: inputSize,
  avatar: avatarSize,
  badge: badgeSize,
  spinner: spinnerSize,
  container: containerWidth,
  modal: modalWidth,
  semantic: semanticSizes,
  classes: sizeClasses,
} as const;
