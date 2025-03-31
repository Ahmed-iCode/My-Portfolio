export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Leon Template",
    description: "My first project, a simple template for a website, i made it using HTML and CSS, I inspired by ElZero Web School",
    image: "https://i.postimg.cc/05X9Jn7z/Leon-Template-One-03-31-2025-04-12-PM.png",
    techStack: ["HTML", "CSS"],
    demoLink: "https://ahmed-icode.github.io/HTML_and_Css_Template_1/",
    githubLink: "https://github.com/Ahmed-iCode/HTML_and_Css_Template_1",
    featured: true
  },
  {
    id: 2,
    title: "CRUD Product Management System",
    description: "A simple product management system that allows you to add, edit, and delete products, inspired by Abdelrahman Gamal",
    image: "https://i.postimg.cc/DZj3LfJ9/CRUD-System-03-31-2025-04-18-PM.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    demoLink: "https://ahmed-icode.github.io/CRUD-Product-Management-System/",
    githubLink: "https://github.com/Ahmed-iCode/CRUD-Product-Management-System",
    featured: true
  },
  {
    id: 3,
    title: "XO Game",
    description: "A simple XO game, i made it using HTML, CSS and JavaScript, inspired by Abdelrahman Gamal",
    image: "https://i.postimg.cc/FKF9LBCJ/XO-Game-03-31-2025-04-25-PM.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    demoLink: "https://ahmed-icode.github.io/XO-Game/",
    githubLink: "https://github.com/Ahmed-iCode/XO-Game",
    featured: false
  },
  {
    id: 4,
    title: "مواقيت الصلاة",
    description: "موقع لعرض مواقيت الصلاة باستخدام API Aladhan.",
    image: "https://i.postimg.cc/Vs0znMg4/03-31-2025-04-31-PM.png",
    techStack: ["HTML", "CSS", "JavaScript","Aladhan API","OpenStreetMap API"],
    demoLink: "https://ahmed-icode.github.io/prayer-times/",
    githubLink: "https://github.com/Ahmed-iCode/prayer-times",
    featured: true
  },
  {
    id: 5,
    title: "Smart Assistant",
    description: "مساعد ذكي يتحدث العربية ويستخدم Gemini AI للرد على الأسئلة وتنفيذ الأوامر.",
    image: "",
    techStack: ["HTML", "CSS", "JavaScript","Node.js","Express.js","Socket.IO","MongoDB","Gemini AI"],
    demoLink: "https://ahmed-icode.github.io/smart-assistant/",
    githubLink: "https://github.com/Ahmed-iCode/smart-assistant",
    featured: false
  }
]; 