'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Copy,
  Check,
  Star,
  StarOff,
  Eye,
  Code,
  FileText,
  Sparkles,
  Globe,
  Smartphone,
  Save,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface SystemPrompt {
  id: string;
  name: string;
  description: string;
  content: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function SystemPromptsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [systemPrompts, setSystemPrompts] = useState<SystemPrompt[]>([]);
  const [activePromptId, setActivePromptId] = useState<string>('');
  const [selectedPrompt, setSelectedPrompt] = useState<SystemPrompt | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState<SystemPrompt | null>(null);
  const [editingPrompt, setEditingPrompt] = useState<SystemPrompt | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state for edit/create
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
  });

  // Load system prompts on mount
  useEffect(() => {
    if (status === 'authenticated') {
      loadSystemPrompts();
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const loadSystemPrompts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/playground/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.settings?.systemPrompts) {
          setSystemPrompts(data.settings.systemPrompts);
          setActivePromptId(data.settings.activeSystemPromptId || '');
          // Set the first prompt as selected if none selected
          if (!selectedPrompt && data.settings.systemPrompts.length > 0) {
            setSelectedPrompt(data.settings.systemPrompts[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading system prompts:', error);
      toast.error('Failed to load system prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPrompt(null);
    setFormData({
      name: '',
      description: '',
      content: '',
    });
    setIsEditDialogOpen(true);
  };

  const handleEdit = (prompt: SystemPrompt) => {
    setIsCreating(false);
    setEditingPrompt(prompt);
    setFormData({
      name: prompt.name,
      description: prompt.description,
      content: prompt.content,
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.content) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      let updatedPrompts = [...systemPrompts];

      if (isCreating) {
        // Create new prompt
        const newPrompt: SystemPrompt = {
          id: `custom-${Date.now()}`,
          name: formData.name,
          description: formData.description,
          content: formData.content,
          isDefault: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        updatedPrompts.push(newPrompt);
      } else if (editingPrompt) {
        // Update existing prompt
        updatedPrompts = updatedPrompts.map(p =>
          p.id === editingPrompt.id
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                content: formData.content,
                updatedAt: new Date(),
              }
            : p
        );
      }

      // Save to backend
      const response = await fetch('/api/playground/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompts: updatedPrompts }),
      });

      if (response.ok) {
        setSystemPrompts(updatedPrompts);
        setIsEditDialogOpen(false);
        toast.success(isCreating ? 'System prompt created' : 'System prompt updated');

        // Update selected prompt if it was edited
        if (!isCreating && editingPrompt && selectedPrompt?.id === editingPrompt.id) {
          setSelectedPrompt(updatedPrompts.find(p => p.id === editingPrompt.id) || null);
        }
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving system prompt:', error);
      toast.error('Failed to save system prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!promptToDelete) return;

    // Prevent deleting the last prompt
    if (systemPrompts.length === 1) {
      toast.error('Cannot delete the last system prompt');
      return;
    }

    // Prevent deleting active prompt
    if (promptToDelete.id === activePromptId) {
      toast.error('Cannot delete the active system prompt. Please select another prompt first.');
      return;
    }

    setLoading(true);
    try {
      const updatedPrompts = systemPrompts.filter(p => p.id !== promptToDelete.id);

      const response = await fetch('/api/playground/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompts: updatedPrompts }),
      });

      if (response.ok) {
        setSystemPrompts(updatedPrompts);
        setIsDeleteDialogOpen(false);
        setPromptToDelete(null);
        toast.success('System prompt deleted');

        // Update selected prompt if it was deleted
        if (selectedPrompt?.id === promptToDelete.id) {
          setSelectedPrompt(updatedPrompts[0] || null);
        }
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting system prompt:', error);
      toast.error('Failed to delete system prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (promptId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/playground/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeSystemPromptId: promptId }),
      });

      if (response.ok) {
        setActivePromptId(promptId);
        toast.success('Default system prompt updated');
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error setting default prompt:', error);
      toast.error('Failed to set default prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = (prompt: SystemPrompt) => {
    navigator.clipboard.writeText(prompt.content);
    toast.success('Prompt content copied to clipboard');
  };

  const getPromptIcon = (promptName: string) => {
    const name = promptName?.toLowerCase() || '';
    if (name.includes('mobile') || name.includes('widget')) {
      return <Smartphone className="w-4 h-4" />;
    }
    if (name.includes('web') || name.includes('dashboard')) {
      return <Globe className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const getPromptBadgeColor = (promptId: string) => {
    if (promptId === activePromptId) return 'default';
    if (promptId.includes('v2')) return 'secondary';
    if (promptId.includes('mobile')) return 'outline';
    return 'secondary';
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading system prompts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/financial-playground')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Playground
              </Button>
              <div>
                <h1 className="text-xl font-semibold">System Prompts Management</h1>
                <p className="text-sm text-muted-foreground">
                  Configure AI behavior for different report types
                </p>
              </div>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Prompt
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prompts List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Prompts</CardTitle>
                <CardDescription>
                  {systemPrompts.length} system prompt{systemPrompts.length !== 1 ? 's' : ''} configured
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="p-4 space-y-2">
                    {systemPrompts.map((prompt) => (
                      <motion.div
                        key={prompt.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedPrompt?.id === prompt.id
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedPrompt(prompt)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getPromptIcon(prompt.name)}
                                <h3 className="font-medium text-sm">{prompt.name}</h3>
                              </div>
                              {prompt.id === activePromptId && (
                                <Badge variant="default" className="text-xs">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {prompt.description}
                            </p>
                            <div className="flex items-center gap-1 mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetDefault(prompt.id);
                                }}
                                disabled={prompt.id === activePromptId}
                              >
                                {prompt.id === activePromptId ? (
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                ) : (
                                  <StarOff className="w-3.5 h-3.5" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(prompt);
                                }}
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyPrompt(prompt);
                                }}
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPromptToDelete(prompt);
                                  setIsDeleteDialogOpen(true);
                                }}
                                disabled={systemPrompts.length === 1 || prompt.id === activePromptId}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Prompt Details */}
          <div className="lg:col-span-2">
            {selectedPrompt ? (
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getPromptIcon(selectedPrompt.name)}
                        <CardTitle>{selectedPrompt.name}</CardTitle>
                        {selectedPrompt.id === activePromptId && (
                          <Badge variant="default">Active</Badge>
                        )}
                      </div>
                      <CardDescription>{selectedPrompt.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPrompt(selectedPrompt);
                          setIsPreviewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleEdit(selectedPrompt)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="mt-4">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <ScrollArea className="h-[450px]">
                          <pre className="text-sm whitespace-pre-wrap font-mono">
                            {selectedPrompt.content}
                          </pre>
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent value="metadata" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Prompt ID</Label>
                          <p className="font-mono text-sm mt-1">{selectedPrompt.id}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Created At</Label>
                          <p className="text-sm mt-1">
                            {new Date(selectedPrompt.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Last Updated</Label>
                          <p className="text-sm mt-1">
                            {new Date(selectedPrompt.updatedAt).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Word Count</Label>
                          <p className="text-sm mt-1">
                            {selectedPrompt.content.split(/\s+/).length} words
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Character Count</Label>
                          <p className="text-sm mt-1">
                            {selectedPrompt.content.length} characters
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a System Prompt</h3>
                  <p className="text-muted-foreground text-sm">
                    Choose a prompt from the list to view its details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? 'Create New System Prompt' : 'Edit System Prompt'}
            </DialogTitle>
            <DialogDescription>
              {isCreating
                ? 'Define a new system prompt to control AI behavior'
                : 'Modify the selected system prompt'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Financial Dashboard"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what this prompt does"
              />
            </div>

            <div>
              <Label htmlFor="content">Prompt Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter the system prompt content..."
                className="min-h-[300px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.content.length} characters, {formData.content.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : isCreating ? 'Create' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete System Prompt</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{promptToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview: {selectedPrompt?.name}</DialogTitle>
            <DialogDescription>{selectedPrompt?.description}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[500px] mt-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {selectedPrompt?.content}
              </pre>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedPrompt && handleCopyPrompt(selectedPrompt)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}