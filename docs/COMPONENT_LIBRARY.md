# Component Library Guide

## Shared Components

### LoadingState

Standardized loading indicators.

```typescript
import { LoadingState } from '@/components/shared';

// Spinner (default)
<LoadingState message="Loading..." />

// Skeleton
<LoadingState variant="skeleton" />

// Pulse
<LoadingState variant="pulse" size="lg" />

// Full screen
<LoadingState fullScreen message="Initializing..." />
```

**Props:**
- `message?: string` - Loading message
- `variant?: 'spinner' | 'skeleton' | 'pulse'` - Visual style
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `fullScreen?: boolean` - Full screen overlay
- `className?: string` - Additional classes

---

### EmptyState

Consistent empty state displays.

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

**Props:**
- `icon?: LucideIcon` - Icon component
- `title: string` - Main heading
- `description?: string` - Descriptive text
- `action?: { label: string; onClick: () => void }` - Optional action button
- `className?: string` - Additional classes

---

### ErrorState

Standardized error handling UI.

```typescript
import { ErrorState } from '@/components/shared';

// Inline
<ErrorState
  variant="inline"
  message="Failed to save changes"
  onRetry={() => retry()}
/>

// Full screen
<ErrorState
  variant="fullscreen"
  title="Something went wrong"
  message="Please try again or contact support"
  onRetry={() => reload()}
/>
```

**Props:**
- `title?: string` - Error title (default: "Something went wrong")
- `message: string` - Error message
- `onRetry?: () => void` - Retry callback
- `variant?: 'inline' | 'fullscreen'` - Display style
- `className?: string` - Additional classes

---

### ConfirmDialog

Reusable confirmation dialogs.

```typescript
import { ConfirmDialog } from '@/components/shared';

<ConfirmDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Delete Thread"
  description="This action cannot be undone. Are you sure?"
  confirmLabel="Delete"
  variant="destructive"
  onConfirm={() => deleteThread()}
/>
```

**Props:**
- `open: boolean` - Dialog open state
- `onOpenChange: (open: boolean) => void` - State setter
- `title: string` - Dialog title
- `description: string` - Confirmation message
- `confirmLabel?: string` - Confirm button text
- `cancelLabel?: string` - Cancel button text
- `onConfirm: () => void` - Confirmation callback
- `variant?: 'default' | 'destructive'` - Style variant
- `isLoading?: boolean` - Loading state

---

### IconButton

Standardized icon buttons with tooltips.

```typescript
import { IconButton } from '@/components/shared';
import { Settings } from 'lucide-react';

// Icon only (with tooltip)
<IconButton
  icon={Settings}
  label="Open Settings"
  onClick={() => openSettings()}
/>

// With label
<IconButton
  icon={Settings}
  label="Settings"
  onClick={() => openSettings()}
  showLabel={true}
  variant="outline"
/>
```

**Props:**
- `icon: LucideIcon` - Icon component
- `label: string` - Tooltip/accessible label
- `onClick: () => void` - Click handler
- `variant?: 'default' | 'ghost' | 'outline' | 'destructive'`
- `size?: 'sm' | 'default' | 'lg'`
- `disabled?: boolean`
- `showLabel?: boolean` - Show text label
- `className?: string`

---

### StatusBadge

Consistent status indicators.

```typescript
import { StatusBadge } from '@/components/shared';

<StatusBadge status="success" label="Published" />
<StatusBadge status="pending" />
<StatusBadge status="error" label="Failed" showIcon={true} />
```

**Props:**
- `status: 'success' | 'pending' | 'warning' | 'error' | 'loading' | 'idle'`
- `label?: string` - Custom label (default: status name)
- `showIcon?: boolean` - Show status icon
- `className?: string`

---

### DataTable

Flexible data table with sorting and filtering.

```typescript
import { DataTable } from '@/components/shared';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

<DataTable
  columns={columns}
  data={users}
  isLoading={isLoading}
  emptyMessage="No users found"
/>
```

---

## Layout Components

### PageHeader

Consistent page headers.

```typescript
import { PageHeader } from '@/components/layout';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

<PageHeader
  icon={FileText}
  title="Financial Playground"
  subtitle={currentThread?.title}
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button>New Thread</Button>
    </>
  }
/>
```

---

### AppShell

Main application container.

```typescript
import { AppShell } from '@/components/layout';

<AppShell
  header={<PageHeader title="Dashboard" />}
  sidebar={<Sidebar />}
>
  {children}
</AppShell>
```

---

## Hooks

### useDebounce

Debounce values for search and inputs.

```typescript
import { useDebounce } from '@/lib/hooks/shared';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  // API call with debounced value
  searchAPI(debouncedSearch);
}, [debouncedSearch]);
```

---

### useLocalStorage

Type-safe localStorage with React state.

```typescript
import { useLocalStorage } from '@/lib/hooks/shared';

const [theme, setTheme] = useLocalStorage<string>('theme', 'light');
```

---

### useMediaQuery

Responsive design hooks.

```typescript
import { useIsMobile, useIsDesktop } from '@/lib/hooks/shared';

const isMobile = useIsMobile();
const isDesktop = useIsDesktop();

return isMobile ? <MobileView /> : <DesktopView />;
```

---

## State Management (Zustand)

### UI Store

Global UI state.

```typescript
import { useUIStore } from '@/lib/stores/useUIStore';

const { 
  isSidebarOpen, 
  toggleSidebar,
  openModal,
  setGlobalLoading 
} = useUIStore();
```

---

## Utilities

### Formatters

```typescript
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage,
  formatDate,
  formatFileSize,
  truncate 
} from '@/lib/utils/formatters';

formatCurrency(1234.56) // "$1,234.56"
formatNumber(1234567) // "1.2M"
formatPercentage(5.67) // "+5.67%"
formatDate(new Date(), 'relative') // "2h ago"
formatFileSize(1024000) // "1000 KB"
truncate('Long text...', 20) // "Long text..."
```

---

## Examples

### Complete Page Example

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, PageHeader } from '@/components/layout';
import { LoadingState, EmptyState, ErrorState } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { useThreadStore } from '@/lib/stores/useThreadStore';

export default function ThreadsPage() {
  const router = useRouter();
  const { threads, isLoading, error, loadThreads } = useThreadStore();

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  if (isLoading) {
    return <LoadingState fullScreen message="Loading threads..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load threads"
        message={error.message}
        onRetry={loadThreads}
        variant="fullscreen"
      />
    );
  }

  return (
    <AppShell
      header={
        <PageHeader
          icon={FileText}
          title="Threads"
          actions={
            <Button onClick={() => router.push('/threads/new')}>
              <Plus className="w-4 h-4 mr-2" />
              New Thread
            </Button>
          }
        />
      }
    >
      {threads.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Threads"
          description="Create your first thread to get started"
          action={{
            label: "Create Thread",
            onClick: () => router.push('/threads/new')
          }}
        />
      ) : (
        <div className="p-6 space-y-4">
          {threads.map(thread => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
```

---

## Migration Checklist

When refactoring existing pages:

- [ ] Replace hardcoded colors with semantic tokens
- [ ] Extract large components into smaller ones (< 200 lines)
- [ ] Move global state to Zustand stores
- [ ] Use shared components (LoadingState, EmptyState, etc.)
- [ ] Add proper TypeScript types
- [ ] Implement loading states
- [ ] Implement error states
- [ ] Implement empty states
- [ ] Add accessibility attributes
- [ ] Test on mobile/tablet
- [ ] No linter errors
- [ ] No console warnings

