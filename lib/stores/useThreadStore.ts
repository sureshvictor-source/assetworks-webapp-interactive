/**
 * Thread Store - Thread and message management
 * Handles threads, messages, and chat interactions
 */

import { create } from 'zustand';
import { toast } from 'react-hot-toast';

interface Thread {
  _id: string;
  title: string;
  description?: string;
  status: string;
  updatedAt: string;
}

interface Message {
  id: string;
  threadId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  metadata?: any;
}

interface ThreadState {
  // State
  threads: Thread[];
  currentThread: Thread | null;
  messages: Message[];
  isLoadingThreads: boolean;
  inputMessage: string;
  streamingContent: string;
  streamingUsage: {inputTokens: number; outputTokens: number} | null;
  
  // Actions
  setThreads: (threads: Thread[]) => void;
  setCurrentThread: (thread: Thread | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setInputMessage: (message: string) => void;
  setStreamingContent: (content: string) => void;
  setStreamingUsage: (usage: {inputTokens: number; outputTokens: number} | null) => void;
  
  // Async actions
  loadThreads: () => Promise<void>;
  loadThread: (threadId: string) => Promise<any>;
  createThread: (title: string, description?: string) => Promise<Thread | null>;
  deleteThread: (threadId: string) => Promise<void>;
  renameThread: (threadId: string, newTitle: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

export const useThreadStore = create<ThreadState>((set, get) => ({
  // Initial state
  threads: [],
  currentThread: null,
  messages: [],
  isLoadingThreads: false,
  inputMessage: '',
  streamingContent: '',
  streamingUsage: null,
  
  // Simple setters
  setThreads: (threads) => set({ threads }),
  setCurrentThread: (thread) => set({ currentThread: thread }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setInputMessage: (message) => set({ inputMessage: message }),
  setStreamingContent: (content) => set({ streamingContent: content }),
  setStreamingUsage: (usage) => set({ streamingUsage: usage }),
  
  // Async actions
  loadThreads: async () => {
    set({ isLoadingThreads: true });
    try {
      const response = await fetch('/api/playground/threads');
      if (response.ok) {
        const data = await response.json();
        set({ threads: data.threads || [] });
      }
    } catch (error) {
      console.error('Error loading threads:', error);
      toast.error('Failed to load threads');
    } finally {
      set({ isLoadingThreads: false });
    }
  },
  
  loadThread: async (threadId: string) => {
    try {
      const response = await fetch(`/api/playground/threads/${threadId}`);
      if (response.ok) {
        const data = await response.json();
        set({
          currentThread: data.thread,
          messages: data.messages || [],
          streamingContent: '',
        });

        // Always reset interactive mode when loading from URL
        // This ensures consistent behavior when sharing links
        if (data.currentReport) {
          data.currentReport = {
            ...data.currentReport,
            isInteractiveMode: false  // Always start in view mode
          };
        }

        return data;
      }
    } catch (error) {
      console.error('Error loading thread:', error);
      toast.error('Failed to load conversation');
    }
    return null;
  },
  
  createThread: async (title: string, description?: string) => {
    try {
      const response = await fetch('/api/playground/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const newThread = data.thread || data.data;
        set((state) => ({
          threads: [newThread, ...state.threads],
          currentThread: newThread,
          messages: [],
        }));
        toast.success('Thread created');
        return newThread;
      }
    } catch (error) {
      console.error('Error creating thread:', error);
      toast.error('Failed to create thread');
    }
    return null;
  },
  
  deleteThread: async (threadId: string) => {
    try {
      const response = await fetch(`/api/playground/threads/${threadId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        set((state) => ({
          threads: state.threads.filter(t => t._id !== threadId),
          currentThread: state.currentThread?._id === threadId ? null : state.currentThread,
          messages: state.currentThread?._id === threadId ? [] : state.messages,
        }));
        toast.success('Thread deleted');
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
      toast.error('Failed to delete thread');
    }
  },
  
  renameThread: async (threadId: string, newTitle: string) => {
    try {
      const response = await fetch(`/api/playground/threads/${threadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      
      if (response.ok) {
        set((state) => ({
          threads: state.threads.map(t => 
            t._id === threadId ? { ...t, title: newTitle } : t
          ),
          currentThread: state.currentThread?._id === threadId 
            ? { ...state.currentThread, title: newTitle }
            : state.currentThread,
        }));
        toast.success('Thread renamed');
      }
    } catch (error) {
      console.error('Error renaming thread:', error);
      toast.error('Failed to rename thread');
    }
  },
  
  sendMessage: async (content: string) => {
    const { currentThread } = get();
    if (!currentThread || !content.trim()) return;
    
    // Optimistic update
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      threadId: currentThread._id,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    
    get().addMessage(tempMessage);
    set({ inputMessage: '' });
    
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
        // Replace temp message with real one
        set((state) => ({
          messages: state.messages.map(m => 
            m.id === tempMessage.id ? data.message : m
          ),
        }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      // Remove temp message on error
      set((state) => ({
        messages: state.messages.filter(m => m.id !== tempMessage.id),
      }));
    }
  },
}));

