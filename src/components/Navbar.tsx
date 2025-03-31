
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', url: '#hero' },
    { title: 'Projects', url: '#projects' },
    { title: 'Skills', url: '#skills' },
    { title: 'Certificates', url: '#certificates' },
    { title: 'Articles', url: '#articles' },
    { title: 'Contact', url: '#contact' },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-40 transition-all duration-300',
      scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
    )}>
      <div className="container flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-primary">
          <span className="text-foreground">Dev</span>Portfolio
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url}
              className="nav-link"
            >
              {link.title}
            </a>
          ))}
        </nav>
        
        {/* Mobile Nav Button */}
        <Button 
          variant="ghost" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile Nav Menu */}
      <div className={cn(
        'fixed top-[60px] right-0 w-full bg-background/95 backdrop-blur-sm md:hidden transition-all duration-300 ease-in-out shadow-lg',
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      )}>
        <nav className="flex flex-col p-5 space-y-4">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              className="text-lg py-2 border-b border-muted" 
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
