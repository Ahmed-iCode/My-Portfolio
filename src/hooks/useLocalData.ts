import { useState, useEffect } from 'react';
import { Certificate, initialCertificates } from '@/data/certificates';
import { Project, initialProjects } from '@/data/projects';
import { Article, initialArticles } from '@/data/articles';

// Local storage keys
const STORAGE_KEYS = {
  CERTIFICATES: 'portfolio_certificates',
  PROJECTS: 'portfolio_projects',
  ARTICLES: 'portfolio_articles',
} as const;

// Generic hook for managing local data
function useLocalStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(data) : value;
      setData(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [data, setValue] as const;
}

// Certificates hook
export const useCertificates = () => {
  const [certificates, setCertificates] = useLocalStorage(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const addCertificate = (certificate: Omit<Certificate, 'id' | 'created_at' | 'updated_at'>) => {
    const newCertificate: Certificate = {
      ...certificate,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCertificates(prev => [newCertificate, ...prev]);
    return newCertificate;
  };

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    setCertificates(prev => 
      prev.map(cert => 
        cert.id === id 
          ? { ...cert, ...updates, updated_at: new Date().toISOString() }
          : cert
      )
    );
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setCertificates(prev => 
      prev.map(cert => 
        cert.id === id 
          ? { ...cert, featured: !cert.featured, updated_at: new Date().toISOString() }
          : cert
      )
    );
  };

  return {
    data: certificates,
    isLoading,
    error: null,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    toggleFeatured,
  };
};

// Featured certificates hook
export const useFeaturedCertificates = () => {
  const { data: certificates, isLoading } = useCertificates();
  
  return {
    data: certificates?.filter(cert => cert.featured) || [],
    isLoading,
    error: null,
  };
};

// Certificate categories hook
export const useCertificateCategories = () => {
  const { data: certificates, isLoading } = useCertificates();
  
  const categories = certificates ? 
    ['All', ...new Set(certificates.map(cert => cert.category))] : 
    ['All'];

  return {
    data: categories,
    isLoading,
    error: null,
  };
};

// Projects hook
export const useProjects = () => {
  const [projects, setProjects] = useLocalStorage(STORAGE_KEYS.PROJECTS, initialProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const addProject = (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id 
          ? { ...project, ...updates, updated_at: new Date().toISOString() }
          : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return {
    data: projects,
    isLoading,
    error: null,
    addProject,
    updateProject,
    deleteProject,
  };
};

// Featured projects hook
export const useFeaturedProjects = () => {
  const { data: projects, isLoading } = useProjects();
  
  return {
    data: projects?.filter(project => project.featured) || [],
    isLoading,
    error: null,
  };
};

// Articles hook
export const useArticles = () => {
  const [articles, setArticles] = useLocalStorage(STORAGE_KEYS.ARTICLES, initialArticles);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const addArticle = (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === id 
          ? { ...article, ...updates, updated_at: new Date().toISOString() }
          : article
      )
    );
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  return {
    data: articles,
    isLoading,
    error: null,
    addArticle,
    updateArticle,
    deleteArticle,
  };
};

// Featured articles hook
export const useFeaturedArticles = () => {
  const { data: articles, isLoading } = useArticles();
  
  return {
    data: articles?.filter(article => article.featured) || [],
    isLoading,
    error: null,
  };
};

// Article by slug hook
export const useArticleBySlug = (slug: string) => {
  const { data: articles, isLoading } = useArticles();
  
  const article = articles?.find(article => article.slug === slug);
  
  return {
    data: article,
    isLoading,
    error: article ? null : new Error('Article not found'),
  };
};

// Article categories hook
export const useArticleCategories = () => {
  const { data: articles, isLoading } = useArticles();
  
  const categories = articles ? 
    ['All', ...new Set(articles.map(article => article.category))] : 
    ['All'];

  return {
    data: categories,
    isLoading,
    error: null,
  };
};