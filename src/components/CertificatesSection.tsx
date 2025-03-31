
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Calendar, ExternalLink } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialLink: string;
  category: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Udacity",
    date: "May 2023",
    description: "Comprehensive program covering both frontend and backend technologies including React, Node.js, and database management.",
    credentialLink: "https://credential-link.com",
    category: "Development"
  },
  {
    id: 2,
    title: "AWS Certified Developer Associate",
    issuer: "Amazon Web Services",
    date: "March 2023",
    description: "Professional certification validating expertise in developing, deploying, and debugging cloud-based applications using AWS.",
    credentialLink: "https://credential-link.com",
    category: "Cloud"
  },
  {
    id: 3,
    title: "Advanced React & Redux",
    issuer: "Udemy",
    date: "January 2023",
    description: "In-depth course on advanced React patterns, Redux state management, middleware, and testing.",
    credentialLink: "https://credential-link.com",
    category: "Development"
  },
  {
    id: 4,
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "November 2022",
    description: "Certification demonstrating knowledge of Scrum framework, accountability, and Scrum Master role.",
    credentialLink: "https://credential-link.com",
    category: "Management"
  }
];

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-24">
      <div className="container">
        <h2 className="section-title">Certificates</h2>
        <p className="text-muted-foreground mb-12 max-w-3xl">
          Professional certifications I've earned, showcasing my commitment to continuous learning and skill development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="mb-1">{certificate.title}</CardTitle>
                    <CardDescription>{certificate.issuer}</CardDescription>
                  </div>
                  <Award className="text-secondary" size={24} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {certificate.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={16} className="mr-2" />
                  <span>{certificate.date}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">{certificate.category}</Badge>
                <Button size="sm" variant="outline" asChild>
                  <a href={certificate.credentialLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-1" /> View Credential
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
