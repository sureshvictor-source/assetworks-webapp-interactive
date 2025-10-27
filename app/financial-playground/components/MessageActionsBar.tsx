/**
 * MessageActionsBar - Message-level actions
 * Copy, edit, delete, and regenerate messages
 */

'use client';

import { Copy, Edit, Trash2, RefreshCw, Check } from 'lucide-react';
import { IconButton } from '@/components/shared';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

interface Message {
  id: string;
  threadId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface MessageActionsBarProps {
  message: Message;
  onEdit?: (message: Message) => void;
  onDelete?: (messageId: string) => void;
  onRegenerate?: (message: Message) => void;
  className?: string;
}

export function MessageActionsBar({
  message,
  onEdit,
  onDelete,
  onRegenerate,
  className,
}: MessageActionsBarProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit(message);
      toast.info('Edit mode activated');
    }
  };
  
  const handleDelete = async () => {
    if (onDelete) {
      if (confirm('Delete this message?')) {
        onDelete(message.id);
      }
    }
  };
  
  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate(message);
      toast.info('Regenerating response...');
    }
  };
  
  return (
    <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${className}`}>
      <IconButton
        icon={copied ? Check : Copy}
        label="Copy message"
        onClick={handleCopy}
        size="sm"
      />
      
      {message.role === 'user' && onEdit && (
        <IconButton
          icon={Edit}
          label="Edit message"
          onClick={handleEdit}
          size="sm"
        />
      )}
      
      {onDelete && (
        <IconButton
          icon={Trash2}
          label="Delete message"
          onClick={handleDelete}
          variant="destructive"
          size="sm"
        />
      )}
      
      {message.role === 'assistant' && onRegenerate && (
        <IconButton
          icon={RefreshCw}
          label="Regenerate response"
          onClick={handleRegenerate}
          size="sm"
        />
      )}
    </div>
  );
}

