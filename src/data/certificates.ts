export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  certificate_url: string;
  skills: string[];
  featured: boolean;
  category: string;
  tags: string[];
  description?: string;
  created_at: string;
  updated_at: string;
}

export const initialCertificates: Certificate[] = [
  {
    "title": "Getting Started with Git and GitHub",
    "issuer": "IBM",
    "date": "2025",
    "image": "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~YGBJY0A59MP0/CERTIFICATE_LANDING_PAGE~YGBJY0A59MP0.jpeg",
    "certificate_url": "https://www.coursera.org/account/accomplishments/verify/YGBJY0A59MP0",
    "category": "Tools",
    "skills": [
      "Github",
      "Git",
      "DevOps"
    ],
    "tags": [
      "Github"
    ],
    "featured": false,
    "id": "1751219867558",
    "created_at": "2025-06-29T17:57:47.558Z",
    "updated_at": "2025-06-29T17:57:47.558Z"
  },
  {
    "id": "1",
    "title": "McKinsey.org Forward Program",
    "issuer": "McKinsey",
    "date": "2024",
    "image": "https://i.postimg.cc/x1fCv8cC/Mc-Kinsey-org-Forward20250331-27-3gy9s0.png",
    "certificate_url": "https://www.credly.com/badges/db88e8bd-a0c1-4d4b-a0fb-48ec7f0e5b11",
    "skills": [
      "Adaptability & Resilience",
      "Problem Solving",
      "Communicating for Impact",
      "Relationships & Well-being",
      "Leadership"
    ],
    "featured": true,
    "category": "Soft Skills",
    "tags": [
      "McKinsey",
      "Leadership",
      "Problem Solving",
      "Communication",
      "Professional Development"
    ],
    "description": "Comprehensive leadership and professional development program by McKinsey",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": "2",
    "title": "Frontend Engineering with React",
    "issuer": "Manara",
    "date": "2024",
    "image": "https://i.postimg.cc/HLT0VcPN/Frontend-Engineering-with-React-Manara.png",
    "certificate_url": "https://app.manara.tech/verify-certificate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0aWZpY2F0ZUlkIjozNDA2MywiaWF0IjoxNzQzNTI5NjY2fQ.yYxorgRxVc73AJ0oEzdq1r8pqImyw7gTn7rCTBq37RU",
    "skills": [
      "React",
      "Frontend",
      "Web Development"
    ],
    "featured": true,
    "category": "Web Development",
    "tags": [
      "React",
      "Frontend",
      "Manara",
      "JavaScript",
      "Component-based"
    ],
    "description": "Comprehensive React frontend engineering course",
    "created_at": "2024-02-01T00:00:00Z",
    "updated_at": "2024-02-01T00:00:00Z"
  },
  {
    "id": "3",
    "title": "Introduction to Software Engineering",
    "issuer": "IBM",
    "date": "2025",
    "image": "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~1K8X0PZTAJC9/CERTIFICATE_LANDING_PAGE~1K8X0PZTAJC9.jpeg",
    "certificate_url": "https://coursera.org/verify/1K8X0PZTAJC9",
    "skills": [
      "Web Development",
      "Software Architecture",
      "Software Development Life Cycle"
    ],
    "featured": true,
    "category": "Programming",
    "tags": [
      "Software Engineering",
      "IBM",
      "Coursera",
      "SDLC",
      "Architecture"
    ],
    "description": "Introduction to software engineering principles and practices",
    "created_at": "2024-03-01T00:00:00Z",
    "updated_at": "2024-03-01T00:00:00Z"
  },
  {
    "id": "4",
    "title": "Web Design for Beginners",
    "issuer": "Udemy",
    "date": "2024",
    "image": "https://udemy-certificate.s3.amazonaws.com/image/UC-966caa79-6fcc-4a58-8e67-5fc9146f6380.jpg?v=1718111616000",
    "certificate_url": "https://ude.my/UC-966caa79-6fcc-4a58-8e67-5fc9146f6380",
    "skills": [
      "Web Design",
      "HTML",
      "CSS"
    ],
    "featured": false,
    "category": "Design",
    "tags": [
      "Web Design",
      "Udemy",
      "HTML",
      "CSS",
      "UI/UX"
    ],
    "description": "Comprehensive web design course covering design principles and implementation",
    "created_at": "2024-04-01T00:00:00Z",
    "updated_at": "2024-04-01T00:00:00Z"
  },
  {
    "id": "5",
    "title": "HTML & CSS Development",
    "issuer": "Udemy",
    "date": "2024",
    "image": "https://udemy-certificate.s3.amazonaws.com/image/UC-56d5624f-839f-4df8-8a53-e909f86775ad.jpg?v=1717956409000",
    "certificate_url": "https://www.udemy.com/certificate/UC-56d5624f-839f-4df8-8a53-e909f86775ad/",
    "skills": [
      "HTML",
      "CSS",
      "Responsive Design"
    ],
    "featured": false,
    "category": "Web Development",
    "tags": [
      "HTML",
      "CSS",
      "Udemy",
      "Responsive",
      "Frontend"
    ],
    "description": "Complete HTML and CSS development with responsive design techniques",
    "created_at": "2024-05-01T00:00:00Z",
    "updated_at": "2024-05-01T00:00:00Z"
  }
];
