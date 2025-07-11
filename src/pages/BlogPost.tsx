import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollTracking, useTimeTracking } from '@/hooks/usePageTracking';
import { trackArticleView, trackArticleShare } from '@/utils/analytics';
import { useArticleBySlug, useArticles } from '@/hooks/useLocalData';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticleBySlug(slug || '');
  const { data: allArticles } = useArticles();

  // Track user engagement
  useScrollTracking(`blog-post-${slug}`);
  useTimeTracking(`blog-post-${slug}`);

  // Update document title and meta tags
  useEffect(() => {
    if (article) {
      document.title = article.meta_title || `${article.title} - Ahmed Samir`;
      
      // Track article view
      trackArticleView(article.title, article.category, article.reading_time);
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && article.meta_description) {
        metaDescription.setAttribute('content', article.meta_description);
      }

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (article.keywords && article.keywords.length > 0) {
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', article.keywords.join(', '));
      }
    }

    // Cleanup function to reset title
    return () => {
      document.title = 'Ahmed Samir | Full Stack Developer & Software Engineer';
    };
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-20">
          <div className="container max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-muted rounded mb-8"></div>
              <div className="h-12 w-3/4 bg-muted rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-muted rounded mb-8"></div>
              <div className="h-64 w-full bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-5/6 bg-muted rounded"></div>
                <div className="h-4 w-4/6 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackArticleShare(article.title, 'native_share');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      trackArticleShare(article.title, 'clipboard');
      // You could show a toast notification here
    }
  };

  // Custom components for ReactMarkdown
  const markdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-lg my-4"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="mb-1">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
    a: ({ href, children }: any) => (
      <a 
        href={href} 
        className="text-primary hover:text-primary/80 transition-colors underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <article className="container max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/blog">
              <Button variant="ghost" className="group">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Category and Featured Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              {article.featured && (
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                  ★ Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.reading_time} min read</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                Share
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Featured Image */}
            {article.image && (
              <div className="mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {article.content}
            </ReactMarkdown>
          </motion.div>

          {/* Article Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="font-semibold mb-2">About the Author</h3>
                <p className="text-muted-foreground">
                  Ahmed Samir is a Full Stack Developer passionate about creating exceptional digital experiences.
                  Follow his journey in web development and technology.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/projects">
                  <Button variant="outline" size="sm">
                    View Projects
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="sm">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </motion.footer>

          {/* Related Articles */}
          {allArticles && allArticles.length > 1 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold mb-6">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allArticles
                  .filter(a => a.id !== article.id)
                  .slice(0, 2)
                  .map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/blog/${relatedArticle.slug}`}
                      className="group bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(relatedArticle.published_at)}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {relatedArticle.reading_time} min
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </motion.section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;