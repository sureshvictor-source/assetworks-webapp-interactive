/**
 * Report Store - Report and section management
 * Handles report generation, sections, and editing
 */

import { create } from 'zustand';
import { toast } from 'react-hot-toast';

interface Report {
  _id: string;
  threadId: string;
  htmlContent?: string;
  isInteractiveMode?: boolean;
  insights: any[];
}

interface Section {
  _id: string;
  reportId: string;
  type: string;
  title: string;
  htmlContent: string;
  order: number;
  version: number;
}

interface ReportState {
  // State
  currentReport: Report | null;
  sections: Section[];
  isLoadingSections: boolean;
  selectedSectionId: string | null;
  editingContext: {
    type: 'edit' | 'add';
    sectionId?: string;
    section?: Section;
    position?: number;
  } | null;
  sectionPreviewContent: Record<string, string>;
  sectionStreamingState: Record<string, boolean>;
  collapsedSections: Record<string, boolean>;
  
  // Actions
  setCurrentReport: (report: Report | null) => void;
  setSections: (sections: Section[]) => void;
  setSelectedSectionId: (id: string | null) => void;
  setEditingContext: (context: any) => void;
  setSectionPreviewContent: (content: Record<string, string>) => void;
  setSectionStreamingState: (state: Record<string, boolean>) => void;
  toggleSectionCollapse: (sectionId: string) => void;
  
  // Async actions
  loadSections: (reportId: string) => Promise<void>;
  updateSection: (reportId: string, sectionId: string, prompt: string) => Promise<void>;
  deleteSection: (reportId: string, sectionId: string) => Promise<void>;
  duplicateSection: (reportId: string, sectionId: string) => Promise<void>;
  moveSection: (reportId: string, sectionId: string, direction: 'up' | 'down') => Promise<void>;
}

export const useReportStore = create<ReportState>((set, get) => ({
  // Initial state
  currentReport: null,
  sections: [],
  isLoadingSections: false,
  selectedSectionId: null,
  editingContext: null,
  sectionPreviewContent: {},
  sectionStreamingState: {},
  collapsedSections: {},
  
  // Simple setters
  setCurrentReport: (report) => set({ currentReport: report }),
  setSections: (sections) => set({ sections }),
  setSelectedSectionId: (id) => set({ selectedSectionId: id }),
  setEditingContext: (context) => set({ editingContext: context }),
  setSectionPreviewContent: (content) => set({ sectionPreviewContent: content }),
  setSectionStreamingState: (state) => set({ sectionStreamingState: state }),
  
  toggleSectionCollapse: (sectionId) => set((state) => ({
    collapsedSections: {
      ...state.collapsedSections,
      [sectionId]: !state.collapsedSections[sectionId],
    },
  })),
  
  // Async actions
  loadSections: async (reportId: string) => {
    set({ isLoadingSections: true });
    try {
      const response = await fetch(`/api/playground/reports/${reportId}/sections`);
      if (response.ok) {
        const data = await response.json();
        set({ sections: data.sections || [] });
      }
    } catch (error) {
      console.error('Error loading sections:', error);
      toast.error('Failed to load sections');
    } finally {
      set({ isLoadingSections: false });
    }
  },
  
  updateSection: async (reportId: string, sectionId: string, prompt: string) => {
    const state = get();
    
    // Set streaming state
    set({
      sectionStreamingState: {
        ...state.sectionStreamingState,
        [sectionId]: true,
      },
    });
    
    try {
      const response = await fetch(
        `/api/playground/reports/${reportId}/sections/${sectionId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        }
      );
      
      if (response.ok) {
        await get().loadSections(reportId);
        toast.success('Section updated');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error('Failed to update section');
    } finally {
      set({
        sectionStreamingState: {
          ...get().sectionStreamingState,
          [sectionId]: false,
        },
      });
    }
  },
  
  deleteSection: async (reportId: string, sectionId: string) => {
    try {
      const response = await fetch(
        `/api/playground/reports/${reportId}/sections/${sectionId}`,
        {
          method: 'DELETE',
        }
      );
      
      if (response.ok) {
        set((state) => ({
          sections: state.sections.filter(s => s._id !== sectionId),
        }));
        toast.success('Section deleted');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to delete section');
    }
  },
  
  duplicateSection: async (reportId: string, sectionId: string) => {
    try {
      const response = await fetch(
        `/api/playground/reports/${reportId}/sections/${sectionId}/duplicate`,
        {
          method: 'POST',
        }
      );
      
      if (response.ok) {
        await get().loadSections(reportId);
        toast.success('Section duplicated');
      }
    } catch (error) {
      console.error('Error duplicating section:', error);
      toast.error('Failed to duplicate section');
    }
  },
  
  moveSection: async (reportId: string, sectionId: string, direction: 'up' | 'down') => {
    try {
      const response = await fetch(
        `/api/playground/reports/${reportId}/sections/${sectionId}/move`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ direction }),
        }
      );
      
      if (response.ok) {
        await get().loadSections(reportId);
      }
    } catch (error) {
      console.error('Error moving section:', error);
      toast.error('Failed to move section');
    }
  },
}));

