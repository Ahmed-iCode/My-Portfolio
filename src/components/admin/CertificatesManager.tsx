import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Award,
  Calendar,
  Building,
  Star,
  StarOff,
  Eye,
  Save,
  X
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
import { useToast } from '@/hooks/use-toast';
import { useCertificates } from '@/hooks/useSupabaseData';
import { supabase, type Certificate } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';

const CertificatesManager = () => {
  const { data: certificates, isLoading } = useCertificates();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    image: '',
    certificate_url: '',
    category: '',
    skills: '',
    tags: '',
    description: '',
    featured: false,
  });

  const categories = [
    'Programming',
    'Web Development',
    'Database',
    'Networking',
    'Tools',
    'Design',
    'Digital Skills',
    'Marketing',
    'Soft Skills'
  ];

  // Filter certificates based on search
  const filteredCertificates = certificates?.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      date: '',
      image: '',
      certificate_url: '',
      category: '',
      skills: '',
      tags: '',
      description: '',
      featured: false,
    });
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setFormData({
      title: certificate.title,
      issuer: certificate.issuer,
      date: certificate.date,
      image: certificate.image,
      certificate_url: certificate.certificate_url,
      category: certificate.category,
      skills: certificate.skills.join(', '),
      tags: certificate.tags.join(', '),
      description: certificate.description || '',
      featured: certificate.featured,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const certificateData = {
        title: formData.title.trim(),
        issuer: formData.issuer.trim(),
        date: formData.date.trim(),
        image: formData.image.trim(),
        certificate_url: formData.certificate_url.trim(),
        category: formData.category,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        description: formData.description.trim() || null,
        featured: formData.featured,
      };

      let error;

      if (editingCertificate) {
        // Update existing certificate
        const { error: updateError } = await supabase
          .from('certificates')
          .update(certificateData)
          .eq('id', editingCertificate.id);
        error = updateError;
      } else {
        // Insert new certificate
        const { error: insertError } = await supabase
          .from('certificates')
          .insert([certificateData]);
        error = insertError;
      }

      if (error) throw error;

      // Invalidate and refetch certificates
      queryClient.invalidateQueries({ queryKey: ['certificates'] });

      toast({
        title: editingCertificate ? "Certificate updated!" : "Certificate added!",
        description: editingCertificate 
          ? "The certificate has been updated successfully."
          : "The new certificate has been added to your portfolio.",
      });

      // Reset form and close dialog
      resetForm();
      setEditingCertificate(null);
      setIsAddDialogOpen(false);

    } catch (error) {
      console.error('Error saving certificate:', error);
      toast({
        title: "Error",
        description: "Failed to save the certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (certificateId: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', certificateId);

      if (error) throw error;

      // Invalidate and refetch certificates
      queryClient.invalidateQueries({ queryKey: ['certificates'] });

      toast({
        title: "Certificate deleted!",
        description: "The certificate has been removed from your portfolio.",
      });

    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast({
        title: "Error",
        description: "Failed to delete the certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (certificate: Certificate) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .update({ featured: !certificate.featured })
        .eq('id', certificate.id);

      if (error) throw error;

      // Invalidate and refetch certificates
      queryClient.invalidateQueries({ queryKey: ['certificates'] });

      toast({
        title: certificate.featured ? "Removed from featured" : "Added to featured",
        description: `Certificate ${certificate.featured ? 'removed from' : 'added to'} featured section.`,
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
          <h2 className="text-2xl font-bold">Certificates Management</h2>
          <p className="text-muted-foreground">
            Add, edit, and manage your professional certifications
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Certificate</DialogTitle>
              <DialogDescription>
                Fill in the details for your new certificate
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Certificate title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issuer *</label>
                  <Input
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="Issuing organization"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date *</label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2024"
                    required
                  />
                </div>
                
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL *</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/certificate-image.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Certificate URL *</label>
                <Input
                  value={formData.certificate_url}
                  onChange={(e) => setFormData({ ...formData, certificate_url: e.target.value })}
                  placeholder="https://example.com/verify-certificate"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Skills (comma-separated)</label>
                <Input
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, JavaScript, TypeScript"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Frontend, Web Development, React"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the certificate..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured certificate
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
                  {isSubmitting ? "Adding..." : "Add Certificate"}
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
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Certificates List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certificates ({filteredCertificates.length})
          </CardTitle>
          <CardDescription>
            Manage your professional certifications and achievements
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
          ) : filteredCertificates.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No certificates match your search.' : 'Start by adding your first certificate.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Certificate
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCertificates.map((certificate) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{certificate.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building className="w-3 h-3" />
                              {certificate.issuer}
                              <Calendar className="w-3 h-3 ml-2" />
                              {certificate.date}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {certificate.featured && (
                              <Badge variant="secondary" className="gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline">{certificate.category}</Badge>
                          </div>
                        </div>
                        
                        {certificate.description && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {certificate.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {certificate.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {certificate.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{certificate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(certificate)}
                        className="gap-1"
                      >
                        {certificate.featured ? (
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
                          href={certificate.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(certificate)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Certificate</DialogTitle>
                            <DialogDescription>
                              Update the certificate information
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Title *</label>
                                <Input
                                  value={formData.title}
                                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                  placeholder="Certificate title"
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Issuer *</label>
                                <Input
                                  value={formData.issuer}
                                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                  placeholder="Issuing organization"
                                  required
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Date *</label>
                                <Input
                                  value={formData.date}
                                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                  placeholder="2024"
                                  required
                                />
                              </div>
                              
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
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Image URL *</label>
                              <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/certificate-image.jpg"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Certificate URL *</label>
                              <Input
                                value={formData.certificate_url}
                                onChange={(e) => setFormData({ ...formData, certificate_url: e.target.value })}
                                placeholder="https://example.com/verify-certificate"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Skills (comma-separated)</label>
                              <Input
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                placeholder="React, JavaScript, TypeScript"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Tags (comma-separated)</label>
                              <Input
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Frontend, Web Development, React"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description</label>
                              <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of the certificate..."
                                rows={3}
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="featured-edit"
                                checked={formData.featured}
                                onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                              />
                              <label htmlFor="featured-edit" className="text-sm font-medium">
                                Featured certificate
                              </label>
                            </div>

                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  resetForm();
                                  setEditingCertificate(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update Certificate"}
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
                            <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{certificate.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex justify-end gap-2">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(certificate.id)}
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

export default CertificatesManager;