import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Github, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectSkeleton from '@/components/ProjectSkeleton';
import { useScrollTracking, useTimeTracking } from '@/hooks/usePageTracking';
import { trackSearch, trackFilter, trackProjectDemo, trackProjectCode, trackProjectView } from '@/utils/analytics';
import { useProjects } from '@/hooks/useSupabaseData';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from Supabase
  const { data: projects, isLoading: isLoadingProjects, error } = useProjects();

  // Track user engagement
  useScrollTracking('projects');
  useTimeTracking('projects');

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    if (!projects) return ['All'];
    const techs = projects.flatMap(project => project.tech_stack);
    return ['All', ...Array.from(new Set(techs))];
  }, [projects]);

  // Filter projects based on search and technology
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech_stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTech = selectedTech === 'All' || project.tech_stack.includes(selectedTech);
      
      return matchesSearch && matchesTech;
    });
  }, [projects, searchTerm, selectedTech]);

  // Track search usage
  useEffect(() => {
    if (searchTerm.length > 2) {
      const timeoutId = setTimeout(() => {
        trackSearch(searchTerm, 'projects', filteredProjects.length);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, filteredProjects.length]);

  const handleTechFilter = (tech: string) => {
    setSelectedTech(tech);
    trackFilter('technology', tech, 'projects');
  };

  const handleProjectDemo = (project: any) => {
    trackProjectDemo(project.title, project.demo_link);
  };

  const handleProjectCode = (project: any) => {
    trackProjectCode(project.title, project.github_link);
  };

  const handleProjectView = (project: any) => {
    trackProjectView(project.title, project.tech_stack);
  };

  if (error) {
    console.error('Error loading projects:', error);
  }

  const showLoading = isLoading || isLoadingProjects;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of projects showcasing my skills in web development, 
              from simple templates to complex applications with modern technologies.
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search projects or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                disabled={showLoading}
              />
            </div>

            {/* Technology Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {allTechnologies.map((tech) => (
                <Button
                  key={tech}
                  variant={selectedTech === tech ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTechFilter(tech)}
                  className="text-xs"
                  disabled={showLoading}
                >
                  <Filter size={12} className="mr-1" />
                  {tech}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Summary */}
          {!showLoading && projects && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-center"
            >
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
                {selectedTech !== 'All' && ` using ${selectedTech}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </motion.div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showLoading ? (
              // Show skeleton loaders
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectSkeleton />
                </motion.div>
              ))
            ) : filteredProjects.length > 0 ? (
              // Show actual projects
              filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group bg-card rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300"
                  onClick={() => handleProjectView(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium cursor-pointer hover:bg-secondary/20 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTechFilter(tech);
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <a
                          href={project.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                          aria-label={`View ${project.title} live demo`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectDemo(project);
                          }}
                        >
                          <ExternalLink size={16} className="mr-1" />
                          Live Demo
                        </a>
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                          aria-label={`View ${project.title} source code`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectCode(project);
                          }}
                        >
                          <Github size={16} className="mr-1" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              // No results message
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-muted-foreground mb-4">
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p>Try adjusting your search terms or technology filter.</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTech('All');
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;