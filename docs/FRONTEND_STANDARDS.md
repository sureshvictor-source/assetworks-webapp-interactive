# Frontend Standards & Best Practices

## Overview

This document defines the coding standards, patterns, and best practices for the AssetWorks webapp frontend.

## Core Principles

1. **Consistency** - Use design tokens, not hardcoded values
2. **Reusability** - Extract common patterns into shared components
3. **Type Safety** - TypeScript everywhere, no `any` types
4. **Accessibility** - WCAG 2.1 AA compliance minimum
5. **Performance** - Code splitting, lazy loading, optimized bundles

## Design System

### Color Usage

**Always use semantic tokens:**
```typescript
✅ Good:
- bg-background
- bg-card
- bg-muted
- text-foreground
- text-muted-foreground
- border-border
- text-primary

❌ Bad:
- bg-white
- bg-gray-50
- text-blue-600
- border-gray-200
```

### Spacing Scale

Use the 4px grid system:
```typescript
✅ Standard: p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px)
⚠️ Avoid:  p-3, p-5, p-7 (unless absolutely necessary)
```

### Component Sizes

**Consistent heights:**
- Small: `h-8` (32px)
- Default: `h-9` or `h-10` (36-40px)
- Large: `h-11` or `h-12` (44-48px)

**Icon sizes:**
- Small: `w-3 h-3` or `w-4 h-4` (12-16px)
- Default: `w-5 h-5` (20px)
- Large: `w-6 h-6` (24px)

## Component Structure

### File Organization

```typescript
// 1. Imports (grouped and sorted)
import { useState } from 'react';           // React imports
import { useRouter } from 'next/navigation'; // Next.js imports
import { Button } from '@/components/ui/button'; // UI components
import { useDebounce } from '@/lib/hooks/shared'; // Hooks
import { formatCurrency } from '@/lib/utils/formatters'; // Utils
import type { User } from '@/types'; // Types

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onSave: () => void;
}

// 3. Component
export function MyComponent({ title, onSave }: MyComponentProps) {
  // 4. Hooks (grouped by type)
  const router = useRouter();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);
  
  // 5. Event handlers
  const handleSave = () => {
    onSave();
  };
  
  // 6. Render
  return (
    <div>{title}</div>
  );
}
```

### Naming Conventions

**Components:**
```typescript
✅ PascalCase: UserProfile, DataTable, IconButton
❌ camelCase: userProfile, dataTable
```

**Hooks:**
```typescript
✅ use prefix: useDebounce, useAuth, useThreadManagement
❌ No prefix: debounce, auth
```

**Utils:**
```typescript
✅ camelCase: formatCurrency, validateEmail
❌ PascalCase: FormatCurrency
```

**Constants:**
```typescript
✅ UPPER_SNAKE_CASE: MAX_FILE_SIZE, API_BASE_URL
❌ camelCase: maxFileSize
```

## State Management

### When to use Zustand

Use Zustand stores for:
- ✅ Global UI state (sidebar open/closed, theme)
- ✅ Cross-component data (current user, threads)
- ✅ Persisted preferences
- ✅ Complex state logic

Use local useState for:
- ✅ Form inputs
- ✅ Component-specific UI state (hover, focus)
- ✅ Temporary values
- ✅ Simple toggles

### Store Structure

```typescript
// lib/stores/useMyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyState {
  // State
  value: string;
  isLoading: boolean;
  
  // Actions
  setValue: (value: string) => void;
  fetchData: () => Promise<void>;
}

export const useMyStore = create<MyState>()(
  persist(
    (set, get) => ({
      value: '',
      isLoading: false,
      
      setValue: (value) => set({ value }),
      
      fetchData: async () => {
        set({ isLoading: true });
        try {
          // fetch logic
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'my-storage',
      partialize: (state) => ({ value: state.value }),
    }
  )
);
```

## Component Patterns

### Loading States

```typescript
import { LoadingState } from '@/components/shared';

// Full screen
<LoadingState fullScreen message="Loading data..." />

// Inline
<LoadingState variant="spinner" size="md" />

// Skeleton
<LoadingState variant="skeleton" />
```

### Empty States

```typescript
import { EmptyState } from '@/components/shared';
import { Inbox } from 'lucide-react';

<EmptyState
  icon={Inbox}
  title="No Messages"
  description="Start a conversation to see messages here"
  action={{
    label: "New Message",
    onClick: () => createMessage()
  }}
/>
```

### Error Handling

```typescript
import { ErrorState } from '@/components/shared';

<ErrorState
  title="Failed to load data"
  message="Please try again or contact support"
  onRetry={() => refetch()}
  variant="fullscreen"
/>
```

## Accessibility

### Required Attributes

**Buttons:**
```typescript
<button aria-label="Close dialog" />
<Button aria-label="Save changes">Save</Button>
```

**Icons:**
```typescript
<Icon aria-hidden="true" />  // Decorative
<Icon aria-label="Settings" />  // Interactive
```

**Forms:**
```typescript
<label htmlFor="email">Email</label>
<input id="email" aria-required="true" />
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Use proper semantic HTML (button, a, nav, etc.)
- Implement focus management for modals/dialogs
- Add skip links for screen readers

## Performance

### Code Splitting

```typescript
// Use dynamic imports for large components
const ReportGenerator = dynamic(
  () => import('./ReportGenerator'),
  { ssr: false, loading: () => <LoadingState /> }
);
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="AssetWorks"
  width={120}
  height={40}
  priority  // Above fold images
/>
```

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

// Expensive computations
const filteredData = useMemo(
  () => data.filter(item => item.active),
  [data]
);

// Event handlers
const handleClick = useCallback(
  () => onClick(id),
  [id, onClick]
);
```

## Testing

### Component Tests

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Common Mistakes to Avoid

1. ❌ Hardcoded colors: `className="bg-blue-500"`
   ✅ Use tokens: `className="bg-primary"`

2. ❌ Inline styles: `style={{ color: 'red' }}`
   ✅ Use Tailwind: `className="text-destructive"`

3. ❌ Large components (1000+ lines)
   ✅ Break into smaller pieces (< 200 lines)

4. ❌ Prop drilling 5+ levels
   ✅ Use Zustand store or context

5. ❌ Any types: `data: any`
   ✅ Proper types: `data: User[]`

6. ❌ Missing loading states
   ✅ Always show feedback

7. ❌ No error boundaries
   ✅ Wrap features in ErrorBoundary

## Code Review Checklist

- [ ] Uses semantic color tokens (no hardcoded colors)
- [ ] Proper TypeScript types (no `any`)
- [ ] Accessible (aria-labels, keyboard nav)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Empty states shown
- [ ] Component < 200 lines
- [ ] Follows naming conventions
- [ ] Has proper comments/documentation

