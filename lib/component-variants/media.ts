/**
 * AssetWorks Component Variants - Media
 *
 * Type-safe media component variants (avatar, image, icon).
 * Provides comprehensive media styling for all patterns.
 *
 * @module component-variants/media
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// AVATAR VARIANTS
// ============================================================================

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
        xl: 'h-20 w-20',
        '2xl': 'h-24 w-24',
        '3xl': 'h-32 w-32',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
        rounded: 'rounded-lg',
      },
      ring: {
        none: '',
        default: 'ring-2 ring-background',
        primary: 'ring-2 ring-primary',
        success: 'ring-2 ring-success',
        error: 'ring-2 ring-error',
      },
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
      ring: 'none',
    },
  }
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;

export const avatarImageVariants = cva(
  'aspect-square h-full w-full object-cover'
);

export type AvatarImageVariants = VariantProps<typeof avatarImageVariants>;

export const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'text-[10px]',
        sm: 'text-xs',
        default: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type AvatarFallbackVariants = VariantProps<typeof avatarFallbackVariants>;

export const avatarGroupVariants = cva(
  'flex -space-x-2',
  {
    variants: {
      size: {
        sm: '-space-x-1',
        default: '-space-x-2',
        lg: '-space-x-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type AvatarGroupVariants = VariantProps<typeof avatarGroupVariants>;

// ============================================================================
// IMAGE VARIANTS
// ============================================================================

export const imageVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
        auto: '',
      },
      objectFit: {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      loading: {
        eager: '',
        lazy: '',
      },
    },
    defaultVariants: {
      aspectRatio: 'auto',
      objectFit: 'cover',
      rounded: 'default',
      loading: 'lazy',
    },
  }
);

export type ImageVariants = VariantProps<typeof imageVariants>;

export const imageOverlayVariants = cva(
  'absolute inset-0 bg-black/50 opacity-0 transition-opacity',
  {
    variants: {
      hover: {
        true: 'hover:opacity-100',
        false: '',
      },
      visible: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
    defaultVariants: {
      hover: false,
      visible: false,
    },
  }
);

export type ImageOverlayVariants = VariantProps<typeof imageOverlayVariants>;

export const imagePlaceholderVariants = cva(
  'absolute inset-0 flex items-center justify-center bg-muted animate-pulse'
);

export type ImagePlaceholderVariants = VariantProps<typeof imagePlaceholderVariants>;

// ============================================================================
// ICON VARIANTS
// ============================================================================

export const iconVariants = cva(
  'inline-flex shrink-0',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-10 w-10',
        '2xl': 'h-12 w-12',
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export type IconVariants = VariantProps<typeof iconVariants>;

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;

// ============================================================================
// MEDIA PRESETS
// ============================================================================

export const mediaPresets = {
  avatar: {
    small: { size: 'sm' as const, shape: 'circle' as const },
    default: { size: 'default' as const, shape: 'circle' as const },
    large: { size: 'lg' as const, shape: 'circle' as const },
    square: { size: 'default' as const, shape: 'square' as const },
  },
  image: {
    thumbnail: { aspectRatio: 'square' as const, rounded: 'default' as const },
    banner: { aspectRatio: 'video' as const, rounded: 'lg' as const },
    portrait: { aspectRatio: 'portrait' as const, rounded: 'default' as const },
  },
  icon: {
    small: { size: 'sm' as const, variant: 'default' as const },
    default: { size: 'default' as const, variant: 'default' as const },
    large: { size: 'lg' as const, variant: 'default' as const },
  },
};
