/**
 * ReportPanel - Report display and section editing
 * Extracted from main Financial Playground page
 */

'use client';

import { useEffect } from 'react';
import { FileText, Sparkles, Edit, X, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/components/shared';
import { useReportStore, useThreadStore } from '@/lib/stores';
import InteractiveSection from '@/components/financial-playground/InteractiveSection';
import { ReportMetricsTicker } from './ReportMetricsTicker';
import AddSectionButton from '@/components/financial-playground/AddSectionButton';
import ChartRenderer from '@/components/financial-playground/ChartRenderer';
import { EntityChips } from '@/components/entities/EntityChips';

export function ReportPanel() {
  const { currentThread, streamingContent, streamingUsage } = useThreadStore();
  const {
    currentReport,
    sections,
    isLoadingSections,
    selectedSectionId,
    editingContext,
    sectionPreviewContent,
    sectionStreamingState,
    collapsedSections,
    setSelectedSectionId,
    setEditingContext,
    toggleSectionCollapse,
    loadSections,
    updateSection,
    deleteSection,
    duplicateSection,
    moveSection,
  } = useReportStore();
  
  // Load sections when report changes - always load, not just in interactive mode
  useEffect(() => {
    if (currentReport?._id) {
      loadSections(currentReport._id);
    }
  }, [currentReport?._id, loadSections]);
  
  const handleEditSection = (sectionId: string) => {
    const section = sections.find(s => s._id === sectionId);
    if (!section) return;
    
    setEditingContext({
      type: 'edit',
      sectionId,
      section,
      position: section.order,
    });
  };
  
  const handleDownloadSection = (sectionId: string, htmlContent: string, title: string) => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const convertToInteractive = async () => {
    if (!currentReport || currentReport.isInteractiveMode) return;

    try {
      const response = await fetch(
        `/api/playground/reports/${currentReport._id}/convert-to-interactive`,
        { method: 'POST' }
      );

      if (response.ok) {
        await loadSections(currentReport._id);
      }
    } catch (error) {
      console.error('Error converting to interactive:', error);
    }
  };

  const exitInteractiveMode = async () => {
    if (!currentReport || !currentReport.isInteractiveMode) return;

    // Update the local state to exit interactive mode
    const updatedReport = {
      ...currentReport,
      isInteractiveMode: false
    };

    // Update the report in the store
    const { setCurrentReport } = useReportStore.getState();
    setCurrentReport(updatedReport);

    // Clear any editing context
    setEditingContext(null);
    setSelectedSectionId(null);

    // Reload sections from database to ensure we show persisted data
    await loadSections(currentReport._id);
    toast.success('Exited interactive mode');
  };
  
  return (
    <div className="h-full flex flex-col bg-card">
      {/* Exit Edit Mode Button */}
      {editingContext && (
        <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            <span className="font-medium">Edit Mode Active</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditingContext(null);
              setSelectedSectionId(null);
              if (currentReport?.isInteractiveMode) {
                loadSections(currentReport._id);
              }
            }}
            className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Exit Edit Mode
          </Button>
        </div>
      )}
      
      {/* Insights Banner */}
      {currentReport && currentReport.insights && currentReport.insights.length > 0 && (
        <div className="bg-primary/5 border-b border-primary/10 p-4">
          <h3 className="text-sm font-semibold text-primary mb-2">
            Key Insights
          </h3>
          <div className="space-y-2">
            {currentReport.insights.slice(0, 3).map((insight: any) => (
              <div
                key={insight.id}
                className={`flex items-start gap-2 text-sm ${
                  insight.severity === 'critical'
                    ? 'text-red-700'
                    : insight.severity === 'warning'
                    ? 'text-yellow-700'
                    : insight.severity === 'success'
                    ? 'text-green-600'
                    : 'text-primary'
                }`}
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{insight.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Interactive Mode Header */}
      {currentReport?.isInteractiveMode && (
        <div className="sticky top-0 z-50 bg-primary/5 border-b border-primary/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Interactive Mode</span>
            <span className="text-xs text-muted-foreground">• Edit and rearrange sections</span>
          </div>
          <Button
            onClick={exitInteractiveMode}
            size="sm"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            <X className="w-3.5 h-3.5 mr-1.5" />
            Done Editing
          </Button>
        </div>
      )}
      
      {/* Report Metrics Ticker - Show during streaming */}
      {streamingContent && streamingUsage && (
        <ReportMetricsTicker
          inputTokens={streamingUsage.inputTokens}
          outputTokens={streamingUsage.outputTokens}
          totalTokens={streamingUsage.inputTokens + streamingUsage.outputTokens}
        />
      )}
      
      {/* Entity Chips */}
      {currentReport && (
        <div className={`sticky ${currentReport?.isInteractiveMode ? 'top-[52px]' : 'top-[40px]'} z-40 border-b border-border px-4 py-3 bg-background/95 backdrop-blur-sm shadow-sm`}>
          <EntityChips reportId={currentReport._id} />
        </div>
      )}
      
      {/* Report Content */}
      <ScrollArea className="flex-1 p-8">
        {!currentReport && !streamingContent ? (
          <EmptyState
            icon={FileText}
            title="No Report Yet"
            description="Start a conversation to generate your financial report"
          />
        ) : isLoadingSections ? (
          <div className="max-w-5xl mx-auto">
            {currentReport?.htmlContent && (
              <div
                className="report-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: currentReport.htmlContent,
                }}
              />
            )}
          </div>
        ) : sections.length > 0 && !isLoadingSections ? (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Interactive Sections - Show sections even when not in interactive mode */}
            {currentReport?.isInteractiveMode && (
              <AddSectionButton
                reportId={currentReport._id}
                position={0}
                onSectionAdded={() => loadSections(currentReport._id)}
              />
            )}

            {sections.map((section, index) => {
              const isEditing = editingContext?.type === 'edit' && editingContext?.sectionId === section._id;
              const isOtherSectionEditing = editingContext && editingContext.sectionId !== section._id;
              const isInteractive = currentReport?.isInteractiveMode;

              return (
                <div
                  key={section._id}
                  className={`transition-all duration-300 ${
                    isOtherSectionEditing ? 'opacity-30 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  {isInteractive ? (
                    <InteractiveSection
                      sectionId={section._id}
                      reportId={section.reportId}
                      htmlContent={section.htmlContent}
                      title={section.title}
                      order={section.order}
                      isFirst={index === 0}
                      isLast={index === sections.length - 1}
                      isSelected={selectedSectionId === section._id}
                      isCollapsed={collapsedSections[section._id] || false}
                      isInEditMode={isEditing}
                      isStreaming={sectionStreamingState[section._id] || false}
                      previewContent={sectionPreviewContent[section._id]}
                      onSelect={() => setSelectedSectionId(section._id)}
                      onEdit={handleEditSection}
                      onCancelEdit={() => {
                        setEditingContext(null);
                        setSelectedSectionId(null);
                      }}
                      onDelete={(id) => deleteSection(currentReport._id, id)}
                      onDuplicate={(id) => duplicateSection(currentReport._id, id)}
                      onMoveUp={(id) => moveSection(currentReport._id, id, 'up')}
                      onMoveDown={(id) => moveSection(currentReport._id, id, 'down')}
                      onDownload={handleDownloadSection}
                      onToggleCollapse={toggleSectionCollapse}
                    />
                  ) : (
                    // Non-interactive section display
                    <div className="mb-6 p-6 bg-background border border-border rounded-lg">
                      {section.title && (
                        <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                      )}
                      <ChartRenderer htmlContent={section.htmlContent} />
                    </div>
                  )}

                  {isInteractive && (
                    <AddSectionButton
                      reportId={currentReport._id}
                      position={section.order + 1}
                      onSectionAdded={() => loadSections(currentReport._id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Convert to Interactive Button */}
            {currentReport && !currentReport.isInteractiveMode && !streamingContent && (
              <div className="mb-6 flex justify-center">
                <Button
                  onClick={convertToInteractive}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Convert to Interactive Mode
                </Button>
              </div>
            )}
            
            <ChartRenderer
              htmlContent={streamingContent || currentReport?.htmlContent || ''}
            />
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

