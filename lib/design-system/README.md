# AssetWorks Design System

**Version:** 1.0.0
**Last Updated:** November 2, 2025

> A comprehensive, centralized design system for building consistent, accessible, and beautiful user interfaces across all AssetWorks products.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Design Tokens](#design-tokens)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Spacing](#spacing)
  - [Shadows](#shadows)
  - [Animations](#animations)
  - [Breakpoints](#breakpoints)
- [Component Variants](#component-variants)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

---

## 🎯 Overview

The AssetWorks Design System provides a single source of truth for all design decisions across the AssetWorks product suite. It includes:

- **Design Tokens**: Colors, typography, spacing, shadows, animations, and breakpoints
- **Component Variants**: Pre-configured component styles using `class-variance-authority`
- **Type Safety**: Full TypeScript support with autocomplete
- **Tailwind Integration**: Seamlessly integrates with Tailwind CSS
- **Accessibility**: Built with WCAG 2.1 AA compliance in mind

### Key Benefits

✅ **Consistency** - Unified design language across all products
✅ **Productivity** - Pre-built tokens and variants speed up development
✅ **Type Safety** - TypeScript ensures correct usage
✅ **Maintainability** - Single source of truth for design updates
✅ **Accessibility** - ARIA-compliant components by default

---

## 📦 Installation

The design system is already included in this project. No additional installation required!

```bash
# Already available at:
# /lib/design-system
# /lib/component-variants
```

---

## 🚀 Quick Start

### Using Design Tokens

```tsx
import { colors, typography, spacing } from '@/lib/design-system';

// Access color tokens
const primaryColor = colors.primary.DEFAULT; // '#1B2951'
const successColor = colors.success[500];     // '#10B981'

// Access typography
const headingClass = typography.typographyClasses.h1;
const fontSize = typography.fontSize.lg.size;

// Access spacing
const cardPadding = spacing.semanticSpacing.cardPadding; // '24px'
const gapClass = spacing.spacingClasses.gapMd;          // 'gap-4'
```

### Using Component Variants

```tsx
import { buttonVariants, cardVariants } from '@/lib/component-variants';

function MyComponent() {
  return (
    <div className={cardVariants({ variant: 'elevated', padding: 'lg' })}>
      <button className={buttonVariants({ variant: 'default', size: 'lg' })}>
        Click me
      </button>
    </div>
  );
}
```

---

## 🎨 Design Tokens

### Colors

The color system provides a comprehensive palette for all UI needs.

#### Brand Colors

```tsx
import { colors } from '@/lib/design-system';

colors.primary.DEFAULT    // '#1B2951' - Navy (main brand)
colors.secondary.DEFAULT  // '#6C7B95' - Blue-gray
colors.accent.DEFAULT     // '#405D80' - Deep blue
```

#### Semantic Colors

```tsx
colors.success.DEFAULT   // '#10B981' - Green
colors.warning.DEFAULT   // '#F59E0B' - Amber
colors.error.DEFAULT     // '#EF4444' - Red
colors.info.DEFAULT      // '#3B82F6' - Blue
```

#### Color Shades

Each color includes 10 shades (50, 100, 200, ..., 900):

```tsx
colors.primary[50]   // Lightest
colors.primary[500]  // Base (same as DEFAULT)
colors.primary[900]  // Darkest
```

#### Using Colors in Components

```tsx
// Direct hex value
<div style={{ backgroundColor: colors.primary.DEFAULT }} />

// Tailwind class (using CSS variables)
<div className="bg-primary text-primary-foreground" />

// Helper function
import { getColor } from '@/lib/design-system';
const color = getColor('primary', 600);
```

---

### Typography

A modular type scale for consistent text hierarchy.

#### Font Families

```tsx
import { fontFamily } from '@/lib/design-system';

fontFamily.primary  // Euclid Circular A + fallbacks
fontFamily.mono     // SF Mono + monospace fallbacks
```

#### Heading Styles

```tsx
import { headings, typographyClasses } from '@/lib/design-system';

// Style objects
headings.h1  // { fontSize: '3rem', lineHeight: '3.5rem', ... }
headings.h2  // { fontSize: '2.25rem', lineHeight: '2.75rem', ... }

// Tailwind classes
<h1 className={typographyClasses.h1}>Heading</h1>
<h2 className={typographyClasses.h2}>Subheading</h2>
```

#### Responsive Typography

```tsx
import { responsiveHeadings } from '@/lib/design-system';

// Automatically scales with breakpoints
<h1 className={responsiveHeadings.h1}>
  Responsive Heading
</h1>
// → 'text-3xl sm:text-4xl md:text-5xl font-bold ...'
```

#### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `xs` | 12px | 16px | Captions, labels |
| `sm` | 14px | 20px | Small text |
| `base` | 16px | 24px | Body text |
| `lg` | 18px | 28px | Large text |
| `xl` | 20px | 28px | Subheadings |
| `2xl` | 24px | 32px | H4 |
| `3xl` | 30px | 36px | H3 |
| `4xl` | 36px | 44px | H2 |
| `5xl` | 48px | 56px | H1 |

---

### Spacing

8px baseline grid for consistent spacing.

#### Spacing Scale

```tsx
import { spacing } from '@/lib/design-system';

spacing[2]   // '0.5rem'  = 8px  ⭐ Base unit
spacing[4]   // '1rem'    = 16px ⭐ Common default
spacing[6]   // '1.5rem'  = 24px ⭐ Card padding
spacing[8]   // '2rem'    = 32px ⭐ Section spacing
```

#### Semantic Spacing

Pre-defined spacing for common use cases:

```tsx
import { semanticSpacing } from '@/lib/design-system';

semanticSpacing.cardPadding      // '24px'
semanticSpacing.buttonPaddingX   // '16px'
semanticSpacing.sectionGap       // '32px'
semanticSpacing.gapMd            // '16px'
```

#### Tailwind Classes

```tsx
import { spacingClasses, flexPatterns, gridPatterns } from '@/lib/design-system';

// Pre-built spacing classes
<div className={spacingClasses.cardPadding} />        // 'p-6'
<div className={spacingClasses.gapMd} />              // 'gap-4'

// Flex patterns
<div className={flexPatterns.rowBetween} />
// → 'flex flex-row items-center justify-between gap-4'

// Grid patterns
<div className={gridPatterns.grid1to3} />
// → 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
```

#### Border Radius

```tsx
import { borderRadius } from '@/lib/design-system';

borderRadius.DEFAULT  // '6px'  - UI elements
borderRadius.lg       // '12px' - Cards
borderRadius.xl       // '16px' - Large cards
borderRadius.full     // '9999px' - Pills/circles
```

---

### Shadows

Elevation system for depth and hierarchy.

#### Shadow Scale

```tsx
import { shadows } from '@/lib/design-system';

shadows.sm       // Subtle shadow
shadows.DEFAULT  // Base shadow (cards)
shadows.md       // Medium shadow (hover states)
shadows.lg       // Large shadow (dropdowns)
shadows.xl       // Extra large (modals)
shadows['2xl']   // Maximum (overlays)
```

#### Semantic Shadows

```tsx
import { semanticShadows } from '@/lib/design-system';

semanticShadows.card          // Card shadow
semanticShadows.cardHover     // Card hover state
semanticShadows.dropdown      // Dropdown shadow
semanticShadows.modal         // Modal shadow
```

#### Focus Rings

```tsx
import { focusRing, focusClasses } from '@/lib/design-system';

// Tailwind classes
<button className={focusClasses.default}>
  Button with focus ring
</button>
// → 'focus:ring-2 focus:ring-ring focus:ring-offset-2'
```

---

### Animations

Smooth, consistent motion throughout the UI.

#### Durations

```tsx
import { duration } from '@/lib/design-system';

duration.fast     // '150ms'
duration.normal   // '200ms' ⭐ Default
duration.slow     // '300ms'
```

#### Easing Functions

```tsx
import { easing } from '@/lib/design-system';

easing.smooth    // 'cubic-bezier(0.4, 0.0, 0.2, 1)'
easing.entrance  // 'cubic-bezier(0.0, 0.0, 0.2, 1)'
easing.exit      // 'cubic-bezier(0.4, 0.0, 1, 1)'
```

#### Transition Presets

```tsx
import { transition } from '@/lib/design-system';

transition.button   // 'background-color 150ms ..., box-shadow 150ms ...'
transition.colors   // 'color 200ms ..., background-color 200ms ...'
```

#### Animation Classes

```tsx
import { animationClasses, hoverEffects } from '@/lib/design-system';

// Loading animations
<div className={animationClasses.spin} />      // Spinner
<div className={animationClasses.pulse} />     // Pulse
<div className={animationClasses.shimmer} />   // Shimmer effect

// Hover effects
<div className={hoverEffects.lift} />          // Lift on hover
<div className={hoverEffects.glow} />          // Glow on hover
```

#### Framer Motion Variants

```tsx
import { framerVariants } from '@/lib/design-system';
import { motion } from 'framer-motion';

<motion.div
  variants={framerVariants.modal}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  Modal content
</motion.div>
```

---

### Breakpoints

Mobile-first responsive design.

#### Breakpoint Values

```tsx
import { breakpoints, breakpointValues } from '@/lib/design-system';

breakpoints.sm   // '640px'  - Small tablets
breakpoints.md   // '768px'  - Tablets, small laptops
breakpoints.lg   // '1024px' - Desktops
breakpoints.xl   // '1280px' - Large desktops
breakpoints['2xl'] // '1536px' - Extra large screens
```

#### Media Queries

```tsx
import { mediaQueries } from '@/lib/design-system';

// CSS-in-JS
const styles = {
  base: { fontSize: '16px' },
  [mediaQueries.md]: { fontSize: '18px' },
};

// Special queries
mediaQueries.mobileOnly     // Max-width: 639px
mediaQueries.touchDevice    // Touch-capable devices
mediaQueries.reducedMotion  // Prefers reduced motion
```

#### Utility Functions

```tsx
import { isMobile, isTablet, isDesktop, getCurrentBreakpoint } from '@/lib/design-system';

// Client-side only
if (isMobile()) {
  // Mobile-specific logic
}

const current = getCurrentBreakpoint();
// → 'mobile' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

#### Responsive Patterns

```tsx
import { responsivePatterns } from '@/lib/design-system';

// Show/hide
<div className={responsivePatterns.showOnMobile} />
<div className={responsivePatterns.hideOnMobile} />

// Grids
<div className={responsivePatterns.grid1to3} />
// → 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
```

---

## 🧩 Component Variants

Component variants use `class-variance-authority` (CVA) for type-safe styling.

### Button Variants

```tsx
import { buttonVariants } from '@/lib/component-variants';

<button className={buttonVariants({ variant: 'default', size: 'lg' })}>
  Primary Button
</button>

<button className={buttonVariants({ variant: 'outline', fullWidth: true })}>
  Full Width Outline
</button>

<button className={buttonVariants({ variant: 'destructive', size: 'sm' })}>
  Delete
</button>
```

**Available Variants:**
- `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `success`, `warning`, `info`

**Available Sizes:**
- `sm`, `default`, `lg`, `xl`, `icon`, `iconSm`, `iconLg`

### Badge Variants

```tsx
import { badgeVariants, statusBadgePresets } from '@/lib/component-variants';

<span className={badgeVariants({ variant: 'success' })}>
  Active
</span>

<span className={badgeVariants({ variant: 'warning', size: 'lg' })}>
  Pending
</span>

// Using presets
<span className={badgeVariants(statusBadgePresets.active)}>
  {statusBadgePresets.active.children}
</span>
```

### Card Variants

```tsx
import { cardVariants, cardHeaderVariants } from '@/lib/component-variants';

<div className={cardVariants({ variant: 'elevated', hoverable: true })}>
  <div className={cardHeaderVariants({ border: true })}>
    <h3>Card Title</h3>
  </div>
  <div className={cardContentVariants()}>
    Content
  </div>
</div>
```

---

## 💡 Usage Examples

### Example 1: Dashboard Card

```tsx
import { cardVariants, cardHeaderVariants } from '@/lib/component-variants';
import { colors, spacing } from '@/lib/design-system';

function DashboardCard({ title, value, trend }) {
  return (
    <div className={cardVariants({ variant: 'default', hoverable: true })}>
      <div className={cardHeaderVariants()}>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-success">{trend}</p>
      </div>
    </div>
  );
}
```

### Example 2: Responsive Grid

```tsx
import { gridPatterns, spacing } from '@/lib/design-system';

function ProductGrid({ products }) {
  return (
    <div className={gridPatterns.grid1to4}>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

### Example 3: Animated Modal

```tsx
import { framerVariants } from '@/lib/design-system';
import { componentPresets } from '@/lib/design-system';
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={componentPresets.modal.overlay.classes}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={componentPresets.modal.content.classes}
            variants={framerVariants.modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## ✅ Best Practices

### 1. Use Design Tokens Instead of Hard-coded Values

❌ **Don't:**
```tsx
<div style={{ color: '#1B2951', padding: '24px' }} />
```

✅ **Do:**
```tsx
import { colors, spacing } from '@/lib/design-system';
<div style={{ color: colors.primary.DEFAULT, padding: spacing[6] }} />
```

### 2. Use Component Variants for Consistency

❌ **Don't:**
```tsx
<button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
  Click me
</button>
```

✅ **Do:**
```tsx
import { buttonVariants } from '@/lib/component-variants';
<button className={buttonVariants({ variant: 'default' })}>
  Click me
</button>
```

### 3. Use Semantic Naming

✅ **Do:**
```tsx
semanticSpacing.cardPadding     // Clear intent
semanticShadows.dropdown        // Clear context
```

### 4. Leverage TypeScript

```tsx
import { ColorKey, FontSize } from '@/lib/design-system';

interface ThemeProps {
  color: ColorKey;      // Autocomplete + type safety
  size: FontSize;
}
```

### 5. Use Responsive Patterns

```tsx
import { responsivePatterns } from '@/lib/design-system';

<div className={responsivePatterns.grid1to3}>
  {/* Auto-responsive grid */}
</div>
```

---

## 🤝 Contributing

### Adding New Colors

1. Add to `/lib/design-system/colors.ts`
2. Update CSS variables in `cssVariables`
3. Add to Tailwind config if needed

### Adding New Component Variants

1. Create new file in `/lib/component-variants/[component].ts`
2. Define variants using `cva()`
3. Export from `/lib/component-variants/index.ts`

### Updating Documentation

Update this README when making significant changes to the design system.

---

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Class Variance Authority](https://cva.style/docs)
- [Radix UI](https://www.radix-ui.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📄 License

Internal use only - AssetWorks proprietary design system.

---

**Questions?** Contact the AssetWorks design team or open an issue.

