/**
 * Component Variants System
 *
 * Centralized component variant definitions using class-variance-authority (cva).
 * Provides type-safe, consistent styling across all AssetWorks products.
 *
 * @module component-variants
 * @version 1.0.0
 *
 * ## Usage
 *
 * ```tsx
 * import { buttonVariants, badgeVariants } from '@/lib/component-variants';
 *
 * // Use in your components
 * <button className={buttonVariants({ variant: 'primary', size: 'lg' })}>
 *   Click me
 * </button>
 *
 * <span className={badgeVariants({ variant: 'success' })}>
 *   Active
 * </span>
 * ```
 *
 * ## Available Component Variants
 *
 * - **Button**: Primary, secondary, outline, ghost, destructive, link variants
 * - **Badge**: Status badges with colors and sizes
 * - **Card**: Dashboard cards, feature cards, pricing cards
 *
 * @see {@link ./button.ts} for button variants
 * @see {@link ./badge.ts} for badge variants
 * @see {@link ./card.ts} for card variants
 */

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

export {
  buttonVariants,
  buttonIconVariants,
  buttonGroupVariants,
  type ButtonVariants,
} from './button';

// ============================================================================
// BADGE VARIANTS
// ============================================================================

export {
  badgeVariants,
  badgeDotVariants,
  badgeIconVariants,
  statusBadgePresets,
  type BadgeVariants,
} from './badge';

// ============================================================================
// CARD VARIANTS
// ============================================================================

export {
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardContentVariants,
  cardFooterVariants,
  cardLayoutPresets,
  type CardVariants,
  type CardHeaderVariants,
  type CardTitleVariants,
  type CardDescriptionVariants,
  type CardContentVariants,
  type CardFooterVariants,
} from './card';

// ============================================================================
// VARIANT UTILITIES
// ============================================================================

/**
 * Metadata about the component variants system
 */
export const componentVariantsSystem = {
  version: '1.0.0',
  name: 'AssetWorks Component Variants',
  description: 'Type-safe component styling system using class-variance-authority',
  lastUpdated: '2025-11-02',
} as const;

/**
 * List of all available component variant modules
 */
export const availableVariants = [
  'button',
  'badge',
  'card',
] as const;

export type AvailableVariant = typeof availableVariants[number];

/**
 * Note: Import variants directly using named imports
 *
 * Example:
 * ```ts
 * import { buttonVariants, cardVariants } from '@/lib/component-variants';
 * ```
 */
