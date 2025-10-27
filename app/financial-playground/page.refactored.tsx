/**
 * Financial Playground - Refactored Version
 * Uses Zustand stores and extracted components
 * Reduced from 1731 lines to ~200 lines
 */

'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { FileText, Settings, Share2, Download } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { LoadingState } from '@/components/shared';
import { useThreadStore, useReportStore, usePlaygroundUIStore } from '@/lib/stores';
import { toast } from 'react-hot-toast';
import { useThreadManagement } from '@/app/financial-playground/hooks/useThreadManagement';
import { useReportGeneration } from '@/app/financial-playground/hooks/useReportGeneration';
import { ThreadSidebar } from '@/app/financial-playground/components/ThreadSidebar';
import { ChatPanel } from '@/app/financial-playground/components/ChatPanel';
import { AIControlBar } from '@/app/financial-playground/components/AIControlBar';
import { ReportPanel } from '@/app/financial-playground/components/ReportPanel';
import ShareDialog from '@/components/financial-playground/ShareDialog';
import ContextDetailsModal from '@/components/financial-playground/ContextDetailsModal';
import EditingContext from '@/components/financial-playground/EditingContext';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/shared';

export default function FinancialPlaygroundPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Stores
  const { currentThread, loadThread } = useThreadStore();
  const { currentReport, editingContext, setEditingContext } = useReportStore();
  const {
    isSidebarOpen,
    toggleSidebar,
    isShareDialogOpen,
    setShareDialogOpen,
    isContextModalOpen,
    setContextModalOpen,
    contextModalEntity,
    setContextModalEntity,
    loadSystemPrompts,
  } = usePlaygroundUIStore();
  
  // Custom hooks
  const { selectThread, loadThreads } = useThreadManagement();
  const { generateReport } = useReportGeneration();
  
  // Authentication redirect
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  
  // Load threads on mount
  useEffect(() => {
    if (status === 'authenticated') {
      loadThreads();
      loadSystemPrompts();
    }
  }, [status, loadThreads, loadSystemPrompts]);
  
  // Handle URL thread parameter
  useEffect(() => {
    const threadId = searchParams.get('thread');
    if (threadId && threadId !== currentThread?._id) {
      loadThread(threadId);
    }
  }, [searchParams, currentThread, loadThread]);
  
  // Handle message send with report generation
  const handleSendMessage = async (content: string) => {
    // First send the chat message
    // Then trigger report generation
    await generateReport(content);
  };
  
  const handleOpenContextModal = (type: 'thread' | 'report', id: string, tokens: number) => {
    setContextModalEntity({ type, id, tokens });
    setContextModalOpen(true);
  };
  
  const handleShareReport = () => {
    if (currentReport) {
      setShareDialogOpen(true);
    }
  };
  
  const handleExportPDF = async () => {
    if (!currentReport) {
      toast.error('No report to export');
      return;
    }
    
    try {
      const toastId = toast.loading('Generating PDF...');
      
      const response = await fetch(`/api/playground/reports/${currentReport._id}/export-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Download the PDF
        const pdfResponse = await fetch(data.pdfUrl);
        const blob = await pdfResponse.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${currentReport._id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('PDF downloaded', { id: toastId });
      } else {
        toast.error('Failed to generate PDF', { id: toastId });
      }
    } catch (error) {
      console.error('Export PDF error:', error);
      toast.error('Failed to export PDF');
    }
  };
  
  // Loading state
  if (status === 'loading') {
    return <LoadingState fullScreen message="Loading playground..." />;
  }
  
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Page Header */}
      <PageHeader
        icon={FileText}
        title="Financial Playground"
        subtitle={currentThread?.title}
        actions={
          <>
            {currentReport && (
              <>
                <IconButton
                  icon={Download}
                  label="Export PDF"
                  onClick={handleExportPDF}
                  variant="outline"
                />
                <IconButton
                  icon={Share2}
                  label="Share Report"
                  onClick={handleShareReport}
                  variant="outline"
                />
              </>
            )}
            <IconButton
              icon={Settings}
              label="Settings"
              onClick={() => router.push('/financial-playground/settings')}
              variant="ghost"
            />
          </>
        }
      />
      
      {/* Main Content - 3 Panel Layout */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" autoSaveId="financial-playground-layout">
          {/* Left Panel - Thread List */}
          {isSidebarOpen && (
            <>
              <Panel defaultSize={20} minSize={15} maxSize={35} id="thread-panel">
                <ThreadSidebar onThreadSelect={selectThread} />
              </Panel>
              
              <PanelResizeHandle className="w-2 bg-border hover:bg-primary transition-colors" />
            </>
          )}
          
          {/* Middle Panel - Chat */}
          <Panel defaultSize={40} minSize={30} id="chat-panel">
            <div className="h-full flex flex-col bg-card">
              {/* Chat Messages */}
              <div className="flex-1 overflow-hidden">
                <ChatPanel onSendMessage={handleSendMessage} />
              </div>
              
              {/* AI Control Bar */}
              <AIControlBar />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-2 bg-border hover:bg-primary transition-colors" />
          
          {/* Right Panel - Report */}
          <Panel defaultSize={40} minSize={30} id="report-panel">
            <ReportPanel />
          </Panel>
        </PanelGroup>
      </div>
      
      {/* Modals & Dialogs */}
      {currentReport && (
        <ShareDialog
          reportId={currentReport._id}
          open={isShareDialogOpen}
          onOpenChange={setShareDialogOpen}
        />
      )}
      
      <ContextDetailsModal
        isOpen={isContextModalOpen}
        onClose={() => setContextModalOpen(false)}
        entityType={contextModalEntity?.type || 'thread'}
        entityId={contextModalEntity?.id || ''}
        currentTokens={contextModalEntity?.tokens || 0}
      />
      
      {/* Editing Context Panel */}
      {editingContext && editingContext.type === 'edit' && (
        <EditingContext
          type={editingContext.type}
          section={editingContext.section}
          position={editingContext.position}
          onCancel={() => setEditingContext(null)}
          onDone={() => {
            setEditingContext(null);
            if (currentReport?.isInteractiveMode) {
              // Reload sections handled by ReportPanel
            }
          }}
          onSuggestionClick={(suggestion) => {
            handleSendMessage(suggestion);
          }}
        />
      )}
    </div>
  );
}

