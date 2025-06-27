import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Home', url: '/', external: false },
    { title: 'Projects', url: '/projects', external: false },
    { title: 'Certificates', url: '/certificates', external: false },
    { title: 'Skills', url: '/#skills', external: false },
    { title: 'Contact', url: '/#contact', external: false },
  ];

  const isActiveLink = (url: string) => {
    if (url === '/') return location.pathname === '/';
    if (url.startsWith('/#')) return location.pathname === '/' && location.hash === url.substring(1);
    return location.pathname === url;
  };

  const handleNavClick = (url: string) => {
    if (url.startsWith('/#')) {
      const element = document.querySelector(url.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
    )}>
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          aria-label="Ahmed Samir Portfolio Home"
        >
          <span className="text-foreground">Ahmed</span>
          <span className="text-primary">Samir</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
          {navLinks.map((link, index) => (
            link.url.startsWith('/') && !link.url.startsWith('/#') ? (
              <Link 
                key={index} 
                to={link.url}
                className={cn(
                  "nav-link transition-colors duration-300",
                  isActiveLink(link.url) ? "text-primary" : "text-foreground hover:text-primary"
                )}
                aria-current={isActiveLink(link.url) ? "page" : undefined}
              >
                {link.title}
              </Link>
            ) : (
              <a 
                key={index} 
                href={link.url}
                onClick={(e) => {
                  if (link.url.startsWith('/#')) {
                    e.preventDefault();
                    handleNavClick(link.url);
                  }
                }}
                className={cn(
                  "nav-link transition-colors duration-300",
                  isActiveLink(link.url) ? "text-primary" : "text-foreground hover:text-primary"
                )}
                aria-current={isActiveLink(link.url) ? "page" : undefined}
              >
                {link.title}
              </a>
            )
          ))}
          <ThemeToggle />
        </nav>
        
        {/* Mobile Navigation Controls */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        id="mobile-menu"
        className={cn(
          'fixed top-[60px] right-0 w-full bg-background/95 backdrop-blur-sm md:hidden transition-all duration-300 ease-in-out shadow-lg border-t',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
        )}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col p-5 space-y-4">
          {navLinks.map((link, index) => (
            link.url.startsWith('/') && !link.url.startsWith('/#') ? (
              <Link 
                key={index} 
                to={link.url}
                className={cn(
                  "text-lg py-2 border-b border-muted transition-colors",
                  isActiveLink(link.url) ? "text-primary font-medium" : "text-foreground hover:text-primary"
                )}
                onClick={() => setIsOpen(false)}
                aria-current={isActiveLink(link.url) ? "page" : undefined}
              >
                {link.title}
              </Link>
            ) : (
              <a 
                key={index} 
                href={link.url}
                onClick={(e) => {
                  if (link.url.startsWith('/#')) {
                    e.preventDefault();
                    handleNavClick(link.url);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "text-lg py-2 border-b border-muted transition-colors",
                  isActiveLink(link.url) ? "text-primary font-medium" : "text-foreground hover:text-primary"
                )}
                aria-current={isActiveLink(link.url) ? "page" : undefined}
              >
                {link.title}
              </a>
            )
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;