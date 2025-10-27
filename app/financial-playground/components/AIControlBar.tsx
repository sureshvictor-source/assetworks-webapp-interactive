/**
 * AIControlBar - System prompt and AI model selector
 * Extracted control bar component
 */

'use client';

import { useEffect } from 'react';
import { Bot, Globe, TrendingUp, Code, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlaygroundUIStore } from '@/lib/stores/usePlaygroundUIStore';

const getPromptIcon = (promptName: string) => {
  const name = promptName?.toLowerCase() || '';
  if (name.includes('web') || name.includes('dashboard')) {
    return <Globe className="w-4 h-4 text-primary" />;
  }
  if (name.includes('financial') || name.includes('stock') || name.includes('market')) {
    return <TrendingUp className="w-4 h-4 text-primary" />;
  }
  if (name.includes('technical') || name.includes('code') || name.includes('api')) {
    return <Code className="w-4 h-4 text-primary" />;
  }
  return <Sparkles className="w-4 h-4 text-primary" />;
};

export function AIControlBar() {
  const {
    systemPrompts,
    activeSystemPromptId,
    setActiveSystemPromptId,
    loadSystemPrompts,
  } = usePlaygroundUIStore();
  
  useEffect(() => {
    loadSystemPrompts();
  }, [loadSystemPrompts]);
  
  const selectedPrompt = systemPrompts.find(p => p.id === activeSystemPromptId);
  
  if (systemPrompts.length === 0) return null;
  
  return (
    <div className="border-t border-border px-4 py-3 bg-muted/30">
      <div className="flex items-center gap-3">
        <Bot className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Select value={activeSystemPromptId} onValueChange={setActiveSystemPromptId}>
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
            {systemPrompts.map((prompt) => (
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

