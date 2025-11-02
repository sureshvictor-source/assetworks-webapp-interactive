# AssetWorks Design System - Integration Guide

**Version:** 1.0.0
**Date:** November 2, 2025

> Complete guide for integrating the AssetWorks Design System into your projects.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [File Structure](#file-structure)
3. [Tailwind Configuration](#tailwind-configuration)
4. [Global CSS Setup](#global-css-setup)
5. [TypeScript Configuration](#typescript-configuration)
6. [Usage in Components](#usage-in-components)
7. [Migration Guide](#migration-guide)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Ensure you have the following dependencies installed:

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

Install if missing:

```bash
npm install class-variance-authority clsx tailwind-merge
```

---

## 📁 File Structure

The design system is organized as follows:

```
lib/
├── design-system/
│   ├── colors.ts           # Color tokens
│   ├── typography.ts       # Typography tokens
│   ├── spacing.ts          # Spacing tokens
│   ├── shadows.ts          # Shadow tokens
│   ├── animations.ts       # Animation tokens
│   ├── breakpoints.ts      # Breakpoint tokens
│   ├── index.ts            # Main export
│   └── README.md           # Documentation
│
├── component-variants/
│   ├── button.ts           # Button variants
│   ├── badge.ts            # Badge variants
│   ├── card.ts             # Card variants
│   └── index.ts            # Main export
│
└── utils.ts                # cn() utility
```

---

## ⚙️ Tailwind Configuration

### Step 1: Update `tailwind.config.ts`

Extend your Tailwind configuration to use design system tokens:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { colors, fontFamily, fontSize, spacing, borderRadius, shadows } from './lib/design-system';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors from design system
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        danger: colors.danger,
        info: colors.info,
        idle: colors.idle,
        border: colors.border.DEFAULT,
        input: colors.border.DEFAULT,
        ring: colors.ring.DEFAULT,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },

      // Typography
      fontFamily: fontFamily,
      fontSize: fontSize,

      // Spacing
      spacing: spacing,

      // Border radius
      borderRadius: borderRadius,

      // Box shadow
      boxShadow: shadows,

      // Animation
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in',
        'slide-in-right': 'slide-in-right 0.3s ease-in',
        'scale-in': 'scale-in 0.2s ease-in',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 🎨 Global CSS Setup

### Step 2: Update `app/globals.css`

Add CSS variables for theming:

```css
/* app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Primary colors */
    --primary: 222 47% 19%;              /* #1B2951 */
    --primary-foreground: 0 0% 100%;     /* #FFFFFF */

    /* Secondary colors */
    --secondary: 220 17% 51%;            /* #6C7B95 */
    --secondary-foreground: 0 0% 100%;   /* #FFFFFF */

    /* Accent colors */
    --accent: 209 33% 37%;               /* #405D80 */
    --accent-foreground: 0 0% 100%;      /* #FFFFFF */

    /* Destructive/Danger */
    --destructive: 354 70% 54%;          /* #DC3545 */
    --destructive-foreground: 0 0% 100%; /* #FFFFFF */

    /* Status colors */
    --success: 160 84% 39%;              /* #10B981 */
    --warning: 38 92% 50%;               /* #F59E0B */
    --error: 0 84% 60%;                  /* #EF4444 */
    --info: 217 91% 60%;                 /* #3B82F6 */

    /* Background & Foreground */
    --background: 0 0% 100%;             /* #FFFFFF */
    --foreground: 222 47% 19%;           /* #2C3E50 */

    /* Card */
    --card: 0 0% 100%;                   /* #FFFFFF */
    --card-foreground: 222 47% 19%;      /* #2C3E50 */

    /* Popover */
    --popover: 0 0% 100%;                /* #FFFFFF */
    --popover-foreground: 222 47% 19%;   /* #2C3E50 */

    /* Muted */
    --muted: 210 17% 98%;                /* #F8F9FA */
    --muted-foreground: 220 9% 46%;      /* #6C757D */

    /* Border & Input */
    --border: 210 16% 93%;               /* #E9ECEF */
    --input: 210 16% 93%;                /* #E9ECEF */

    /* Ring (focus) */
    --ring: 222 47% 19%;                 /* #1B2951 */

    /* Border radius */
    --radius: 0.5rem;                    /* 8px */
  }

  .dark {
    /* Dark mode overrides */
    --primary: 222 47% 19%;
    --primary-foreground: 0 0% 100%;

    --background: 222 47% 11%;           /* Darker navy */
    --foreground: 210 17% 98%;           /* Light text */

    --card: 222 47% 14%;
    --card-foreground: 210 17% 98%;

    --muted: 222 47% 17%;
    --muted-foreground: 220 17% 65%;

    --border: 222 47% 20%;
    --input: 222 47% 20%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  /* Typography base styles */
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold tracking-tight;
  }

  h1 { @apply text-5xl font-bold leading-tight; }
  h2 { @apply text-4xl font-semibold leading-tight; }
  h3 { @apply text-3xl font-semibold; }
  h4 { @apply text-2xl font-medium; }
  h5 { @apply text-xl font-medium; }
  h6 { @apply text-base font-medium; }
}
```

---

## 🔧 TypeScript Configuration

### Step 3: Update Path Aliases

Ensure your `tsconfig.json` includes the correct path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/lib/*": ["./lib/*"],
      "@/components/*": ["./components/*"]
    }
  }
}
```

---

## 🚀 Usage in Components

### Example 1: Using Design Tokens

```tsx
// components/MyCard.tsx
import { colors, spacing, shadows } from '@/lib/design-system';

export function MyCard() {
  return (
    <div
      style={{
        backgroundColor: colors.card.DEFAULT,
        padding: spacing[6],
        borderRadius: '12px',
        boxShadow: shadows.DEFAULT,
      }}
    >
      <h3 style={{ color: colors.primary.DEFAULT }}>Card Title</h3>
      <p style={{ color: colors.foreground.secondary }}>Card content</p>
    </div>
  );
}
```

### Example 2: Using Component Variants

```tsx
// components/MyButton.tsx
import { buttonVariants } from '@/lib/component-variants';

export function MyButton() {
  return (
    <button className={buttonVariants({ variant: 'default', size: 'lg' })}>
      Click me
    </button>
  );
}
```

### Example 3: Combining Tokens and Variants

```tsx
// components/Dashboard.tsx
import { gridPatterns, spacing } from '@/lib/design-system';
import { cardVariants } from '@/lib/component-variants';

export function Dashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className={gridPatterns.dashboard}>
        <div className={cardVariants({ variant: 'default', hoverable: true })}>
          <h3>Total Revenue</h3>
          <p className="text-3xl font-bold">$45,231.89</p>
        </div>

        <div className={cardVariants({ variant: 'default', hoverable: true })}>
          <h3>Active Users</h3>
          <p className="text-3xl font-bold">2,350</p>
        </div>
      </div>
    </div>
  );
}
```

### Example 4: Responsive Design

```tsx
// components/ResponsiveLayout.tsx
import { responsivePatterns } from '@/lib/design-system';

export function ResponsiveLayout() {
  return (
    <div className="container">
      {/* Mobile: stacked, Desktop: side-by-side */}
      <div className={responsivePatterns.stackOnMobile}>
        <aside className="w-full md:w-1/4">Sidebar</aside>
        <main className="w-full md:w-3/4">Content</main>
      </div>
    </div>
  );
}
```

---

## 🔄 Migration Guide

### Migrating from Hard-coded Values

#### Before:
```tsx
<button
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
>
  Click me
</button>
```

#### After:
```tsx
import { buttonVariants } from '@/lib/component-variants';

<button className={buttonVariants({ variant: 'default' })}>
  Click me
</button>
```

### Migrating from Inline Styles

#### Before:
```tsx
<div style={{ color: '#1B2951', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
  Content
</div>
```

#### After:
```tsx
import { colors, spacing, shadows } from '@/lib/design-system';

<div style={{
  color: colors.primary.DEFAULT,
  padding: spacing[6],
  boxShadow: shadows.DEFAULT
}}>
  Content
</div>
```

Or using Tailwind:
```tsx
<div className="text-primary p-6 shadow">
  Content
</div>
```

### Updating Existing Components

1. **Identify hard-coded values** in your components
2. **Find equivalent design tokens** from the design system
3. **Replace with token imports**
4. **Test visual consistency**

---

## 🐛 Troubleshooting

### Issue: CSS Variables Not Working

**Problem:** Colors showing as `hsl(var(--primary))` instead of actual color.

**Solution:** Ensure `globals.css` is imported in your root layout:

```tsx
// app/layout.tsx
import './globals.css';
```

### Issue: TypeScript Autocomplete Not Working

**Problem:** No autocomplete for design tokens.

**Solution:** Ensure TypeScript is configured with proper paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: Tailwind Classes Not Applied

**Problem:** Design system classes not working.

**Solution:** Add design system paths to Tailwind content array:

```typescript
// tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}', // ← Add this
  ],
};
```

### Issue: `cva is not defined`

**Problem:** `class-variance-authority` not installed.

**Solution:**
```bash
npm install class-variance-authority
```

---

## 📚 Next Steps

1. ✅ Review the [Design System README](./lib/design-system/README.md)
2. ✅ Explore [component examples](#usage-in-components)
3. ✅ Start migrating existing components
4. ✅ Create new components using the design system
5. ✅ Share feedback with the team

---

## 🤝 Support

For questions or issues:
- Check the [Design System README](./lib/design-system/README.md)
- Review the [Troubleshooting](#troubleshooting) section
- Contact the AssetWorks design team

---

**Happy coding! 🚀**
