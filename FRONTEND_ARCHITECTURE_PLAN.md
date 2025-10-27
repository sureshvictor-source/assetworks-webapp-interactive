# Frontend Architecture Plan - AssetWorks WebApp

## Executive Summary

Transform the AssetWorks webapp into a solid, scalable frontend architecture with:
- **Comprehensive Design System** - Reusable component library with consistent styling
- **State Management** - Zustand for clean, type-safe global state
- **Application-Wide Standards** - Consistent patterns across all 20+ pages
- **Component Library First** - Build foundation before refactoring

## Current State Analysis

### Issues Identified

1. **State Management**
   - 24+ useState calls in single component (financial-playground/page.tsx - 1731 lines)
   - No global state management
   - Prop drilling through multiple components
   - Difficult to share state across features

2. **Inconsistent Styling**
   - 19+ files with hardcoded colors (bg-gray-*, text-blue-*, etc.)
   - Mixed use of semantic tokens and hardcoded values
   - No consistent spacing system
   - Duplicate component patterns

3. **Component Architecture**
   - Large page components (1731 lines)
   - Business logic mixed with UI
   - Components not reusable
   - No clear separation of concerns

4. **Design System**
   - 17 UI components (shadcn/ui)
   - No documented design patterns
   - Inconsistent component APIs
   - No storybook or component showcase

### Assets We Have

- ✅ Tailwind CSS with semantic color tokens
- ✅ 17 shadcn/ui base components
- ✅ AssetWorks brand guidelines (#1B2951 primary navy)
- ✅ TypeScript for type safety
- ✅ Next.js 15 App Router

## Architecture Plan

### Phase 1: Foundation Setup (Week 1)

#### 1.1 Install Dependencies

```bash
npm install zustand immer
npm install --save-dev @storybook/react @storybook/nextjs
```

**Deliverables:**
- `package.json` updated with Zustand and Storybook
- Initial Storybook configuration

#### 1.2 Design System Documentation

**Create:** `lib/design-system/`
```
lib/design-system/
├── tokens.ts          # Color, spacing, typography tokens
├── theme.ts           # Theme configuration
├── constants.ts       # Breakpoints, z-index, animations
└── README.md          # Design system documentation
```

**File: `lib/design-system/tokens.ts`**
```typescript
export const colors = {
  // Brand colors from AssetWorks guidelines
  primary: {
    navy: '#1B2951',
    blue: '#2E5BFF',
    selection: '#6C7B95',
  },
  // Semantic tokens
  text: {
    heavy: '#2C3E50',
    body: '#4A5568',
    light: '#718096',
    muted: '#A0AEC0',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#E2E8F0',
  },
  // Status colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
} as const;

export const typography = {
  fontFamily: {
    sans: '"Euclid Circular A", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
} as const;
```

### Phase 2: State Management (Week 1-2)

#### 2.1 Zustand Store Architecture

**Create:** `lib/stores/`
```
lib/stores/
├── index.ts                    # Store exports
├── usePlaygroundStore.ts       # Financial playground state
├── useThreadStore.ts           # Thread management
├── useReportStore.ts           # Report generation & display
├── useUIStore.ts               # UI state (sidebar, modals)
└── middleware/
    ├── persist.ts              # LocalStorage persistence
    └── logger.ts               # Development logging
```

**File: `lib/stores/usePlaygroundStore.ts`**
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

interface Thread {
  _id: string;
  title: string;
  status: string;
  updatedAt: string;
}

interface Message {
  id: string;
  threadId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface PlaygroundState {
  // Thread state
  threads: Thread[];
  currentThread: Thread | null;
  isLoadingThreads: boolean;
  
  // Message state
  messages: Message[];
  inputMessage: string;
  isLoading: boolean;
  
  // Actions
  setThreads: (threads: Thread[]) => void;
  setCurrentThread: (thread: Thread | null) => void;
  addMessage: (message: Message) => void;
  setInputMessage: (message: string) => void;
  clearMessages: () => void;
  
  // Async actions
  loadThreads: () => Promise<void>;
  loadThread: (threadId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    immer((set, get) => ({
      // Initial state
      threads: [],
      currentThread: null,
      isLoadingThreads: false,
      messages: [],
      inputMessage: '',
      isLoading: false,
      
      // Simple setters
      setThreads: (threads) => set({ threads }),
      setCurrentThread: (thread) => set({ currentThread: thread }),
      addMessage: (message) => set((state) => {
        state.messages.push(message);
      }),
      setInputMessage: (message) => set({ inputMessage: message }),
      clearMessages: () => set({ messages: [] }),
      
      // Async actions
      loadThreads: async () => {
        set({ isLoadingThreads: true });
        try {
          const response = await fetch('/api/playground/threads');
          if (response.ok) {
            const data = await response.json();
            set({ threads: data.threads || [] });
          }
        } finally {
          set({ isLoadingThreads: false });
        }
      },
      
      loadThread: async (threadId: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`/api/playground/threads/${threadId}`);
          if (response.ok) {
            const data = await response.json();
            set({
              currentThread: data.thread,
              messages: data.messages || [],
            });
          }
        } finally {
          set({ isLoading: false });
        }
      },
      
      sendMessage: async (content: string) => {
        const { currentThread } = get();
        if (!currentThread) return;
        
        set({ isLoading: true });
        try {
          const response = await fetch('/api/playground/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              threadId: currentThread._id,
              role: 'user',
              content,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            get().addMessage(data.message);
            set({ inputMessage: '' });
          }
        } finally {
          set({ isLoading: false });
        }
      },
    })),
    {
      name: 'playground-storage',
      partialize: (state) => ({
        currentThread: state.currentThread,
      }),
    }
  )
);
```

### Phase 3: Component Library (Week 2-3)

#### 3.1 Core Layout Components

**Create:** `components/layout/`
```
components/layout/
├── AppShell.tsx              # Main app container
├── PageHeader.tsx            # Reusable page header
├── Sidebar.tsx               # Collapsible sidebar
├── MainContent.tsx           # Content area wrapper
├── ThreeColumnLayout.tsx     # 3-panel layout (threads/chat/report)
└── index.ts                  # Barrel exports
```

**File: `components/layout/AppShell.tsx`**
```typescript
import { cn } from '@/lib/utils';

interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ header, sidebar, children, className }: AppShellProps) {
  return (
    <div className={cn('h-screen flex flex-col bg-background', className)}>
      {header}
      <div className="flex-1 flex overflow-hidden">
        {sidebar}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

**File: `components/layout/PageHeader.tsx`**
```typescript
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ 
  icon: Icon, 
  title, 
  subtitle, 
  actions, 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn(
      'h-16 bg-card border-b border-border flex items-center justify-between px-6',
      className
    )}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-6 h-6 text-primary" />}
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <span className="text-sm text-muted-foreground">· {subtitle}</span>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
```

#### 3.2 Feature-Specific Components

**Create:** `components/playground/` (organized components)
```
components/playground/
├── ThreadList/
│   ├── ThreadList.tsx
│   ├── ThreadItem.tsx
│   ├── ThreadSearch.tsx
│   └── index.ts
├── MessagePanel/
│   ├── MessagePanel.tsx
│   ├── MessageList.tsx
│   ├── MessageInput.tsx
│   └── index.ts
├── ReportPanel/
│   ├── ReportPanel.tsx
│   ├── ReportViewer.tsx
│   ├── SectionEditor.tsx
│   └── index.ts
└── Shared/
    ├── AIModelSelector.tsx
    ├── SystemPromptSelector.tsx
    └── index.ts
```

**File: `components/playground/Shared/SystemPromptSelector.tsx`**
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Globe, TrendingUp, Code, Sparkles } from 'lucide-react';

interface SystemPrompt {
  id: string;
  name: string;
  description: string;
}

interface SystemPromptSelectorProps {
  prompts: SystemPrompt[];
  value: string;
  onChange: (promptId: string) => void;
}

const getPromptIcon = (promptName: string) => {
  const name = promptName?.toLowerCase() || '';
  if (name.includes('web') || name.includes('dashboard')) {
    return <Globe className="w-4 h-4 text-primary" />;
  }
  if (name.includes('financial') || name.includes('stock')) {
    return <TrendingUp className="w-4 h-4 text-primary" />;
  }
  if (name.includes('technical') || name.includes('code')) {
    return <Code className="w-4 h-4 text-primary" />;
  }
  return <Sparkles className="w-4 h-4 text-primary" />;
};

export function SystemPromptSelector({ prompts, value, onChange }: SystemPromptSelectorProps) {
  const selectedPrompt = prompts.find(p => p.id === value);
  
  return (
    <div className="border-t border-border px-4 py-3 bg-muted/30">
      <div className="flex items-center gap-3">
        <Bot className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="h-9 min-w-[220px] border-border/50">
            <SelectValue>
              <div className="flex items-center gap-2">
                {getPromptIcon(selectedPrompt?.name || '')}
                <span className="text-sm font-medium">
                  {selectedPrompt?.name || 'Select mode'}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="min-w-[300px]">
            {prompts.map((prompt) => (
              <SelectItem key={prompt.id} value={prompt.id} className="py-3">
                <div className="flex items-center gap-3">
                  {getPromptIcon(prompt.name)}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{prompt.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {prompt.description}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

### Phase 4: Design Patterns & Standards (Week 3)

#### 4.1 Coding Patterns Document

**Create:** `docs/FRONTEND_STANDARDS.md`

**Content:**
- Component structure guidelines
- Naming conventions
- File organization
- State management patterns
- Testing requirements
- Accessibility standards

#### 4.2 Style Guide

**Rules:**
1. **Always use semantic color tokens**
   - ✅ `bg-background`, `text-foreground`, `border-border`
   - ❌ `bg-gray-50`, `text-blue-600`, `border-gray-200`

2. **Consistent spacing scale**
   - Use: `p-2`, `p-4`, `p-6`, `p-8` (4, 16, 24, 32px)
   - Avoid: `p-3`, `p-5`, `p-7` unless necessary

3. **Component size variants**
   - sm: `h-8`, xs text, compact padding
   - default: `h-9` or `h-10`, standard padding
   - lg: `h-11` or `h-12`, generous padding

4. **Icon usage**
   - Standard size: `w-4 h-4` (16px)
   - Large: `w-6 h-6` (24px)
   - Always include aria-label or title

### Phase 5: Migration Strategy (Week 4-6)

#### 5.1 Priority Order

**High Priority (Week 4):**
1. Financial Playground (app/financial-playground/page.tsx)
2. Dashboard (app/dashboard/page.tsx)
3. Authentication pages (app/auth/*)

**Medium Priority (Week 5):**
4. Widget pages (app/widget/[id]/page.tsx)
5. Markets (app/markets/page.tsx)
6. Settings (app/settings/page.tsx)

**Low Priority (Week 6):**
7. Demo pages (app/shadcn-demo, app/primereact-demo)
8. Other utility pages

#### 5.2 Migration Checklist (Per Page)

- [ ] Extract business logic to custom hooks
- [ ] Replace local state with Zustand stores (where applicable)
- [ ] Replace hardcoded colors with semantic tokens
- [ ] Break large components into smaller ones (<200 lines each)
- [ ] Use layout components (AppShell, PageHeader)
- [ ] Add loading states and error boundaries
- [ ] Implement proper TypeScript types
- [ ] Add accessibility attributes
- [ ] Test on mobile/tablet
- [ ] Document any page-specific patterns

### Phase 6: Refactor Financial Playground (Week 4)

#### 6.1 Component Breakdown

**Current:** 1 file, 1731 lines, 24 state variables

**Target:** Modular architecture

```
app/financial-playground/
├── page.tsx                    # Main page (< 200 lines)
├── layout.tsx
├── hooks/
│   ├── useThreadManagement.ts
│   ├── useMessageHandling.ts
│   ├── useReportGeneration.ts
│   └── useSectionEditing.ts
├── components/
│   ├── ThreadSidebar.tsx
│   ├── ChatPanel.tsx
│   ├── ReportPanel.tsx
│   └── AIControlBar.tsx
└── types.ts
```

**File: `app/financial-playground/hooks/useThreadManagement.ts`**
```typescript
import { usePlaygroundStore } from '@/lib/stores';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useThreadManagement() {
  const { 
    threads, 
    currentThread, 
    isLoadingThreads,
    loadThreads,
    loadThread,
    setCurrentThread,
  } = usePlaygroundStore();

  const createThread = useCallback(async (title: string) => {
    try {
      const response = await fetch('/api/playground/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      
      if (response.ok) {
        const data = await response.json();
        await loadThread(data.thread._id);
        toast.success('Thread created');
        return data.thread;
      }
    } catch (error) {
      toast.error('Failed to create thread');
      throw error;
    }
  }, [loadThread]);

  const deleteThread = useCallback(async (threadId: string) => {
    try {
      const response = await fetch(`/api/playground/threads/${threadId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await loadThreads();
        if (currentThread?._id === threadId) {
          setCurrentThread(null);
        }
        toast.success('Thread deleted');
      }
    } catch (error) {
      toast.error('Failed to delete thread');
      throw error;
    }
  }, [loadThreads, currentThread, setCurrentThread]);

  return {
    threads,
    currentThread,
    isLoadingThreads,
    loadThreads,
    loadThread,
    createThread,
    deleteThread,
  };
}
```

## Implementation Timeline

### Week 1: Foundation
- [ ] Install Zustand and Storybook
- [ ] Create design system tokens
- [ ] Set up folder structure
- [ ] Document standards

### Week 2: Core Infrastructure
- [ ] Build Zustand stores (playground, thread, report, UI)
- [ ] Create layout components (AppShell, PageHeader, etc.)
- [ ] Build shared components library
- [ ] Set up Storybook for component showcase

### Week 3: Component Library
- [ ] Build 15+ reusable components
- [ ] Document each in Storybook
- [ ] Create hooks for common patterns
- [ ] Establish testing patterns

### Week 4: Financial Playground Refactor
- [ ] Extract to custom hooks
- [ ] Migrate state to Zustand
- [ ] Break into smaller components
- [ ] Apply design system
- [ ] Test thoroughly

### Week 5: Dashboard & Core Pages
- [ ] Refactor Dashboard
- [ ] Migrate Auth pages
- [ ] Apply design system
- [ ] Test thoroughly

### Week 6: Remaining Pages & Polish
- [ ] Migrate all remaining pages
- [ ] Final consistency check
- [ ] Performance optimization
- [ ] Documentation completion

## File Structure (After Migration)

```
assetworks-webapp/
├── app/                                    # Next.js app router
│   ├── (auth)/                            # Auth route group
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/                       # Dashboard route group
│   │   ├── dashboard/
│   │   ├── markets/
│   │   └── widgets/
│   ├── financial-playground/
│   │   ├── page.tsx                       # < 200 lines
│   │   ├── hooks/                         # Custom hooks
│   │   ├── components/                    # Page-specific components
│   │   └── types.ts                       # Page-specific types
│   └── layout.tsx
├── components/
│   ├── layout/                            # Layout components
│   │   ├── AppShell.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThreeColumnLayout.tsx
│   ├── playground/                        # Feature components
│   │   ├── ThreadList/
│   │   ├── MessagePanel/
│   │   ├── ReportPanel/
│   │   └── Shared/
│   ├── ui/                                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── shared/                            # App-wide shared components
│       ├── EmptyState.tsx
│       ├── LoadingState.tsx
│       ├── ErrorState.tsx
│       └── ConfirmDialog.tsx
├── lib/
│   ├── design-system/                     # Design tokens & theme
│   │   ├── tokens.ts
│   │   ├── theme.ts
│   │   └── constants.ts
│   ├── stores/                            # Zustand stores
│   │   ├── usePlaygroundStore.ts
│   │   ├── useThreadStore.ts
│   │   ├── useReportStore.ts
│   │   └── useUIStore.ts
│   ├── hooks/                             # Shared custom hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   └── utils/                             # Utility functions
│       ├── cn.ts
│       ├── formatters.ts
│       └── validators.ts
└── docs/
    ├── FRONTEND_STANDARDS.md              # Coding standards
    ├── COMPONENT_LIBRARY.md               # Component usage guide
    └── STATE_MANAGEMENT.md                # Zustand patterns
```

## Benefits

### Immediate
- Clean, maintainable code
- Consistent UI across all pages
- Type-safe state management
- Reusable components

### Long-term
- Faster feature development
- Easier onboarding for new developers
- Better performance (code splitting)
- Scalable architecture

### Developer Experience
- Clear patterns to follow
- Component documentation (Storybook)
- Type safety throughout
- Easy to find and fix bugs

## Success Metrics

### Code Quality
- Component files < 200 lines
- No hardcoded colors (100% semantic tokens)
- All components have TypeScript types
- All interactive elements are accessible

### Performance
- Initial page load < 3s
- Time to interactive < 2s
- Lighthouse score > 90

### Consistency
- All pages use layout components
- All pages use design system
- All state managed via Zustand
- All components follow naming conventions

## Next Steps

1. **Review and Approve Plan** - Ensure alignment with team
2. **Week 1 Start** - Install dependencies and set up foundation
3. **Incremental Delivery** - Each week delivers working features
4. **Continuous Testing** - Test after each phase
5. **Documentation** - Update docs as we build

## Estimated Effort

- **Total Time:** 6 weeks (with 1-2 developers)
- **Can be done incrementally** - App remains functional throughout
- **High ROI** - Pays off in reduced maintenance and faster feature dev

## Risk Mitigation

1. **Feature Flags** - Can toggle between old and new implementations
2. **Incremental Migration** - One page at a time
3. **Comprehensive Testing** - No broken functionality
4. **Rollback Plan** - Keep backups at each phase
5. **Documentation** - Clear guide for team adoption

---

**This plan transforms the frontend into a world-class, maintainable architecture that scales with your business.**

