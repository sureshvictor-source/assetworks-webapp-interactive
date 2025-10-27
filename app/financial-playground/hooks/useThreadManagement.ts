/**
 * useThreadManagement - Thread operations hook
 * Combines store actions with business logic
 */

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useThreadStore } from '@/lib/stores';
import { toast } from 'react-hot-toast';

export function useThreadManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    threads,
    currentThread,
    isLoadingThreads,
    loadThreads,
    loadThread,
    createThread,
    deleteThread,
    renameThread,
  } = useThreadStore();
  
  const selectThread = useCallback((threadId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('thread', threadId);
    router.push(`/financial-playground?${params.toString()}`);
    loadThread(threadId);
  }, [router, searchParams, loadThread]);
  
  const handleCreateThread = useCallback(async () => {
    const thread = await createThread('New Financial Report', 'AI-generated analysis');
    if (thread) {
      selectThread(thread._id);
    }
  }, [createThread, selectThread]);
  
  const handleDeleteThread = useCallback(async (threadId: string) => {
    await deleteThread(threadId);
    
    // If deleting current thread, navigate away
    if (currentThread?._id === threadId) {
      router.push('/financial-playground');
    }
  }, [deleteThread, currentThread, router]);
  
  const handleRenameThread = useCallback(async (threadId: string, newTitle: string) => {
    if (!newTitle.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
    await renameThread(threadId, newTitle);
  }, [renameThread]);
  
  return {
    threads,
    currentThread,
    isLoadingThreads,
    loadThreads,
    selectThread,
    createThread: handleCreateThread,
    deleteThread: handleDeleteThread,
    renameThread: handleRenameThread,
  };
}

