import { useQuery } from '@tanstack/react-query';
import { supabase, type Certificate, type Project, type Article } from '@/lib/supabase';

// Certificates hooks
export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Certificate[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedCertificates = () => {
  return useQuery({
    queryKey: ['certificates', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Certificate[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCertificateCategories = () => {
  return useQuery({
    queryKey: ['certificates', 'categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('category')
        .order('category');
      
      if (error) throw error;
      
      const categories = ['All', ...new Set(data.map(item => item.category))];
      return categories;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Projects hooks
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Articles hooks
export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('featured', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['articles', 'slug', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Article;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useArticleCategories = () => {
  return useQuery({
    queryKey: ['articles', 'categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('category')
        .order('category');
      
      if (error) throw error;
      
      const categories = ['All', ...new Set(data.map(item => item.category))];
      return categories;
    },
    staleTime: 10 * 60 * 1000,
  });
};