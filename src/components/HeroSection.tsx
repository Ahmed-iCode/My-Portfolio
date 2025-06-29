import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackCVDownload, trackNavigation } from '@/utils/analytics';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      trackNavigation('hero', sectionId.replace('#', ''), 'scroll_button');
    }
  };

  const handleCVDownload = () => {
    trackCVDownload();
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-secondary font-medium mb-3 text-lg">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
              <span className="text-foreground">Ahmed</span>{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Samir
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-muted-foreground">
              Full Stack Developer
            </h2>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl leading-relaxed">
              I build exceptional and accessible digital experiences for the web. Focused on creating responsive,
              user-friendly applications with modern technologies like React, Node.js, and TypeScript.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-3 h-auto"
              onClick={() => scrollToSection('#projects')}
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-lg px-8 py-3 h-auto"
              onClick={() => scrollToSection('#contact')}
            >
              <Mail className="mr-2" size={20} />
              Contact Me
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto md:mx-0"
          >
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary">6+</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary">2+</div>
              <div className="text-sm text-muted-foreground">Years Learning</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        onClick={() => scrollToSection('#projects')}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-primary transition-colors"
        aria-label="Scroll to projects section"
      >
        <ArrowDown className="text-primary" size={32} />
      </motion.button>
    </section>
  );
};

export default HeroSection;
