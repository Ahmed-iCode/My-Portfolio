import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Award, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { useFeaturedCertificates } from '@/hooks/useSupabaseData';
import CertificateSkeleton from '@/components/CertificateSkeleton';

const CertificatesSection: React.FC = () => {
  const { data: featuredCertificates, isLoading, error } = useFeaturedCertificates();

  if (error) {
    console.error('Error loading featured certificates:', error);
  }

  return (
    <section id="certificates" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications 
            and specialized training programs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CertificateSkeleton />
              </motion.div>
            ))
          ) : featuredCertificates && featuredCertificates.length > 0 ? (
            featuredCertificates.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-muted/30">
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate from ${cert.issuer}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {cert.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Award className="text-primary bg-background/90 p-1 rounded-full" size={24} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 font-medium">{cert.issuer}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{cert.date}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {cert.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                  
                  <a
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                    aria-label={`View ${cert.title} certificate`}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Certificate
                  </a>
                </div>
              </motion.article>
            ))
          ) : (
            // Fallback message if no certificates
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-muted-foreground">No featured certificates available at the moment.</p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/certificates">
            <Button size="lg" variant="outline" className="group">
              View All Certificates
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;