import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BlogSkeleton from '@/components/BlogSkeleton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollTracking, useTimeTracking } from '@/hooks/usePageTracking';
import { trackSearch, trackFilter } from '@/utils/analytics';
import { useArticles, useArticleCategories } from '@/hooks/useSupabaseData';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Supabase
  const { data: articles, isLoading: isLoadingArticles, error } = useArticles();
  const { data: categories } = useArticleCategories();

  // Track user engagement
  useScrollTracking('blog');
  useTimeTracking('blog');

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchTerm]);

  // Track search usage
  useEffect(() => {
    if (searchTerm.length > 2) {
      const timeoutId = setTimeout(() => {
        trackSearch(searchTerm, 'blog', filteredArticles.length);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, filteredArticles.length]);

  // Get article count by category
  const getCategoryCount = (category: string) => {
    if (!articles) return 0;
    if (category === 'All') return articles.length;
    return articles.filter(article => article.category === category).length;
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    trackFilter('category', category, 'blog');
  };

  // Separate featured and regular articles
  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  if (error) {
    console.error('Error loading articles:', error);
  }

  const showLoading = isLoading || isLoadingArticles;

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Articles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing my learning journey, technical insights, and experiences in web development. 
              From beginner tutorials to advanced concepts and project breakdowns.
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
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                disabled={showLoading}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {(categories || ['All']).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                  className="relative"
                  disabled={showLoading}
                >
                  <Filter size={14} className="mr-2" />
                  {category}
                  <span className="ml-2 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                    {getCategoryCount(category)}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Summary */}
          {!showLoading && articles && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center"
            >
              <p className="text-muted-foreground">
                Showing {filteredArticles.length} of {articles.length} articles
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </motion.div>
          )}

          {showLoading ? (
            // Show skeleton loaders
            <div className="space-y-12">
              {/* Featured Articles Skeleton */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-primary">★</span>
                  <div className="h-6 w-40 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <BlogSkeleton variant="featured" />
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Regular Articles Skeleton */}
              <section>
                <div className="h-6 w-32 bg-muted rounded animate-pulse mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <BlogSkeleton variant="regular" />
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <>
              {/* Featured Articles */}
              {featuredArticles.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">★</span>
                    Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredArticles.map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="group bg-card rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300"
                      >
                        {article.image && (
                          <div className="relative overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{formatDate(article.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{article.reading_time} min read</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                                +{article.tags.length - 3} more
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/blog/${article.slug}`}
                            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            Read Article
                            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Regular Articles */}
              {regularArticles.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {featuredArticles.length > 0 && (
                    <h2 className="text-2xl font-bold mb-6">All Articles</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularArticles.map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="group bg-card rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300"
                      >
                        {article.image && (
                          <div className="relative overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-background/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs font-medium">
                                {article.category}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{formatDate(article.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{article.reading_time} min</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {article.tags.slice(0, 2).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 2 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                                +{article.tags.length - 2}
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/blog/${article.slug}`}
                            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                          >
                            Read More
                            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* No Results Message */}
              {filteredArticles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-muted-foreground mb-4">
                    <Tag size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                    <p>Try adjusting your search terms or category filter.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;