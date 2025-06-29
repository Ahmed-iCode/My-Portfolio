import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Award, Tag } from 'lucide-react';
import { Certificate } from '@/data/certificates';
import { trackCertificateVerification } from '@/utils/analytics';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  if (!certificate) return null;

  const handleVerificationClick = () => {
    trackCertificateVerification(certificate.title, certificate.issuer);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Certificate Image */}
              <div className="lg:w-1/2 bg-muted/30 flex items-center justify-center p-6">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Certificate Details */}
              <div className="lg:w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="text-primary" size={20} />
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {certificate.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{certificate.title}</h2>
                    <p className="text-lg text-muted-foreground">{certificate.issuer}</p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={16} />
                    <span>{certificate.date}</span>
                  </div>

                  {/* Description */}
                  {certificate.description && (
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {certificate.description}
                      </p>
                    </div>
                  )}

                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold mb-3">Skills Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Tag size={16} />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {certificate.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Certificate Button */}
                  <div className="pt-4">
                    <a
                      href={certificate.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      onClick={handleVerificationClick}
                    >
                      <ExternalLink size={16} />
                      View Original Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;