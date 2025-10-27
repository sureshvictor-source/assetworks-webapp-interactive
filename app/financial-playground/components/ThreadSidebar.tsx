/**
 * ThreadSidebar - Thread list and management
 * Extracted from main Financial Playground page
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Edit, Check, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconButton } from '@/components/shared';
import { useThreadStore } from '@/lib/stores';
import { usePlaygroundUIStore } from '@/lib/stores/usePlaygroundUIStore';
import { useDebounce } from '@/lib/hooks/shared';
import { ConfirmDialog } from '@/components/shared';
import { formatDate } from '@/lib/utils/formatters';

interface ThreadSidebarProps {
  onThreadSelect: (threadId: string) => void;
}

export function ThreadSidebar({ onThreadSelect }: ThreadSidebarProps) {
  const router = useRouter();
  const { threads, currentThread, isLoadingThreads, loadThreads, createThread, deleteThread, renameThread } = useThreadStore();
  const { 
    threadSearchQuery, 
    setThreadSearchQuery, 
    editingThreadId, 
    setEditingThreadId,
    editingThreadTitle,
    setEditingThreadTitle 
  } = usePlaygroundUIStore();
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState<string | null>(null);
  
  const debouncedSearch = useDebounce(threadSearchQuery, 300);
  
  // Filter threads based on search
  const filteredThreads = useMemo(() => {
    if (!debouncedSearch) return threads;
    return threads.filter(thread => 
      thread.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [threads, debouncedSearch]);
  
  useEffect(() => {
    loadThreads();
  }, [loadThreads]);
  
  const handleCreateThread = async () => {
    const thread = await createThread('New Financial Report');
    if (thread) {
      router.push(`/financial-playground?thread=${thread._id}`);
      onThreadSelect(thread._id);
    }
  };
  
  const handleDeleteClick = (threadId: string) => {
    setThreadToDelete(threadId);
    setDeleteConfirmOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (threadToDelete) {
      await deleteThread(threadToDelete);
      setThreadToDelete(null);
    }
  };
  
  const handleRenameStart = (thread: any) => {
    setEditingThreadId(thread._id);
    setEditingThreadTitle(thread.title);
  };
  
  const handleRenameSave = async (threadId: string) => {
    await renameThread(threadId, editingThreadTitle);
    setEditingThreadId(null);
  };
  
  const handleRenameCancel = () => {
    setEditingThreadId(null);
    setEditingThreadTitle('');
  };
  
  return (
    <>
      <div className="h-full flex flex-col bg-card border-r border-border">
        {/* Header */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          <h2 className="font-semibold text-sm">Conversations</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCreateThread}
            className="h-8"
          >
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>
        
        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
            <Input
              value={threadSearchQuery}
              onChange={(e) => setThreadSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="pl-10 h-9 text-sm"
            />
          </div>
        </div>
        
        {/* Thread List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredThreads.map((thread) => (
              <div
                key={thread._id}
                className={`group relative rounded-lg transition-all ${
                  currentThread?._id === thread._id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted border border-transparent'
                }`}
              >
                {editingThreadId === thread._id ? (
                  <div className="p-2">
                    <Input
                      value={editingThreadTitle}
                      onChange={(e) => setEditingThreadTitle(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleRenameSave(thread._id);
                        if (e.key === 'Escape') handleRenameCancel();
                      }}
                    />
                    <div className="flex gap-1 mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs"
                        onClick={() => handleRenameSave(thread._id)}
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs"
                        onClick={handleRenameCancel}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        router.push(`/financial-playground?thread=${thread._id}`);
                        onThreadSelect(thread._id);
                      }}
                      className="w-full text-left p-3"
                    >
                      <div className="font-medium text-sm truncate pr-8">
                        {thread.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                        <span>{formatDate(thread.updatedAt, 'relative')}</span>
                      </div>
                    </button>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <IconButton
                        icon={Edit}
                        label="Rename"
                        onClick={() => handleRenameStart(thread)}
                        size="sm"
                      />
                      <IconButton
                        icon={Trash2}
                        label="Delete"
                        onClick={() => handleDeleteClick(thread._id)}
                        variant="destructive"
                        size="sm"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Thread"
        description="This will permanently delete this conversation and all its messages. This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

