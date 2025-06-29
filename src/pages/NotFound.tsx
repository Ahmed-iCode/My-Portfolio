import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* 404 Number */}
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold text-primary mb-4"
            >
              404
            </motion.h1>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-sm text-muted-foreground">
                Attempted to access: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/">
                  <Home size={20} className="mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft size={20} className="mr-2" />
                Go Back
              </Button>
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">
                You might be looking for:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/projects" 
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  Projects
                </Link>
                <Link 
                  to="/certificates" 
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  Certificates
                </Link>
                <Link 
                  to="/#contact" 
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;