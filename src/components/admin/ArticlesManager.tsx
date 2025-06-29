import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FileText,
  Calendar,
  Clock,
  Star,
  StarOff,
  Eye,
  Save,
  X,
  Image as ImageIcon,
  Tag,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useArticles } from '@/hooks/useLocalData';
import { Article } from '@/data/articles';

const ArticlesManager = () => {
  const { 
    data: articles, 
    isLoading, 
    addArticle, 
    updateArticle, 
    deleteArticle 
  } = useArticles();
  
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured: false,
    reading_time: 5,
    image: '',
    meta_title: '',
    meta_description: '',
    keywords: '',
    author_name: 'Ahmed Samir',
    author_avatar: '',
  });

  const categories = [
    'Web Development',
    'Programming',
    'Learning Journey',
    'Tutorial',
    'Project Showcase',
    'Technology Review',
    'Career',
    'Tips & Tricks'
  ];

  // Filter articles based on search
  const filteredArticles = articles?.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Estimate reading time
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featured: false,
      reading_time: 5,
      image: '',
      meta_title: '',
      meta_description: '',
      keywords: '',
      author_name: 'Ahmed Samir',
      author_avatar: '',
    });
    setPreviewContent('');
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', '),
      featured: article.featured,
      reading_time: article.reading_time,
      image: article.image || '',
      meta_title: article.meta_title || '',
      meta_description: article.meta_description || '',
      keywords: article.keywords?.join(', ') || '',
      author_name: article.author_name,
      author_avatar: article.author_avatar || '',
    });
    setPreviewContent(article.content);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      meta_title: title,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      reading_time: estimateReadingTime(content),
    }));
    setPreviewContent(content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.slug.trim()) {
        throw new Error('Slug is required');
      }
      if (!formData.excerpt.trim()) {
        throw new Error('Excerpt is required');
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }
      if (!formData.category) {
        throw new Error('Category is required');
      }

      // Check for duplicate slug (excluding current article if editing)
      const existingArticle = articles?.find(article => 
        article.slug === formData.slug && article.id !== editingArticle?.id
      );
      if (existingArticle) {
        throw new Error('An article with this slug already exists');
      }

      const articleData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        featured: formData.featured,
        reading_time: formData.reading_time,
        image: formData.image.trim() || undefined,
        meta_title: formData.meta_title.trim() || undefined,
        meta_description: formData.meta_description.trim() || undefined,
        keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()).filter(k => k) : undefined,
        author_name: formData.author_name.trim(),
        author_avatar: formData.author_avatar.trim() || undefined,
        published_at: editingArticle?.published_at || new Date().toISOString(),
      };

      if (editingArticle) {
        // Update existing article
        updateArticle(editingArticle.id, articleData);
        toast({
          title: "Article updated!",
          description: "The article has been updated successfully.",
        });
      } else {
        // Add new article
        addArticle(articleData);
        toast({
          title: "Article published!",
          description: "The new article has been published to your blog.",
        });
      }

      // Reset form and close dialog
      resetForm();
      setEditingArticle(null);
      setIsAddDialogOpen(false);

    } catch (error) {
      console.error('Error saving article:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save the article. Please try again.';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (articleId: string) => {
    try {
      deleteArticle(articleId);
      toast({
        title: "Article deleted!",
        description: "The article has been removed from your blog.",
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Error",
        description: "Failed to delete the article. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (article: Article) => {
    try {
      updateArticle(article.id, { featured: !article.featured });
      toast({
        title: article.featured ? "Removed from featured" : "Added to featured",
        description: `Article ${article.featured ? 'removed from' : 'added to'} featured section.`,
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Articles Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage your blog content
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Write Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Write New Article</DialogTitle>
              <DialogDescription>
                Create a new blog post for your portfolio
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Article title"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Slug *</label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="article-url-slug"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Excerpt *</label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description of the article..."
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content * (Markdown supported)</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Write your article content here... You can use Markdown formatting."
                      rows={12}
                      className="font-mono"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Estimated reading time: {formData.reading_time} minutes
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category *</label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags (comma-separated)</label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="React, JavaScript, Tutorial"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Featured Image URL</label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/article-image.jpg"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured article
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <div className="border rounded-lg p-6 bg-muted/30">
                    <h1 className="text-2xl font-bold mb-2">{formData.title || 'Article Title'}</h1>
                    <p className="text-muted-foreground mb-4">{formData.excerpt || 'Article excerpt will appear here...'}</p>
                    <div className="prose prose-sm max-w-none">
                      {previewContent ? (
                        <div className="whitespace-pre-wrap">{previewContent}</div>
                      ) : (
                        <p className="text-muted-foreground italic">Start writing to see preview...</p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Title</label>
                    <Input
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      placeholder="SEO optimized title"
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.meta_title.length}/60 characters (recommended)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Description</label>
                    <Textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      placeholder="Brief description for search engines..."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.meta_description.length}/160 characters (recommended)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Keywords (comma-separated)</label>
                    <Input
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      placeholder="react, javascript, tutorial, web development"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Author Name</label>
                      <Input
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Author Avatar URL</label>
                      <Input
                        value={formData.author_avatar}
                        onChange={(e) => setFormData({ ...formData, author_avatar: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsAddDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Article"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Articles List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Articles ({filteredArticles.length})
          </CardTitle>
          <CardDescription>
            Manage your blog content and articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-muted rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No articles match your search.' : 'Start by writing your first article.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Write Your First Article
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      {article.image && (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{article.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {article.excerpt}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {article.featured && (
                              <Badge variant="secondary" className="gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline">{article.category}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(article.published_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.reading_time} min read
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {article.author_name}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {article.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{article.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFeatured(article)}
                        className="gap-1"
                      >
                        {article.featured ? (
                          <StarOff className="w-4 h-4" />
                        ) : (
                          <Star className="w-4 h-4" />
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(article)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Article</DialogTitle>
                            <DialogDescription>
                              Update the article content and settings
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleSubmit} className="space-y-6">
                            <Tabs defaultValue="content" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="content">Content</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="content" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Title *</label>
                                    <Input
                                      value={formData.title}
                                      onChange={(e) => handleTitleChange(e.target.value)}
                                      placeholder="Article title"
                                      required
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Slug *</label>
                                    <Input
                                      value={formData.slug}
                                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                      placeholder="article-url-slug"
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Excerpt *</label>
                                  <Textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief description of the article..."
                                    rows={2}
                                    required
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Content * (Markdown supported)</label>
                                  <Textarea
                                    value={formData.content}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                    placeholder="Write your article content here..."
                                    rows={12}
                                    className="font-mono"
                                    required
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    Estimated reading time: {formData.reading_time} minutes
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Category *</label>
                                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.map((category) => (
                                          <SelectItem key={category} value={category}>
                                            {category}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Tags (comma-separated)</label>
                                    <Input
                                      value={formData.tags}
                                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                      placeholder="React, JavaScript, Tutorial"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Featured Image URL</label>
                                  <Input
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/article-image.jpg"
                                  />
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="featured-edit"
                                    checked={formData.featured}
                                    onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                                  />
                                  <label htmlFor="featured-edit" className="text-sm font-medium">
                                    Featured article
                                  </label>
                                </div>
                              </TabsContent>

                              <TabsContent value="preview" className="space-y-4">
                                <div className="border rounded-lg p-6 bg-muted/30">
                                  <h1 className="text-2xl font-bold mb-2">{formData.title || 'Article Title'}</h1>
                                  <p className="text-muted-foreground mb-4">{formData.excerpt || 'Article excerpt will appear here...'}</p>
                                  <div className="prose prose-sm max-w-none">
                                    {previewContent ? (
                                      <div className="whitespace-pre-wrap">{previewContent}</div>
                                    ) : (
                                      <p className="text-muted-foreground italic">Start writing to see preview...</p>
                                    )}
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="seo" className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Meta Title</label>
                                  <Input
                                    value={formData.meta_title}
                                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                    placeholder="SEO optimized title"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    {formData.meta_title.length}/60 characters (recommended)
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Meta Description</label>
                                  <Textarea
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    placeholder="Brief description for search engines..."
                                    rows={3}
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    {formData.meta_description.length}/160 characters (recommended)
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Keywords (comma-separated)</label>
                                  <Input
                                    value={formData.keywords}
                                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                    placeholder="react, javascript, tutorial, web development"
                                  />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Author Name</label>
                                    <Input
                                      value={formData.author_name}
                                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                                      placeholder="Author name"
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Author Avatar URL</label>
                                    <Input
                                      value={formData.author_avatar}
                                      onChange={(e) => setFormData({ ...formData, author_avatar: e.target.value })}
                                      placeholder="https://example.com/avatar.jpg"
                                    />
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  resetForm();
                                  setEditingArticle(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update Article"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Article</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{article.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex justify-end gap-2">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(article.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArticlesManager;