/**
 * ChatPanel - Message display and input
 * Extracted from main Financial Playground page
 */

'use client';

import { useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState, LoadingState } from '@/components/shared';
import { useThreadStore } from '@/lib/stores';
import MessageItem from '@/components/financial-playground/MessageItem';
import { ContextProgressBar } from './ContextProgressBar';
import { toast } from 'react-hot-toast';

interface ChatPanelProps {
  onSendMessage?: (content: string) => void;
}

export function ChatPanel({ onSendMessage }: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    currentThread,
    messages,
    inputMessage,
    setInputMessage,
    streamingContent,
    streamingUsage,
    sendMessage,
    setMessages,
  } = useThreadStore();
  
  // Message action handlers
  const handleEditMessage = (message: any) => {
    setInputMessage(message.content);
    toast.info('Message loaded in input for editing');
  };
  
  const handleDeleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/playground/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== messageId));
        toast.success('Message deleted');
      }
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };
  
  const handleRegenerateMessage = (message: any) => {
    // Find the previous user message and regenerate
    const messageIndex = messages.findIndex(m => m.id === message.id);
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1];
      if (userMessage.role === 'user') {
        sendMessage(userMessage.content);
      }
    }
  };
  
  // Calculate total tokens
  const totalTokens = messages.reduce((sum, m) => {
    const tokens = m.metadata?.tokens || 0;
    return sum + (typeof tokens === 'number' ? tokens : 0);
  }, 0) + (streamingUsage ? streamingUsage.inputTokens + streamingUsage.outputTokens : 0);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);
  
  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    
    if (onSendMessage) {
      onSendMessage(inputMessage);
    } else {
      await sendMessage(inputMessage);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 && !currentThread ? (
          <EmptyState
            icon={MessageSquare}
            title="Start a New Conversation"
            description="Create a financial report by starting a new thread"
            action={{
              label: "Create Thread",
              onClick: () => {} // Handled by parent
            }}
          />
        ) : messages.length === 0 && currentThread ? (
          <EmptyState
            icon={Sparkles}
            title={currentThread.title}
            description="Ready to generate your financial report. Describe what you'd like to create below."
          />
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageItem 
                key={message.id} 
                message={message}
                onEdit={handleEditMessage}
                onDelete={handleDeleteMessage}
                onRegenerate={handleRegenerateMessage}
              />
            ))}
            
            {/* Streaming content */}
            {streamingContent && (
              <MessageItem
                message={{
                  id: 'streaming',
                  threadId: currentThread?._id || '',
                  role: 'assistant',
                  content: streamingContent,
                  createdAt: new Date().toISOString(),
                }}
                isStreaming={true}
              />
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      {/* Context Progress Bar */}
      {currentThread && messages.length > 0 && (
        <div className="border-t border-border px-4 py-2 bg-muted/30">
          <ContextProgressBar
            currentTokens={totalTokens}
            size="sm"
            showLabel={true}
            onClick={() => {
              // Could open context modal here
              toast.info(`Using ${totalTokens.toLocaleString()} tokens`);
            }}
          />
        </div>
      )}
      
      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentThread ? "Ask a question or request analysis..." : "Create a thread first"}
            disabled={!currentThread}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim() || !currentThread}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

