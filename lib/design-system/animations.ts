/**
 * AssetWorks Design System - Animation Tokens
 *
 * Centralized animation system including durations, easings, and keyframes.
 * Creates smooth, consistent motion across all products.
 *
 * @module design-system/animations
 */

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

/**
 * Standard animation duration scale
 * Keep animations fast and responsive
 */
export const duration = {
  instant: '0ms',
  fastest: '75ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',     // ⭐ Default
  slow: '300ms',
  slower: '400ms',
  slowest: '500ms',
} as const;

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

/**
 * Cubic bezier easing curves for natural motion
 */
export const easing = {
  // Standard easings
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',

  // Custom cubic bezier curves
  // Smooth and natural
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

  // Quick entrance
  entrance: 'cubic-bezier(0.0, 0.0, 0.2, 1)',

  // Quick exit
  exit: 'cubic-bezier(0.4, 0.0, 1, 1)',

  // Bouncy (for playful interactions)
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Sharp (for decisive actions)
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',

  // Elastic (for attention-grabbing)
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

/**
 * Common transition combinations
 */
export const transition = {
  // All properties
  all: {
    fast: `all ${duration.fast} ${easing.smooth}`,
    normal: `all ${duration.normal} ${easing.smooth}`,
    slow: `all ${duration.slow} ${easing.smooth}`,
  },

  // Specific properties
  colors: `color ${duration.normal} ${easing.smooth}, background-color ${duration.normal} ${easing.smooth}, border-color ${duration.normal} ${easing.smooth}`,
  opacity: `opacity ${duration.normal} ${easing.smooth}`,
  transform: `transform ${duration.normal} ${easing.smooth}`,
  shadow: `box-shadow ${duration.normal} ${easing.smooth}`,

  // Combined common transitions
  button: `background-color ${duration.fast} ${easing.smooth}, box-shadow ${duration.fast} ${easing.smooth}, transform ${duration.fast} ${easing.smooth}`,
  card: `transform ${duration.normal} ${easing.smooth}, box-shadow ${duration.normal} ${easing.smooth}`,
  modal: `opacity ${duration.normal} ${easing.entrance}, transform ${duration.normal} ${easing.entrance}`,
  dropdown: `opacity ${duration.fast} ${easing.entrance}, transform ${duration.fast} ${easing.entrance}`,
} as const;

// ============================================================================
// KEYFRAME ANIMATIONS
// ============================================================================

/**
 * Reusable keyframe animation definitions
 */
export const keyframes = {
  // Fade animations
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },

  // Slide animations
  slideInFromTop: {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  slideInFromBottom: {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },

  // Scale animations
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0.95)', opacity: '0' },
  },

  // Rotation
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },

  // Pulse
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },

  // Bounce
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-25%)' },
  },

  // Shimmer (loading effect)
  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },

  // Wiggle
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  },

  // Shake
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
  },

  // Ping (notification)
  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
  },
} as const;

// ============================================================================
// ANIMATION PRESETS
// ============================================================================

/**
 * Complete animation definitions ready to use
 */
export const animations = {
  // Fade
  fadeIn: `fadeIn ${duration.normal} ${easing.entrance}`,
  fadeOut: `fadeOut ${duration.normal} ${easing.exit}`,

  // Slide
  slideInFromTop: `slideInFromTop ${duration.normal} ${easing.entrance}`,
  slideInFromRight: `slideInFromRight ${duration.normal} ${easing.entrance}`,
  slideInFromBottom: `slideInFromBottom ${duration.normal} ${easing.entrance}`,
  slideInFromLeft: `slideInFromLeft ${duration.normal} ${easing.entrance}`,

  // Scale
  scaleIn: `scaleIn ${duration.normal} ${easing.entrance}`,
  scaleOut: `scaleOut ${duration.normal} ${easing.exit}`,

  // Loading states
  spin: `spin ${duration.slowest} ${easing.linear} infinite`,
  pulse: `pulse 2s ${easing.easeInOut} infinite`,
  shimmer: `shimmer 2.5s ${easing.linear} infinite`,

  // Interactive
  bounce: `bounce 1s ${easing.bounce} infinite`,
  wiggle: `wiggle 0.5s ${easing.easeInOut}`,
  shake: `shake 0.5s ${easing.easeInOut}`,
  ping: `ping 1s ${easing.easeOut} infinite`,
} as const;

// ============================================================================
// TAILWIND CLASS UTILITIES
// ============================================================================

/**
 * Pre-built Tailwind animation classes
 */
export const animationClasses = {
  // Standard animations
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  ping: 'animate-ping',
  shimmer: 'animate-shimmer',

  // Transition utilities
  transition: 'transition-all duration-200 ease-smooth',
  transitionFast: 'transition-all duration-150 ease-smooth',
  transitionSlow: 'transition-all duration-300 ease-smooth',
  transitionColors: 'transition-colors duration-200 ease-smooth',
  transitionOpacity: 'transition-opacity duration-200 ease-smooth',
  transitionTransform: 'transition-transform duration-200 ease-smooth',
  transitionShadow: 'transition-shadow duration-200 ease-smooth',
} as const;

// ============================================================================
// HOVER ANIMATION CLASSES
// ============================================================================

/**
 * Common hover effects
 */
export const hoverEffects = {
  lift: 'transition-transform duration-200 hover:scale-105',
  liftShadow: 'transition-all duration-200 hover:scale-105 hover:shadow-lg',
  grow: 'transition-transform duration-200 hover:scale-110',
  shrink: 'transition-transform duration-200 hover:scale-95',
  glow: 'transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(27,41,81,0.3)]',
  brightness: 'transition-all duration-200 hover:brightness-110',
} as const;

// ============================================================================
// LOADING STATES
// ============================================================================

/**
 * Loading animation patterns
 */
export const loadingStates = {
  spinner: {
    animation: animations.spin,
    className: 'animate-spin',
  },
  pulse: {
    animation: animations.pulse,
    className: 'animate-pulse',
  },
  shimmer: {
    animation: animations.shimmer,
    className: 'animate-shimmer',
  },
  dots: {
    animation: animations.bounce,
    className: 'animate-bounce',
  },
} as const;

// ============================================================================
// ENTRANCE/EXIT ANIMATIONS
// ============================================================================

/**
 * Enter and exit animations for modals, tooltips, etc.
 */
export const modalAnimations = {
  // Modal entrance
  enter: {
    backdrop: 'animate-fade-in',
    content: 'animate-scale-in',
  },
  // Modal exit
  exit: {
    backdrop: 'animate-fade-out',
    content: 'animate-scale-out',
  },
} as const;

export const dropdownAnimations = {
  enter: 'animate-fade-in duration-150',
  exit: 'animate-fade-out duration-150',
} as const;

export const tooltipAnimations = {
  enter: 'animate-fade-in duration-100',
  exit: 'animate-fade-out duration-100',
} as const;

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

/**
 * Framer Motion animation variants for complex animations
 */
export const framerVariants = {
  // Modal variants
  modal: {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0.0, 1, 1],
      },
    },
  },

  // Dropdown variants
  dropdown: {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: [0.0, 0.0, 0.2, 1],
      },
    },
  },

  // Slide in from right (sidebar)
  slideInRight: {
    hidden: {
      x: '100%',
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  },

  // Stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get duration value
 */
export function getDuration(key: keyof typeof duration): string {
  return duration[key];
}

/**
 * Get easing function
 */
export function getEasing(key: keyof typeof easing): string {
  return easing[key];
}

/**
 * Create custom transition
 */
export function createTransition(
  property: string,
  durationKey: keyof typeof duration = 'normal',
  easingKey: keyof typeof easing = 'smooth'
): string {
  return `${property} ${duration[durationKey]} ${easing[easingKey]}`;
}

/**
 * Combine multiple transitions
 */
export function combineTransitions(...transitions: string[]): string {
  return transitions.join(', ');
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
export type AnimationKey = keyof typeof animations;
export type KeyframeKey = keyof typeof keyframes;
export type HoverEffect = keyof typeof hoverEffects;
