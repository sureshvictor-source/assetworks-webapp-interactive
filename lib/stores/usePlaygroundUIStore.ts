/**
 * Playground UI Store - UI-specific state for Financial Playground
 * Handles sidebar, modals, search, and editing states
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SystemPrompt {
  id: string;
  name: string;
  description: string;
  content: string;
}

interface PlaygroundUIState {
  // UI State
  isSidebarOpen: boolean;
  isShareDialogOpen: boolean;
  isContextModalOpen: boolean;
  contextModalEntity: {type: 'thread' | 'report'; id: string; tokens: number} | null;
  
  // Search & Filtering
  threadSearchQuery: string;
  
  // Thread Editing
  editingThreadId: string | null;
  editingThreadTitle: string;
  
  // System Prompts
  systemPrompts: SystemPrompt[];
  activeSystemPromptId: string;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setShareDialogOpen: (open: boolean) => void;
  setContextModalOpen: (open: boolean) => void;
  setContextModalEntity: (entity: {type: 'thread' | 'report'; id: string; tokens: number} | null) => void;
  
  setThreadSearchQuery: (query: string) => void;
  setEditingThreadId: (id: string | null) => void;
  setEditingThreadTitle: (title: string) => void;
  
  setSystemPrompts: (prompts: SystemPrompt[]) => void;
  setActiveSystemPromptId: (id: string) => void;
  
  // Load system prompts
  loadSystemPrompts: () => Promise<void>;
}

export const usePlaygroundUIStore = create<PlaygroundUIState>()(
  persist(
    (set) => ({
      // Initial state
      isSidebarOpen: true,
      isShareDialogOpen: false,
      isContextModalOpen: false,
      contextModalEntity: null,
      
      threadSearchQuery: '',
      editingThreadId: null,
      editingThreadTitle: '',
      
      systemPrompts: [],
      activeSystemPromptId: 'web-report',
      
      // Actions
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
      setShareDialogOpen: (open) => set({ isShareDialogOpen: open }),
      setContextModalOpen: (open) => set({ isContextModalOpen: open }),
      setContextModalEntity: (entity) => set({ contextModalEntity: entity }),
      
      setThreadSearchQuery: (query) => set({ threadSearchQuery: query }),
      setEditingThreadId: (id) => set({ editingThreadId: id }),
      setEditingThreadTitle: (title) => set({ editingThreadTitle: title }),
      
      setSystemPrompts: (prompts) => set({ systemPrompts: prompts }),
      setActiveSystemPromptId: (id) => set({ activeSystemPromptId: id }),
      
      loadSystemPrompts: async () => {
        try {
          const response = await fetch('/api/playground/settings');
          if (response.ok) {
            const data = await response.json();
            if (data.systemPrompts) {
              set({ systemPrompts: data.systemPrompts });
              if (data.systemPrompts.length > 0 && !get().activeSystemPromptId) {
                set({ activeSystemPromptId: data.systemPrompts[0].id });
              }
            }
          }
        } catch (error) {
          console.error('Error loading system prompts:', error);
        }
      },
    }),
    {
      name: 'playground-ui-storage',
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        activeSystemPromptId: state.activeSystemPromptId,
      }),
    }
  )
);

