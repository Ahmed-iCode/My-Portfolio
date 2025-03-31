
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card text-card-foreground pt-12 pb-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-bold text-primary">
              <span className="text-foreground">Dev</span>Portfolio
            </a>
            <p className="mt-2 text-muted-foreground max-w-md">
              A showcase of my web development projects, skills, and professional journey.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
            <span className="text-sm text-muted-foreground mt-2">Back to top</span>
          </div>
        </div>
        
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
              &copy; {currentYear} John Doe. All rights reserved.
            </p>
            
            <nav className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
