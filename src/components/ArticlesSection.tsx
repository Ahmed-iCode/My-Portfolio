
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, ArrowRight } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
  featured: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Building Accessible React Applications",
    excerpt: "A comprehensive guide to implementing accessibility best practices in React applications to ensure they are usable by everyone.",
    date: "June 15, 2023",
    readTime: "8 min read",
    category: "Accessibility",
    link: "https://article-link.com",
    featured: true
  },
  {
    id: 2,
    title: "State Management Patterns in Modern React",
    excerpt: "An exploration of different state management approaches in React, from Context API to Redux and the newer alternatives.",
    date: "May 22, 2023",
    readTime: "10 min read",
    category: "React",
    link: "https://article-link.com",
    featured: true
  },
  {
    id: 3,
    title: "Optimizing API Requests with React Query",
    excerpt: "Learn how to efficiently manage server state and optimize API requests in React applications using React Query.",
    date: "April 10, 2023",
    readTime: "7 min read",
    category: "Performance",
    link: "https://article-link.com",
    featured: true
  },
  {
    id: 4,
    title: "Implementing Dark Mode in React Applications",
    excerpt: "A step-by-step guide to adding a dark mode toggle to your React application using CSS variables and React Context.",
    date: "March 5, 2023",
    readTime: "6 min read",
    category: "UI/UX",
    link: "https://article-link.com",
    featured: false
  },
  {
    id: 5,
    title: "Microservices vs. Monoliths: When to Choose What",
    excerpt: "An analysis of different architectural approaches and how to choose the right one for your specific project requirements.",
    date: "February 18, 2023",
    readTime: "9 min read",
    category: "Architecture",
    link: "https://article-link.com",
    featured: false
  }
];

const ArticlesSection = () => {
  const featuredArticles = articles.filter(article => article.featured);
  const moreArticles = articles.filter(article => !article.featured);

  return (
    <section id="articles" className="bg-muted py-24">
      <div className="container">
        <h2 className="section-title">Articles</h2>
        <p className="text-muted-foreground mb-12 max-w-3xl">
          Technical articles, tutorials, and insights that I've written and published, sharing my knowledge and experiences in web development.
        </p>
        
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Featured Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <FileText className="text-secondary" size={20} />
                  </div>
                  <CardTitle className="hover:text-primary transition-colors">
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    <span className="mr-4">{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full group" asChild>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      Read Article
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-6">More Articles</h3>
          <div className="space-y-4">
            {moreArticles.map((article) => (
              <Card key={article.id} className="card-hover">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <Badge variant="outline" className="mb-2">{article.category}</Badge>
                      <h4 className="text-lg font-medium hover:text-primary transition-colors">
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          {article.title}
                        </a>
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Calendar size={14} className="mr-2" />
                        <span className="mr-4">{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="group" asChild>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        Read Article
                        <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
