/**
 * Type definitions for Financial Playground Classic
 * Based on MongoDB/Mongoose models
 */

import { LucideIcon } from 'lucide-react';
import { Document } from 'mongoose';

// MongoDB model types
export interface Thread extends Document {
  userId: string;
  title: string;
  description?: string;
  status: 'active' | 'archived';
  currentReportId?: string;
  reportVersions: string[];
  sharedWith: any[];
  isTemplate: boolean;
  templateName?: string;
  templateDescription?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message extends Document {
  threadId: string;
  userId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  reportId?: string;
  metadata?: any;
  status?: 'sending' | 'sent' | 'delivered' | 'streaming' | 'complete' | 'error';
  report?: Report | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report extends Document {
  userId: string;
  threadId?: string;
  title: string;
  description?: string;
  htmlContent: string;
  version: number;
  status: 'draft' | 'published' | 'archived';
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemPrompt {
  id: string;
  name: string;
  description: string | null;
  content: string;
  icon?: string | null;
  isDefault?: boolean;
  isActive?: boolean;
  category?: string | null;
  metadata?: any;
}

// Extended types with icon support
export interface SystemPromptWithIcon extends SystemPrompt {
  icon: LucideIcon;
}

// Alias for compatibility
export type PrismaMessage = Message;

// Model reference type
export interface ModelReference {
  provider: string;
  name: string;
  displayName: string;
  isAvailable?: boolean;
}

// UI state types
export interface PlaygroundState {
  currentThreadId?: string;
  currentThread?: Thread;
  messages: Message[];
  isLoading: boolean;
  error?: string;
}

// Export any additional types that might be needed
export interface ThreadCreateInput {
  title: string;
  description?: string;
  isTemplate?: boolean;
  templateName?: string;
  templateDescription?: string;
}

export interface MessageCreateInput {
  threadId: string;
  content: string;
  role: 'user' | 'assistant';
  reportId?: string;
}