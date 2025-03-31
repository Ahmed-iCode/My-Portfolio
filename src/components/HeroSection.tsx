
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
          <p className="text-secondary font-medium mb-3 animate-fade-in">Hello, I'm</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            <span className="text-foreground">Ahmed</span>{' '}
            <span className="text-primary">Samir</span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-muted-foreground animate-fade-in">
            Full Stack Developer
          </h2>
          <p className="text-lg mb-8 text-muted-foreground max-w-xl animate-fade-in">
            I build exceptional and accessible digital experiences for the web. Focused on creating responsive,
            user-friendly applications with modern technologies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>
      <a 
        href="#projects" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="text-primary" size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
