export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  certificateUrl: string;
  skills: string[];
  featured: boolean;
  category: string;
  tags: string[];
  description?: string;
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
    featured: false,
    category: "Programming",
    tags: ["Java", "SATR", "Basic", "Programming"],
    description: "Fundamental Java programming concepts including data types and conditional statements"
  },
  {
    id: 9,
    title: "Intro To Programming",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/NFWDVqvL/certificate-6.png",
    certificateUrl: "https://i.postimg.cc/NFWDVqvL/certificate-6.png",
    skills: ["Basic Programming", "Java"],
    featured: false,
    category: "Programming",
    tags: ["Java", "SATR", "Introduction", "Programming"],
    description: "Introduction to programming fundamentals using Java"
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
    featured: false,
    category: "Web Development",
    tags: ["HTML", "CSS", "SATR", "Web", "Frontend"],
    description: "HTML fundamentals and basic CSS styling techniques"
  },
  {
    id: 13,
    title: "CSS Basics",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/pL1f1MQv/certificate-10.png",
    certificateUrl: "https://i.postimg.cc/pL1f1MQv/certificate-10.png",
    skills: ["CSS", "HTML"],
    featured: false,
    category: "Web Development",
    tags: ["CSS", "HTML", "SATR", "Styling", "Frontend"],
    description: "CSS fundamentals for styling web pages"
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
    featured: false,
    category: "Database",
    tags: ["SQL", "Database", "SATR", "CRUD", "Data"],
    description: "Basic SQL operations and database management"
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
    featured: false,
    category: "Tools",
    tags: ["Command Line", "Terminal", "SATR", "CLI", "Tools"],
    description: "Command line interface basics and terminal commands"
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
    featured: false,
    category: "Programming",
    tags: ["Java", "SATR", "Intermediate", "Arrays", "Loops"],
    description: "Intermediate Java concepts including arrays and control structures"
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
    featured: false,
    category: "Web Development",
    tags: ["JavaScript", "SATR", "OOP", "Callbacks", "Arrays"],
    description: "Intermediate JavaScript concepts including OOP and callback functions"
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
    featured: false,
    category: "Database",
    tags: ["SQL", "Database", "SATR", "Functions", "Intermediate"],
    description: "Intermediate SQL concepts and database functions"
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
    featured: false,
    category: "Networking",
    tags: ["Networking", "OSI", "SATR", "Network Layers", "Protocols"],
    description: "Network programming fundamentals and OSI model"
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
    featured: false,
    category: "Tools",
    tags: ["Command Line", "Shell", "SATR", "File Descriptors", "Advanced"],
    description: "Advanced command line operations and shell scripting"
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
    featured: false,
    category: "Programming",
    tags: ["Java", "SATR", "Advanced", "OOP", "Abstraction"],
    description: "Advanced Java programming with object-oriented concepts"
  },
  {
    id: 8,
    title: "JAVA 104 Advanced",
    issuer: "SATR",
    date: "2024",
    image: "https://i.postimg.cc/Pq46qRYF/certificate-5.png",
    certificateUrl: "https://i.postimg.cc/Pq46qRYF/certificate-5.png",
    skills: ["OOP", "Java", "Methods"],
    featured: false,
    category: "Programming",
    tags: ["Java", "SATR", "Advanced", "OOP", "Methods"],
    description: "Advanced Java methods and object-oriented programming"
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
    featured: false,
    category: "Web Development",
    tags: ["JavaScript", "Node.js", "SATR", "Basic", "Data Types"],
    description: "JavaScript fundamentals and Node.js basics"
  },
  {
    id: 10,
    title: "JavaScript 103 Advanced",
    issuer: "SATR",
    date: "2025",
    image: "https://i.postimg.cc/XJPkGSJx/certificate-7.png",
    certificateUrl: "https://i.postimg.cc/XJPkGSJx/certificate-7.png",
    skills: ["Destructuring", "Regular Expressions", "Promises"],
    featured: false,
    category: "Web Development",
    tags: ["JavaScript", "SATR", "Advanced", "Promises", "Regex"],
    description: "Advanced JavaScript features including promises and destructuring"
  },
  {
    id: 25,
    title: "Introduction to DOM",
    issuer: "SATR",
    date: "2025",
    image: "https://i.postimg.cc/jdyqFHzS/certificate-16.png",
    certificateUrl: "https://i.postimg.cc/jdyqFHzS/certificate-16.png",
    skills: ["DOM", "JavaScript", "DOM Manipulation"],
    featured: false,
    category: "Web Development",
    tags: ["DOM", "JavaScript", "SATR", "Web", "Manipulation"],
    description: "DOM manipulation and JavaScript web interactions"
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
    featured: false,
    category: "Database",
    tags: ["SQL", "JOINS", "SATR", "Foreign Key", "Advanced"],
    description: "Advanced SQL operations including joins and foreign keys"
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
    featured: false,
    category: "Networking",
    tags: ["Network", "TCP/IP", "HTTP", "SATR", "Protocols"],
    description: "Network programming fundamentals and protocol understanding"
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
    featured: false,
    category: "Design",
    tags: ["Web Design", "Udemy", "HTML", "CSS", "UI/UX"],
    description: "Comprehensive web design course covering design principles and implementation"
  },
  {
    id: 2,
    title: "HTML & CSS Development",
    issuer: "Udemy",
    date: "2024",
    image: "https://udemy-certificate.s3.amazonaws.com/image/UC-56d5624f-839f-4df8-8a53-e909f86775ad.jpg?v=1717956409000",
    certificateUrl: "https://www.udemy.com/certificate/UC-56d5624f-839f-4df8-8a53-e909f86775ad/",
    skills: ["HTML", "CSS", "Responsive Design"],
    featured: false,
    category: "Web Development",
    tags: ["HTML", "CSS", "Udemy", "Responsive", "Frontend"],
    description: "Complete HTML and CSS development with responsive design techniques"
  },
  {
    id: 26,
    title: "Bootstrap Intermediate",
    issuer: "SATR",
    date: "2025",
    image: "https://i.postimg.cc/MpxZ2nDb/certificate-17.png",
    certificateUrl: "https://i.postimg.cc/MpxZ2nDb/certificate-17.png",
    skills: ["Bootstrap 5"],
    featured: false,
    category: "Web Development",
    tags: ["Bootstrap", "CSS", "SATR", "Framework", "Responsive"],
    description: "Bootstrap 5 framework for responsive web development"
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
    featured: false,
    category: "Digital Skills",
    tags: ["Internet", "Email", "Edraak", "ICDL", "Digital Literacy"],
    description: "Essential internet and email skills for digital literacy"
  },
  {
    id: 24,
    title: "ICDL Base",
    issuer: "Edraak",
    date: "2023",
    image: "https://i.postimg.cc/TPRzQmcF/2.png",
    certificateUrl: "https://programs.edraak.org/learn/specialization/icdlsp-vv2/issue_certificate/?lang=en",
    skills: ["ICDL Base", "ICDL Skills"],
    featured: false,
    category: "Digital Skills",
    tags: ["ICDL", "Digital Skills", "Edraak", "Computer Literacy", "Certification"],
    description: "International Computer Driving License base certification"
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
    featured: false,
    category: "Marketing",
    tags: ["Social Media", "Marketing", "Coursera", "Digital Marketing", "Strategy"],
    description: "Comprehensive introduction to social media marketing strategies"
  },
  {
    id: 21,
    title: "Social Media Management",
    issuer: "Coursera",
    date: "2023",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~A4PM7CDSFMEG/CERTIFICATE_LANDING_PAGE~A4PM7CDSFMEG.jpeg",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/A4PM7CDSFMEG",
    skills: ["Content Marketing", "Social Media Marketing", "content management"],
    featured: false,
    category: "Marketing",
    tags: ["Social Media", "Content Marketing", "Coursera", "Management", "Strategy"],
    description: "Social media management and content marketing strategies"
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
    featured: false,
    category: "Soft Skills",
    tags: ["Communication", "Soft Skills", "Edraak", "Professional Development", "Leadership"],
    description: "Effective communication skills for professional and personal development"
  },
  {
    id: 27,
    title: "McKinsey.org Forward Program",
    issuer: "McKinsey",
    date: "2024",
    image: "https://i.postimg.cc/x1fCv8cC/Mc-Kinsey-org-Forward20250331-27-3gy9s0.png",
    certificateUrl: "https://www.credly.com/badges/db88e8bd-a0c1-4d4b-a0fb-48ec7f0e5b11",
    skills: ["Adaptability & Resilience", "Problem Solving", "Communicating for Impact","Relationships & Well-being","Leadership"],
    featured: true,
    category: "Soft Skills",
    tags: ["McKinsey", "Leadership", "Problem Solving", "Communication", "Professional Development"],
    description: "Comprehensive leadership and professional development program by McKinsey"
  },
  {
    id: 28,
    title: "Web Development Fundamentals",
    issuer: "IBM",
    date: "2024",
    image: "https://i.postimg.cc/HkrG11Nz/IBMDesign20250331-28-idx26v.png",
    certificateUrl: "https://www.credly.com/badges/1bd25263-6d47-47cc-93d2-8e77786d4cfa",
    skills: ["Web Development", "HTML", "CSS", "DevOps"],
    featured: false,
    category: "Web Development",
    tags: ["IBM", "Web Development", "HTML", "CSS", "DevOps"],
    description: "Fundamental web development concepts and practices by IBM"
  },
  {
    id: 29,
    title: "Frontend Engineering with React",
    issuer: "Manara",
    date: "2024",
    image: "https://i.postimg.cc/HLT0VcPN/Frontend-Engineering-with-React-Manara.png",
    certificateUrl: "https://app.manara.tech/verify-certificate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0aWZpY2F0ZUlkIjozNDA2MywiaWF0IjoxNzQzNTI5NjY2fQ.yYxorgRxVc73AJ0oEzdq1r8pqImyw7gTn7rCTBq37RU",
    skills: ["React", "Frontend", "Web Development"],
    featured: true,
    category: "Web Development",
    tags: ["React", "Frontend", "Manara", "JavaScript", "Component-based"],
    description: "Comprehensive React frontend engineering course"
  },
  {
    id: 30,
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    date: "2025",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~1K8X0PZTAJC9/CERTIFICATE_LANDING_PAGE~1K8X0PZTAJC9.jpeg",
    certificateUrl: "https://coursera.org/verify/1K8X0PZTAJC9",
    skills: ["Web Development", "Software Architecture", "Software Development Life Cycle"],
    featured: true,
    category: "Programming",
    tags: ["Software Engineering", "IBM", "Coursera", "SDLC", "Architecture"],
    description: "Introduction to software engineering principles and practices"
  }
];

export const categories = [
  "All",
  "Programming",
  "Web Development", 
  "Database",
  "Networking",
  "Tools",
  "Design",
  "Digital Skills",
  "Marketing",
  "Soft Skills"
];