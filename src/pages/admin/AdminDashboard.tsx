import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Award, 
  FolderOpen, 
  FileText, 
  Plus,
  BarChart3,
  Shield,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useCertificates, useProjects, useArticles } from '@/hooks/useLocalData';
import CertificatesManager from '@/components/admin/CertificatesManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ArticlesManager from '@/components/admin/ArticlesManager';
import DataExporter from '@/components/admin/DataExporter';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch data for overview
  const { data: certificates } = useCertificates();
  const { data: projects } = useProjects();
  const { data: articles } = useArticles();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin dashboard.",
    });
  };

  const stats = [
    {
      title: "Total Certificates",
      value: certificates?.length || 0,
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Total Projects",
      value: projects?.length || 0,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Total Articles",
      value: articles?.length || 0,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Featured Items",
      value: (certificates?.filter(c => c.featured).length || 0) + 
             (projects?.filter(p => p.featured).length || 0) + 
             (articles?.filter(a => a.featured).length || 0),
      icon: BarChart3,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Portfolio Content Management (Local Mode)</p>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">
                  Welcome to your local portfolio content management system. All data is stored locally in your browser.
                </p>
              </div>

              {/* Local Mode Notice */}
              <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Local Mode Active</span>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Your data is stored locally in your browser. Use the Export tab to sync changes with your codebase.
                  </p>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                          </div>
                          <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common tasks to manage your portfolio content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab('certificates')}
                    >
                      <Award className="w-6 h-6 text-blue-600" />
                      <span className="font-medium">Add Certificate</span>
                      <span className="text-xs text-muted-foreground">Add a new certification</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab('projects')}
                    >
                      <FolderOpen className="w-6 h-6 text-green-600" />
                      <span className="font-medium">Add Project</span>
                      <span className="text-xs text-muted-foreground">Showcase a new project</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab('articles')}
                    >
                      <FileText className="w-6 h-6 text-purple-600" />
                      <span className="font-medium">Write Article</span>
                      <span className="text-xs text-muted-foreground">Create a new blog post</span>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab('export')}
                    >
                      <Download className="w-6 h-6 text-indigo-600" />
                      <span className="font-medium">Export Data</span>
                      <span className="text-xs text-muted-foreground">Sync with codebase</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates to your portfolio content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificates?.slice(0, 2).map((cert) => (
                      <div key={cert.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Award className="w-4 h-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium">{cert.title}</p>
                          <p className="text-sm text-muted-foreground">Certificate from {cert.issuer}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{cert.date}</span>
                      </div>
                    ))}
                    
                    {projects?.slice(0, 2).map((project) => (
                      <div key={project.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <FolderOpen className="w-4 h-4 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-muted-foreground">Project</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}

                    {articles?.slice(0, 1).map((article) => (
                      <div key={article.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <div className="flex-1">
                          <p className="font-medium">{article.title}</p>
                          <p className="text-sm text-muted-foreground">Blog Article</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.published_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <CertificatesManager />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <ArticlesManager />
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export">
            <DataExporter />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;