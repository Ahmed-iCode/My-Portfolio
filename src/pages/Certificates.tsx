import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Award, Calendar, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CertificateModal from '@/components/CertificateModal';
import CertificateSkeleton from '@/components/CertificateSkeleton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollTracking, useTimeTracking } from '@/hooks/usePageTracking';
import { trackSearch, trackFilter, trackCertificateView, trackCertificateVerification } from '@/utils/analytics';
import { useCertificates, useCertificateCategories } from '@/hooks/useLocalData';
import type { Certificate } from '@/data/certificates';

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from local storage
  const { data: certificates, isLoading: isLoadingCertificates, error } = useCertificates();
  const { data: categories } = useCertificateCategories();

  // Track user engagement
  useScrollTracking('certificates');
  useTimeTracking('certificates');

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Filter certificates based on category and search term
  const filteredCertificates = useMemo(() => {
    if (!certificates) return [];
    
    return certificates.filter(cert => {
      const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        cert.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [certificates, selectedCategory, searchTerm]);

  // Track search usage
  useEffect(() => {
    if (searchTerm.length > 2) {
      const timeoutId = setTimeout(() => {
        trackSearch(searchTerm, 'certificates', filteredCertificates.length);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, filteredCertificates.length]);

  // Get certificate count by category
  const getCategoryCount = (category: string) => {
    if (!certificates) return 0;
    if (category === 'All') return certificates.length;
    return certificates.filter(cert => cert.category === category).length;
  };

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    trackCertificateView(certificate.title, certificate.issuer);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    trackFilter('category', category, 'certificates');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  if (error) {
    console.error('Error loading certificates:', error);
  }

  const showLoading = isLoading || isLoadingCertificates;

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
            <h1 className="text-4xl font-bold mb-4">My Certificates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of my learning achievements across various domains including programming, 
              web development, design, and professional skills.
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
                placeholder="Search certificates, skills, or platforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                disabled={showLoading}
              />
            </div>

            {/* Category Filter Buttons */}
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
          {!showLoading && certificates && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-center"
            >
              <p className="text-muted-foreground">
                Showing {filteredCertificates.length} of {certificates.length} certificates
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </motion.div>
          )}

          {/* Certificates Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {showLoading ? (
              // Show skeleton loaders
              Array.from({ length: 9 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <CertificateSkeleton />
                </motion.div>
              ))
            ) : filteredCertificates.length > 0 ? (
              // Show actual certificates
              filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer border hover:shadow-xl transition-all duration-300"
                  onClick={() => handleCertificateClick(cert)}
                >
                  {/* Certificate Image */}
                  <div className="relative overflow-hidden bg-muted/30">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {cert.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs font-medium">
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                      </div>
                      <Award className="text-primary ml-2 flex-shrink-0" size={20} />
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Description Preview */}
                    {cert.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                    )}

                    {/* View Certificate Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary font-medium group-hover:underline">
                        View Details
                      </span>
                      <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // No Results Message
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-muted-foreground mb-4">
                  <Award size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No certificates found</h3>
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
          </motion.div>
        </div>

        {/* Certificate Modal */}
        <CertificateModal
          certificate={selectedCertificate}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Certificates;