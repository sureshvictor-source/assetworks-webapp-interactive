/**
 * MessageItem - Individual message display
 * Renders user and assistant messages
 */

'use client';

import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MessageActionsBar } from '@/app/financial-playground/components/MessageActionsBar';

interface Message {
  id: string;
  threadId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface MessageItemProps {
  message: Message;
  isStreaming?: boolean;
  onEdit?: (message: Message) => void;
  onDelete?: (messageId: string) => void;
  onRegenerate?: (message: Message) => void;
}

export default function MessageItem({ 
  message, 
  isStreaming = false,
  onEdit,
  onDelete,
  onRegenerate,
}: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      'flex gap-3 mb-4 group',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={cn(
        'flex-1 max-w-[85%]',
        isUser && 'flex justify-end'
      )}>
        <div className="relative">
          <div className={cn(
            'inline-block px-4 py-3 rounded-2xl',
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted border border-border'
          )}>
            <div className={cn(
              'text-sm whitespace-pre-wrap break-words',
              isUser ? 'text-primary-foreground' : 'text-foreground'
            )}>
              {message.content}
            </div>
            
            {isStreaming && (
              <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>
          
          {/* Message Actions */}
          {!isStreaming && (onEdit || onDelete || onRegenerate) && (
            <div className={cn(
              'absolute top-1',
              isUser ? 'left-0 -translate-x-full mr-2' : 'right-0 translate-x-full ml-2'
            )}>
              <MessageActionsBar
                message={message}
                onEdit={onEdit}
                onDelete={onDelete}
                onRegenerate={onRegenerate}
              />
            </div>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
}

