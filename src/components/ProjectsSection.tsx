
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for e-commerce businesses with real-time analytics, inventory management, and order tracking.",
    image: "https://via.placeholder.com/600x340",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/username/project",
    featured: true
  },
  {
    id: 2,
    title: "Weather Forecast App",
    description: "A weather application that provides current conditions and 5-day forecasts for locations worldwide using the OpenWeather API.",
    image: "https://via.placeholder.com/600x340",
    techStack: ["React", "Redux", "OpenWeather API", "Chart.js"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/username/project",
    featured: true
  },
  {
    id: 3,
    title: "Task Management System",
    description: "A Kanban-style task management application with drag-and-drop functionality, user assignments, and deadline tracking.",
    image: "https://via.placeholder.com/600x340",
    techStack: ["React", "TypeScript", "Firebase", "React DnD"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/username/project",
    featured: true
  },
  {
    id: 4,
    title: "Personal Finance Tracker",
    description: "A budgeting tool that allows users to track expenses, set savings goals, and visualize spending patterns.",
    image: "https://via.placeholder.com/600x340",
    techStack: ["Vue.js", "Vuex", "Firebase", "D3.js"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/username/project",
    featured: false
  },
  {
    id: 5,
    title: "Recipe Finder",
    description: "A recipe search engine that lets users find recipes based on ingredients they have, dietary restrictions, and meal types.",
    image: "https://via.placeholder.com/600x340",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/username/project",
    featured: false
  },
  {
    id: 6,
    title: "Movie Recommendation App",
    description: "A movie recommendation platform that suggests films based on user preferences, ratings, and viewing history.",
    image: "https://via.placeholder.com/600x340",
    techStack: ["React", "Node.js", "PostgreSQL", "Express"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/username/project",
    featured: false
  }
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-24">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="text-muted-foreground mb-12 max-w-3xl">
          A showcase of my recent development projects, featuring live demos and detailed 
          descriptions of the technologies used.
        </p>
        
        <h3 className="text-xl font-semibold mb-6">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="card-hover">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <CardDescription className="text-sm mb-4">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" variant="outline" asChild>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-1" /> Live Demo
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github size={16} className="mr-1" /> Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-6">Other Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project) => (
            <Card key={project.id} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Code size={20} className="text-secondary" />
                </div>
                <CardDescription className="text-sm mb-4">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline">{tech}</Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="outline">+{project.techStack.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button size="sm" variant="ghost" className="p-2 h-auto" asChild>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <ExternalLink size={18} />
                  </a>
                </Button>
                <Button size="sm" variant="ghost" className="p-2 h-auto" asChild>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
