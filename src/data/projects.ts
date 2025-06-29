export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech_stack: string[];
  demo_link: string;
  github_link: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Leon Template',
    description: 'My first project, a simple template for a website, i made it using HTML and CSS, I inspired by ElZero Web School',
    image: 'https://i.postimg.cc/05X9Jn7z/Leon-Template-One-03-31-2025-04-12-PM.png',
    tech_stack: ['HTML', 'CSS'],
    demo_link: 'https://ahmed-icode.github.io/HTML_and_Css_Template_1/',
    github_link: 'https://github.com/Ahmed-iCode/HTML_and_Css_Template_1',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'CRUD Product Management System',
    description: 'A simple product management system that allows you to add, edit, and delete products, inspired by Abdelrahman Gamal',
    image: 'https://i.postimg.cc/DZj3LfJ9/CRUD-System-03-31-2025-04-18-PM.png',
    tech_stack: ['HTML', 'CSS', 'JavaScript'],
    demo_link: 'https://ahmed-icode.github.io/CRUD-Product-Management-System/',
    github_link: 'https://github.com/Ahmed-iCode/CRUD-Product-Management-System',
    featured: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'مواقيت الصلاة',
    description: 'موقع لعرض مواقيت الصلاة باستخدام API Aladhan.',
    image: 'https://i.postimg.cc/Vs0znMg4/03-31-2025-04-31-PM.png',
    tech_stack: ['HTML', 'CSS', 'JavaScript', 'Aladhan API', 'OpenStreetMap API'],
    demo_link: 'https://ahmed-icode.github.io/prayer-times/',
    github_link: 'https://github.com/Ahmed-iCode/prayer-times',
    featured: true,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'XO Game',
    description: 'A simple XO game, i made it using HTML, CSS and JavaScript, inspired by Abdelrahman Gamal',
    image: 'https://i.postimg.cc/FKF9LBCJ/XO-Game-03-31-2025-04-25-PM.png',
    tech_stack: ['HTML', 'CSS', 'JavaScript'],
    demo_link: 'https://ahmed-icode.github.io/XO-Game/',
    github_link: 'https://github.com/Ahmed-iCode/XO-Game',
    featured: false,
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-04-01T00:00:00Z'
  },
  {
    id: '5',
    title: 'Smart Assistant',
    description: 'مساعد ذكي يتحدث العربية ويستخدم Gemini AI للرد على الأسئلة وتنفيذ الأوامر.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech_stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB', 'Gemini AI'],
    demo_link: 'https://ahmed-icode.github.io/smart-assistant/',
    github_link: 'https://github.com/Ahmed-iCode/smart-assistant',
    featured: false,
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2024-05-01T00:00:00Z'
  }
];