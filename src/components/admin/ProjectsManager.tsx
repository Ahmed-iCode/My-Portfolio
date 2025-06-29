import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  FolderOpen,
  Github,
  Star,
  StarOff,
  Eye,
  Save,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useLocalData';
import { Project } from '@/data/projects';

const ProjectsManager = () => {
  const { 
    data: projects, 
    isLoading, 
    addProject, 
    updateProject, 
    deleteProject 
  } = useProjects();
  
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech_stack: '',
    demo_link: '',
    github_link: '',
    featured: false,
  });

  // Filter projects based on search
  const filteredProjects = projects?.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tech_stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      tech_stack: '',
      demo_link: '',
      github_link: '',
      featured: false,
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech_stack: project.tech_stack.join(', '),
      demo_link: project.demo_link,
      github_link: project.github_link,
      featured: project.featured,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.demo_link.trim()) {
        throw new Error('Demo URL is required');
      }
      if (!formData.github_link.trim()) {
        throw new Error('GitHub URL is required');
      }

      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image.trim() || 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(t => t),
        demo_link: formData.demo_link.trim(),
        github_link: formData.github_link.trim(),
        featured: formData.featured,
      };

      if (editingProject) {
        // Update existing project
        updateProject(editingProject.id, projectData);
        toast({
          title: "Project updated!",
          description: "The project has been updated successfully.",
        });
      } else {
        // Add new project
        addProject(projectData);
        toast({
          title: "Project added!",
          description: "The new project has been added to your portfolio.",
        });
      }

      // Reset form and close dialog
      resetForm();
      setEditingProject(null);
      setIsAddDialogOpen(false);

    } catch (error) {
      console.error('Error saving project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save the project. Please try again.';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      deleteProject(projectId);
      toast({
        title: "Project deleted!",
        description: "The project has been removed from your portfolio.",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete the project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      updateProject(project.id, { featured: !project.featured });
      toast({
        title: project.featured ? "Removed from featured" : "Added to featured",
        description: `Project ${project.featured ? 'removed from' : 'added to'} featured section.`,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Projects Management</h2>
          <p className="text-muted-foreground">
            Add, edit, and manage your project portfolio
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Fill in the details for your new project
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the project..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/project-image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use default placeholder image
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Demo URL *</label>
                  <Input
                    value={formData.demo_link}
                    onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
                    placeholder="https://your-project-demo.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub URL *</label>
                  <Input
                    value={formData.github_link}
                    onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies (comma-separated)</label>
                <Input
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  placeholder="React, TypeScript, Tailwind CSS, Node.js"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured project
                </label>
              </div>

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
                  {isSubmitting ? "Adding..." : "Add Project"}
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
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Projects ({filteredProjects.length})
          </CardTitle>
          <CardDescription>
            Manage your project portfolio and showcase your work
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-20 bg-muted rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No projects match your search.' : 'Start by adding your first project.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Project
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {project.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {project.featured && (
                              <Badge variant="secondary" className="gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tech_stack.slice(0, 4).map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.tech_stack.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tech_stack.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <a
                            href={project.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Demo
                          </a>
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:text-primary/80"
                          >
                            <Github className="w-3 h-3" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFeatured(project)}
                        className="gap-1"
                      >
                        {project.featured ? (
                          <StarOff className="w-4 h-4" />
                        ) : (
                          <Star className="w-4 h-4" />
                        )}
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(project)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Project</DialogTitle>
                            <DialogDescription>
                              Update the project information
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Title *</label>
                              <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Project title"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description *</label>
                              <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of the project..."
                                rows={3}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Image URL</label>
                              <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/project-image.jpg"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Demo URL *</label>
                                <Input
                                  value={formData.demo_link}
                                  onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
                                  placeholder="https://your-project-demo.com"
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium">GitHub URL *</label>
                                <Input
                                  value={formData.github_link}
                                  onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                                  placeholder="https://github.com/username/repo"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Technologies (comma-separated)</label>
                              <Input
                                value={formData.tech_stack}
                                onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                                placeholder="React, TypeScript, Tailwind CSS, Node.js"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="featured-edit"
                                checked={formData.featured}
                                onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                              />
                              <label htmlFor="featured-edit" className="text-sm font-medium">
                                Featured project
                              </label>
                            </div>

                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  resetForm();
                                  setEditingProject(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update Project"}
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
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{project.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex justify-end gap-2">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project.id)}
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

export default ProjectsManager;