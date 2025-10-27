/**
 * UI Store - Global UI state management
 * Handles sidebars, modals, toasts, and other UI states
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Sidebar states
  isSidebarOpen: boolean;
  isReportPanelOpen: boolean;
  
  // Modal states
  activeModal: string | null;
  modalData: any;
  
  // Loading states
  globalLoading: boolean;
  loadingMessage: string;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleReportPanel: () => void;
  setReportPanelOpen: (open: boolean) => void;
  
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;
  
  setGlobalLoading: (loading: boolean, message?: string) => void;
  
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial state
      isSidebarOpen: true,
      isReportPanelOpen: true,
      activeModal: null,
      modalData: null,
      globalLoading: false,
      loadingMessage: '',
      theme: 'system',
      
      // Actions
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
      
      toggleReportPanel: () => set((state) => ({ isReportPanelOpen: !state.isReportPanelOpen })),
      setReportPanelOpen: (open) => set({ isReportPanelOpen: open }),
      
      openModal: (modalId, data) => set({ activeModal: modalId, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),
      
      setGlobalLoading: (loading, message = '') => 
        set({ globalLoading: loading, loadingMessage: message }),
      
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        isReportPanelOpen: state.isReportPanelOpen,
        theme: state.theme,
      }),
    }
  )
);

