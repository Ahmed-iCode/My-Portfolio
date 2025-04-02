export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  certificateUrl: string;
  skills: string[];
  featured: boolean;
}

export const certificates: Certificate[] = [
  // Programming Basics
  {
    id: 18,
    title: "JAVA 101 Basic",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/fbmV7GBB/certificate-15.png",
    certificateUrl: "https://i.postimg.cc/fbmV7GBB/certificate-15.png",
    skills: ["Conditional Statements", "Java", "Data Types"],
    featured: false
  },
  {
    id: 9,
    title: "Intro To Programming",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/NFWDVqvL/certificate-6.png",
    certificateUrl: "https://i.postimg.cc/NFWDVqvL/certificate-6.png",
    skills: ["Basic Programming", "Java"],
    featured: false
  },
  // Web Development Basics
  {
    id: 19,
    title: "HTML Basics",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/j5TLMM1K/HTML.png",
    certificateUrl: "https://i.postimg.cc/j5TLMM1K/HTML.png",
    skills: ["HTML", "CSS", "Responsive Design"],
    featured: false
  },
  {
    id: 13,
    title: "CSS Basics",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/pL1f1MQv/certificate-10.png",
    certificateUrl: "https://i.postimg.cc/pL1f1MQv/certificate-10.png",
    skills: ["CSS", "HTML"],
    featured: false
  },
  // Database Basics
  {
    id: 14,
    title: "SQL 101 Basic",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/L69j98NR/certificate-11.png",
    certificateUrl: "https://i.postimg.cc/L69j98NR/certificate-11.png",
    skills: ["SQL", "Database", "Data CRUD"],
    featured: false
  },
  // Command Line Basics
  {
    id: 16,
    title: "Command Line 102 Basic",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/J7Bb6FtV/certificate-1.png",
    certificateUrl: "https://i.postimg.cc/J7Bb6FtV/certificate-1.png",
    skills: ["alias", "Commands"],
    featured: false
  },
  // Programming Intermediate
  {
    id: 6,
    title: "JAVA 102 Intermediate",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/65cTYVVx/certificate-3.png",
    certificateUrl: "https://i.postimg.cc/65cTYVVx/certificate-3.png",
    skills: ["Arrays", "Java", "Loops"],
    featured: false
  },
  // Web Development Intermediate
  {
    id: 12,
    title: "javaScript 102 Intermediate",
    issuer: "SATR",
    date: "2025",
    image: "https://i.postimg.cc/pLVC6Bgf/certificate-9.png",
    certificateUrl: "https://i.postimg.cc/pLVC6Bgf/certificate-9.png",
    skills: ["OOP", "Callback", "Arrays Functions"],
    featured: false
  },
  // Database Intermediate
  {
    id: 7,
    title: "SQL 102 Intermediate",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/k5FHb43s/certificate-4.png",
    certificateUrl: "https://i.postimg.cc/k5FHb43s/certificate-4.png",
    skills: ["SQL", "Database", "SQL Functions"],
    featured: false
  },
  // Network Intermediate
  {
    id: 11,
    title: "Network Programming 102 Intermediate",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/q7MF2rJd/certificate-8.png",
    certificateUrl: "https://i.postimg.cc/q7MF2rJd/certificate-8.png",
    skills: ["Network Layers", "OSI Model"],
    featured: false
  },
  // Command Line Intermediate
  {
    id: 15,
    title: "Command Line 103 Intermediate",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/sXPZzkWv/certificate-12.png",
    certificateUrl: "https://i.postimg.cc/sXPZzkWv/certificate-12.png",
    skills: ["Shell", "Commands", "File Descriptors"],
    featured: false
  },
  // Programming Advanced
  {
    id: 3,
    title: "JAVA 103 Advanced",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/MpBbnF2m/certificate.png",
    certificateUrl: "https://i.postimg.cc/MpBbnF2m/certificate.png",
    skills: ["OOP", "Java", "Abstraction"],
    featured: false
  },
  {
    id: 8,
    title: "JAVA 104 Advanced",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/Pq46qRYF/certificate-5.png",
    certificateUrl: "https://i.postimg.cc/Pq46qRYF/certificate-5.png",
    skills: ["OOP", "Java", "Methods"],
    featured: false
  },
  // Web Development Advanced
  {
    id: 4,
    title: "JAVAScript 101 Basic",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/J7Bb6FtV/certificate-1.png",
    certificateUrl: "https://i.postimg.cc/J7Bb6FtV/certificate-1.png",
    skills: ["JavaScript", "Node.js", "Data Types"],
    featured: false
  },
  {
    id: 10,
    title: "JavaScript 103 Advanced",
    issuer: "SATR",
    date: "2025",
    image: "https://i.postimg.cc/XJPkGSJx/certificate-7.png",
    certificateUrl: "https://i.postimg.cc/XJPkGSJx/certificate-7.png",
    skills: ["Destructuring", "Regular Expressions", "Promises"],
    featured: false
  },
  {
    id: 25,
    title: "Introduction to DOM",
    issuer: "SATR",
    date: "2025",
    image: "https://i.postimg.cc/jdyqFHzS/certificate-16.png",
    certificateUrl: "https://i.postimg.cc/jdyqFHzS/certificate-16.png",
    skills: ["DOM", "JavaScript", "DOM Manipulation"],
    featured: false
  },
  // Database Advanced
  {
    id: 17,
    title: "SQL 103 Advanced",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/8PXfTB7B/certificate-14.png",
    certificateUrl: "https://i.postimg.cc/8PXfTB7B/certificate-14.png",
    skills: ["SQL", "JOINS", " FOREIGN KEY"],
    featured: false
  },
  // Network Advanced
  {
    id: 5,
    title: "Network Programming 101",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/g2MXkyrH/certificate-2.png",
    certificateUrl: "https://i.postimg.cc/g2MXkyrH/certificate-2.png",
    skills: ["Network", "TCP/IP", "HTTP"],
    featured: false
  },
  // Web Design
  {
    id: 1,
    title: "Web Design for Beginners",
    issuer: "Udemy",
    date: "2024",
    image: "https://udemy-certificate.s3.amazonaws.com/image/UC-966caa79-6fcc-4a58-8e67-5fc9146f6380.jpg?v=1718111616000",
    certificateUrl: "https://ude.my/UC-966caa79-6fcc-4a58-8e67-5fc9146f6380",
    skills: ["Web Design", "HTML", "CSS"],
    featured: true
  },
  {
    id: 2,
    title: "HTML & CSS Development",
    issuer: "Udemy",
    date: "2024",
    image: "https://udemy-certificate.s3.amazonaws.com/image/UC-56d5624f-839f-4df8-8a53-e909f86775ad.jpg?v=1717956409000",
    certificateUrl: "https://www.udemy.com/certificate/UC-56d5624f-839f-4df8-8a53-e909f86775ad/",
    skills: ["HTML", "CSS", "Responsive Design"],
    featured: false
  },
  {
    id: 26,
    title: "Bootstrap Intermediate",
    issuer: "SATR",
    date: "2025",
    image: "https://i.postimg.cc/MpxZ2nDb/certificate-17.png",
    certificateUrl: "https://i.postimg.cc/MpxZ2nDb/certificate-17.png",
    skills: ["Bootstrap 5"],
    featured: false
  },
  // Digital Skills
  {
    id: 23,
    title: "Internet & Email Essentials",
    issuer: "Edraak",
    date: "2023",
    image: "https://i.postimg.cc/TPRzQmcF/2.png",
    certificateUrl: "https://programs.edraak.org/learn/course/icdl2-v2019sp/issue_certificate/?lang=en",
    skills: ["Internet", "Email", "Email Essentials"],
    featured: false
  },
  {
    id: 24,
    title: "ICDL Base",
    issuer: "Edraak",
    date: "2023",
    image: "https://i.postimg.cc/TPRzQmcF/2.png",
    certificateUrl: "https://programs.edraak.org/learn/specialization/icdlsp-vv2/issue_certificate/?lang=en",
    skills: ["ICDL Base", "ICDL Skills"],
    featured: false
  },
  // Marketing
  {
    id: 20,
    title: "Introduction to Social Media Marketing",
    issuer: "Coursera",
    date: "2023",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~VAD2F5DAL23B/CERTIFICATE_LANDING_PAGE~VAD2F5DAL23B.jpeg",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/VAD2F5DAL23B",
    skills: ["Social Media Marketing", "Social Media Marketing Strategy", "Digital Marketing"],
    featured: true
  },
  {
    id: 21,
    title: "Social Media Management",
    issuer: "Coursera",
    date: "2023",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~A4PM7CDSFMEG/CERTIFICATE_LANDING_PAGE~A4PM7CDSFMEG.jpeg",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/A4PM7CDSFMEG",
    skills: ["Content Marketing", "Social Media Marketing", "content management"],
    featured: false
  },
  // Soft Skills
  {
    id: 22,
    title: "The Art of Effective Communication Skills",
    issuer: "Edraak",
    date: "2023",
    image: "https://i.postimg.cc/yNjHznd7/image.png",
    certificateUrl: "https://programs.edraak.org/learn/course/pec-v1/issue_certificate/?lang=en",
    skills: ["Communication", "Communication Skills", "Effective Communication"],
    featured: true
  },
  {
    id: 27,
    title: "McKinsey.org Forward Program",
    issuer: "McKinsey",
    date: "2024",
    image: "https://i.postimg.cc/x1fCv8cC/Mc-Kinsey-org-Forward20250331-27-3gy9s0.png",
    certificateUrl: "https://www.credly.com/badges/db88e8bd-a0c1-4d4b-a0fb-48ec7f0e5b11",
    skills: ["Adaptability & Resilience", "Problem Solving", "Communicating for Impact","Relationships & Well-being","Leadership"],
    featured: true
  },
  {
    id: 28,
    title: "Web Development Fundamentals",
    issuer: "IBM",
    date: "2024",
    image: "https://i.postimg.cc/HkrG11Nz/IBMDesign20250331-28-idx26v.png",
    certificateUrl: "https://www.credly.com/badges/1bd25263-6d47-47cc-93d2-8e77786d4cfa",
    skills: ["Web Development", "HTML", "CSS", "DevOps"],
    featured: true
  },
  {
    id: 29,
    title: "Frontend Engineering with React",
    issuer: "Manara",
    date: "2024",
    image: "https://i.postimg.cc/HLT0VcPN/Frontend-Engineering-with-React-Manara.png",
    certificateUrl: "https://app.manara.tech/verify-certificate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0aWZpY2F0ZUlkIjozNDA2MywiaWF0IjoxNzQzNTI5NjY2fQ.yYxorgRxVc73AJ0oEzdq1r8pqImyw7gTn7rCTBq37RU",
    skills: ["React", "Frontend", "Web Development"],
    featured: true
  }
]; 