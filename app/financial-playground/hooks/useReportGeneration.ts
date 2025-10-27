/**
 * useReportGeneration - Report generation logic
 * Handles streaming, report saving, and state updates
 */

import { useCallback } from 'react';
import { useReportStore, useThreadStore } from '@/lib/stores';
import { usePlaygroundUIStore } from '@/lib/stores/usePlaygroundUIStore';
import { toast } from 'react-hot-toast';

export function useReportGeneration() {
  const { currentThread, setStreamingContent, setStreamingUsage } = useThreadStore();
  const { setCurrentReport } = useReportStore();
  const { activeSystemPromptId, systemPrompts } = usePlaygroundUIStore();
  
  const generateReport = useCallback(async (prompt: string) => {
    if (!currentThread) {
      toast.error('No active thread');
      return;
    }
    
    const activePrompt = systemPrompts.find(p => p.id === activeSystemPromptId);
    
    try {
      setStreamingContent('');
      setStreamingUsage(null);
      
      const response = await fetch(`/api/playground/threads/${currentThread._id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: prompt,
          model: 'claude-3-5-sonnet-20241022',
          provider: 'anthropic',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.content) {
                  accumulatedContent += data.content;
                  setStreamingContent(accumulatedContent);
                }
                
                if (data.usage) {
                  setStreamingUsage({
                    inputTokens: data.usage.inputTokens || 0,
                    outputTokens: data.usage.outputTokens || 0,
                  });
                }
                
                if (data.type === 'complete' && data.report) {
                  setCurrentReport(data.report);
                  setStreamingContent('');
                  toast.success('Report generated successfully');
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
      setStreamingContent('');
    }
  }, [currentThread, activeSystemPromptId, systemPrompts, setStreamingContent, setStreamingUsage, setCurrentReport]);
  
  return {
    generateReport,
  };
}

