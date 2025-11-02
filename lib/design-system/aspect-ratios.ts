/**
 * AssetWorks Design System - Aspect Ratio Tokens
 *
 * Aspect ratio utilities for images, videos, and containers.
 * Provides consistent aspect ratios across all AssetWorks products.
 *
 * @module design-system/aspect-ratios
 */

// ============================================================================
// ASPECT RATIOS
// ============================================================================

/**
 * Common aspect ratios
 */
export const aspectRatio = {
  // Square
  square: '1 / 1',

  // Video formats
  video: '16 / 9',
  videoVertical: '9 / 16',
  videoUltrawide: '21 / 9',
  video4_3: '4 / 3',

  // Photo formats
  photo: '3 / 2',
  photoPortrait: '2 / 3',
  photo4_5: '4 / 5',
  photo5_4: '5 / 4',

  // Social media formats
  instagram: '1 / 1',
  instagramStory: '9 / 16',
  instagramPortrait: '4 / 5',
  facebook: '1.91 / 1',
  twitter: '16 / 9',
  twitterCard: '2 / 1',
  linkedin: '1.91 / 1',
  youtube: '16 / 9',
  youtubeThumbnail: '16 / 9',
  pinterest: '2 / 3',

  // Design ratios
  golden: '1.618 / 1',
  goldenVertical: '1 / 1.618',

  // Monitor ratios
  monitor16_9: '16 / 9',
  monitor16_10: '16 / 10',
  monitor21_9: '21 / 9',
  monitor32_9: '32 / 9',
  monitor4_3: '4 / 3',
  monitor5_4: '5 / 4',

  // Print formats (A-series)
  a4: '210 / 297', // ~1:1.414
  a4Landscape: '297 / 210',

  // Cinema
  cinema: '2.39 / 1',
  cinemaWide: '2.35 / 1',
  cinemaimax: '1.43 / 1',

  // Auto (content-based)
  auto: 'auto',
} as const;

export type AspectRatio = keyof typeof aspectRatio;

// ============================================================================
// ASPECT RATIO VALUES (numeric)
// ============================================================================

/**
 * Numeric aspect ratio values (width/height)
 * Useful for calculations
 */
export const aspectRatioValues = {
  square: 1,
  video: 16 / 9,
  videoVertical: 9 / 16,
  videoUltrawide: 21 / 9,
  video4_3: 4 / 3,
  photo: 3 / 2,
  photoPortrait: 2 / 3,
  golden: 1.618,
  goldenVertical: 1 / 1.618,
  cinema: 2.39,
  instagram: 1,
  instagramStory: 9 / 16,
  instagramPortrait: 4 / 5,
  facebook: 1.91,
  twitter: 16 / 9,
} as const;

export type AspectRatioValue = keyof typeof aspectRatioValues;

// ============================================================================
// SEMANTIC ASPECT RATIOS
// ============================================================================

/**
 * Semantic aspect ratios for common use cases
 */
export const semanticAspectRatios = {
  // Images
  cardImage: aspectRatio.video, // 16:9 for card images
  heroImage: aspectRatio.videoUltrawide, // 21:9 for hero sections
  thumbnail: aspectRatio.square, // 1:1 for thumbnails
  profilePicture: aspectRatio.square, // 1:1 for avatars
  productImage: aspectRatio.square, // 1:1 for e-commerce
  blogImage: aspectRatio.photo, // 3:2 for blog posts

  // Videos
  videoPlayer: aspectRatio.video, // 16:9 standard
  videoPlayerWide: aspectRatio.cinema, // 2.39:1 cinematic
  videoThumbnail: aspectRatio.video, // 16:9
  videoShort: aspectRatio.videoVertical, // 9:16 for shorts/stories

  // Social
  socialPost: aspectRatio.instagram, // 1:1
  socialStory: aspectRatio.instagramStory, // 9:16
  socialCover: aspectRatio.facebook, // 1.91:1

  // Design
  bannerHorizontal: aspectRatio.videoUltrawide, // 21:9
  bannerSquare: aspectRatio.square, // 1:1
  cardDefault: aspectRatio.photo, // 3:2

  // Ads
  adBanner: aspectRatio.video, // 16:9
  adSquare: aspectRatio.square, // 1:1
  adLeaderboard: '728 / 90',
  adSkyscraper: '160 / 600',
} as const;

export type SemanticAspectRatio = keyof typeof semanticAspectRatios;

// ============================================================================
// ASPECT RATIO UTILITIES (Tailwind classes)
// ============================================================================

/**
 * Tailwind CSS classes for aspect ratios
 */
export const aspectRatioClasses = {
  // Common ratios
  square: 'aspect-square',
  video: 'aspect-video',
  auto: 'aspect-auto',

  // Custom ratios (using arbitrary values)
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
  '9/16': 'aspect-[9/16]',
  '21/9': 'aspect-[21/9]',
  golden: 'aspect-[1.618/1]',

  // Social media
  instagram: 'aspect-square',
  instagramStory: 'aspect-[9/16]',
  facebook: 'aspect-[1.91/1]',
  twitter: 'aspect-video',
} as const;

export type AspectRatioClass = keyof typeof aspectRatioClasses;

// ============================================================================
// ASPECT RATIO CONTAINERS
// ============================================================================

/**
 * CSS for aspect ratio containers with padding-bottom technique
 * (For browsers that don't support aspect-ratio)
 */
export const aspectRatioContainers = {
  square: {
    paddingBottom: '100%',
    aspectRatio: aspectRatio.square,
  },
  video: {
    paddingBottom: '56.25%', // 9/16 * 100
    aspectRatio: aspectRatio.video,
  },
  videoVertical: {
    paddingBottom: '177.78%', // 16/9 * 100
    aspectRatio: aspectRatio.videoVertical,
  },
  photo: {
    paddingBottom: '66.67%', // 2/3 * 100
    aspectRatio: aspectRatio.photo,
  },
  golden: {
    paddingBottom: '61.8%', // 1/1.618 * 100
    aspectRatio: aspectRatio.golden,
  },
} as const;

export type AspectRatioContainer = keyof typeof aspectRatioContainers;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get aspect ratio value
 */
export function getAspectRatio(key: AspectRatio | SemanticAspectRatio): string {
  if (key in aspectRatio) {
    return aspectRatio[key as AspectRatio];
  }
  return semanticAspectRatios[key as SemanticAspectRatio];
}

/**
 * Get numeric aspect ratio value
 */
export function getAspectRatioValue(key: AspectRatioValue): number {
  return aspectRatioValues[key];
}

/**
 * Get aspect ratio class
 */
export function getAspectRatioClass(key: AspectRatioClass): string {
  return aspectRatioClasses[key];
}

/**
 * Get aspect ratio container styles
 */
export function getAspectRatioContainer(
  key: AspectRatioContainer
): typeof aspectRatioContainers[AspectRatioContainer] {
  return aspectRatioContainers[key];
}

/**
 * Calculate padding-bottom percentage from aspect ratio
 * @param width - Width part of ratio
 * @param height - Height part of ratio
 */
export function calculatePaddingBottom(width: number, height: number): string {
  return `${(height / width) * 100}%`;
}

/**
 * Create custom aspect ratio
 * @param width - Width part
 * @param height - Height part
 */
export function createAspectRatio(width: number, height: number): string {
  return `${width} / ${height}`;
}

/**
 * Calculate height from width and aspect ratio
 * @param width - Width in pixels
 * @param aspectRatioKey - Aspect ratio key
 */
export function calculateHeight(width: number, aspectRatioKey: AspectRatioValue): number {
  return width / aspectRatioValues[aspectRatioKey];
}

/**
 * Calculate width from height and aspect ratio
 * @param height - Height in pixels
 * @param aspectRatioKey - Aspect ratio key
 */
export function calculateWidth(height: number, aspectRatioKey: AspectRatioValue): number {
  return height * aspectRatioValues[aspectRatioKey];
}

/**
 * Check if aspect ratio is landscape
 */
export function isLandscape(aspectRatioKey: AspectRatioValue): boolean {
  return aspectRatioValues[aspectRatioKey] > 1;
}

/**
 * Check if aspect ratio is portrait
 */
export function isPortrait(aspectRatioKey: AspectRatioValue): boolean {
  return aspectRatioValues[aspectRatioKey] < 1;
}

/**
 * Check if aspect ratio is square
 */
export function isSquare(aspectRatioKey: AspectRatioValue): boolean {
  return aspectRatioValues[aspectRatioKey] === 1;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const aspectRatios = {
  ratios: aspectRatio,
  values: aspectRatioValues,
  semantic: semanticAspectRatios,
  classes: aspectRatioClasses,
  containers: aspectRatioContainers,
} as const;
