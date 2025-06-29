export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  category: string;
  featured: boolean;
  readingTime: number; // in minutes
  image?: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export const articles: Article[] = [
  {
    id: "1",
    title: "How I Built My Certificate Management System",
    slug: "how-i-built-my-certificates-page",
    excerpt: "A deep dive into creating a responsive, filterable certificate showcase using React, TypeScript, and modern UI components.",
    content: `
# How I Built My Certificate Management System

Building a portfolio is more than just showcasing projects—it's about telling the story of your learning journey. When I decided to create a dedicated certificates page for my portfolio, I wanted something that would be both visually appealing and functionally robust.

## The Challenge

I had accumulated over 30 certificates from various platforms like SATR, Udemy, Coursera, and others. The challenge was to create a system that could:

- Display certificates in an organized, searchable manner
- Filter by categories and skills
- Provide detailed views with modal interactions
- Maintain excellent performance and UX

## Technical Implementation

### Data Structure

First, I designed a comprehensive data structure to capture all certificate information:

\`\`\`typescript
interface Certificate {
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
\`\`\`

### Component Architecture

I built the system using several key components:

1. **Main Certificates Page**: Handles filtering, search, and grid layout
2. **Certificate Modal**: Provides detailed certificate views
3. **Filter System**: Dynamic category and search filtering
4. **Responsive Grid**: Adapts to different screen sizes

### Key Features

#### Advanced Filtering
The filtering system uses React's \`useMemo\` hook for optimal performance:

\`\`\`typescript
const filteredCertificates = useMemo(() => {
  return certificates.filter(cert => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
}, [selectedCategory, searchTerm]);
\`\`\`

#### Smooth Animations
Using Framer Motion for delightful micro-interactions:

\`\`\`typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.05 }}
  viewport={{ once: true }}
>
\`\`\`

## Lessons Learned

1. **Performance Matters**: Using \`useMemo\` for filtering prevented unnecessary re-renders
2. **UX is King**: Small details like hover states and loading animations make a huge difference
3. **Accessibility**: Proper ARIA labels and keyboard navigation are essential
4. **Mobile-First**: Designing for mobile first ensured a great experience across all devices

## What's Next?

I'm planning to add:
- Certificate verification links
- Achievement statistics
- Learning path visualization
- Integration with learning platforms APIs

Building this system taught me valuable lessons about data organization, component architecture, and user experience design. It's become one of my favorite portfolio features!

## Tech Stack

- **React** with TypeScript for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** for accessible components
- **Lucide React** for icons

The complete source code is available on my [GitHub](https://github.com/Ahmed-iCode).
    `,
    publishedAt: "2024-12-15",
    author: {
      name: "Ahmed Samir",
      avatar: "/avatar.jpg"
    },
    tags: ["React", "TypeScript", "Portfolio", "UI/UX"],
    category: "Web Development",
    featured: true,
    readingTime: 8,
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    seo: {
      metaTitle: "How I Built My Certificate Management System - Ahmed Samir",
      metaDescription: "Learn how I created a responsive certificate showcase using React, TypeScript, and modern UI components.",
      keywords: ["React", "TypeScript", "Portfolio", "Certificates", "Web Development"]
    }
  },
  {
    id: "2",
    title: "My Journey Learning React: From Beginner to Building Real Projects",
    slug: "my-react-learning-journey",
    excerpt: "Sharing my experience learning React, the challenges I faced, and the projects that helped me grow as a developer.",
    content: `
# My Journey Learning React: From Beginner to Building Real Projects

When I first started learning web development, React seemed like this mysterious, complex library that only experienced developers could master. Today, I want to share my journey from complete React beginner to building real-world applications.

## The Beginning

My React journey started after I had a solid foundation in HTML, CSS, and vanilla JavaScript. I remember being overwhelmed by concepts like:

- Components and JSX
- State management
- Props and data flow
- The virtual DOM

## Breaking Down the Learning Process

### Phase 1: Understanding the Basics (Weeks 1-2)

I started with the official React documentation and built simple components:

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

**Key Learning**: Components are just JavaScript functions that return JSX.

### Phase 2: State and Events (Weeks 3-4)

Learning about \`useState\` was a game-changer:

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### Phase 3: Real Projects (Weeks 5-8)

This is where everything clicked. I built:

1. **Todo App**: Classic beginner project that taught me about lists and state updates
2. **Weather App**: Introduced me to API calls and useEffect
3. **Portfolio Website**: Combined everything I learned

## Challenges I Faced

### 1. Understanding State Updates
Initially, I struggled with why state updates are asynchronous:

\`\`\`jsx
// This doesn't work as expected
setCount(count + 1);
setCount(count + 1); // Still adds only 1, not 2!

// Correct way
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Now adds 2
\`\`\`

### 2. Props vs State Confusion
It took time to understand when to use props vs state and how data flows in React.

### 3. useEffect Dependencies
Learning when and how to use the dependency array properly:

\`\`\`jsx
// Infinite loop - missing dependency
useEffect(() => {
  setData(processData(input));
}, []); // input should be in dependencies

// Correct
useEffect(() => {
  setData(processData(input));
}, [input]);
\`\`\`

## Projects That Accelerated My Learning

### 1. CRUD Product Management System
This project taught me:
- Form handling
- Local storage
- Array manipulation
- Component composition

### 2. Prayer Times App
Building this Arabic prayer times app introduced:
- API integration
- Geolocation
- Date/time handling
- Responsive design

### 3. Portfolio Website
My current portfolio combines:
- React Router for navigation
- Framer Motion for animations
- TypeScript for type safety
- Modern UI libraries

## Tips for Fellow React Learners

### 1. Start Small
Don't jump into complex projects immediately. Master the basics first.

### 2. Build Projects
Reading tutorials is good, but building projects is where real learning happens.

### 3. Understand JavaScript First
React is JavaScript. Strong JS fundamentals make React much easier.

### 4. Use Developer Tools
React DevTools are invaluable for debugging and understanding component behavior.

### 5. Read the Documentation
The React docs are excellent. Don't skip them for random tutorials.

## Current Focus Areas

Now I'm diving deeper into:
- **Next.js** for full-stack applications
- **React Query** for server state management
- **Testing** with Jest and React Testing Library
- **Performance optimization** techniques

## Advice for Beginners

1. **Be patient**: React has a learning curve, but it's worth it
2. **Practice consistently**: Code every day, even if it's just 30 minutes
3. **Join communities**: React communities are incredibly helpful
4. **Build real projects**: Theory is good, but practice is better
5. **Don't compare**: Everyone learns at their own pace

## What's Next?

I'm excited to continue learning and building more complex applications. My next goals include:
- Contributing to open source React projects
- Learning React Native for mobile development
- Exploring advanced patterns like render props and compound components

React has opened up so many possibilities for me as a developer. If you're just starting your React journey, stick with it—the "aha!" moments are incredibly rewarding.

Happy coding! 🚀
    `,
    publishedAt: "2024-12-10",
    author: {
      name: "Ahmed Samir",
      avatar: "/avatar.jpg"
    },
    tags: ["React", "Learning", "JavaScript", "Beginner"],
    category: "Learning Journey",
    featured: true,
    readingTime: 6,
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    seo: {
      metaTitle: "My React Learning Journey - From Beginner to Real Projects",
      metaDescription: "Follow my journey learning React from scratch, including challenges faced and projects that accelerated my growth.",
      keywords: ["React", "Learning", "JavaScript", "Web Development", "Beginner Guide"]
    }
  },
  {
    id: "3",
    title: "Building Responsive Layouts with CSS Grid and Flexbox",
    slug: "responsive-layouts-css-grid-flexbox",
    excerpt: "A practical guide to creating modern, responsive layouts using CSS Grid and Flexbox, with real-world examples.",
    content: `
# Building Responsive Layouts with CSS Grid and Flexbox

Creating responsive layouts is one of the most important skills for modern web developers. In this article, I'll share practical techniques for building flexible, responsive designs using CSS Grid and Flexbox.

## Understanding the Tools

### CSS Grid: The 2D Layout System
CSS Grid excels at creating complex, two-dimensional layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### Flexbox: The 1D Layout System
Flexbox is perfect for one-dimensional layouts and component alignment:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## Real-World Examples

### 1. Card Grid Layout
Perfect for portfolios, blogs, or product listings:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
\`\`\`

### 2. Navigation Bar
Using Flexbox for responsive navigation:

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
  }
}
\`\`\`

### 3. Holy Grail Layout
The classic three-column layout with header and footer:

\`\`\`css
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 200px 1fr 200px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}
\`\`\`

## Best Practices

### 1. Mobile-First Approach
Start with mobile styles and enhance for larger screens:

\`\`\`css
/* Mobile first */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

### 2. Use Logical Properties
Modern CSS logical properties for better internationalization:

\`\`\`css
.element {
  margin-inline: auto; /* Instead of margin-left/right */
  padding-block: 2rem; /* Instead of padding-top/bottom */
}
\`\`\`

### 3. Container Queries (Future-Proof)
When supported, container queries will revolutionize responsive design:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}
\`\`\`

## Common Patterns

### 1. Sidebar Layout
\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
\`\`\`

### 2. Center Content
\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

### 3. Sticky Footer
\`\`\`css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}
\`\`\`

## Tools and Resources

### 1. CSS Grid Generator
Use online tools to visualize and generate grid layouts.

### 2. Flexbox Froggy
Interactive game to learn Flexbox properties.

### 3. Browser DevTools
Use Firefox Grid Inspector and Chrome's Flexbox tools.

## Conclusion

Mastering CSS Grid and Flexbox opens up endless possibilities for creating beautiful, responsive layouts. Remember:

- Use Grid for 2D layouts
- Use Flexbox for 1D layouts and alignment
- Start mobile-first
- Test across different devices
- Keep accessibility in mind

The combination of these tools gives you the power to create any layout you can imagine, while maintaining clean, maintainable code.

Happy styling! 🎨
    `,
    publishedAt: "2024-12-05",
    author: {
      name: "Ahmed Samir",
      avatar: "/avatar.jpg"
    },
    tags: ["CSS", "Grid", "Flexbox", "Responsive Design"],
    category: "CSS & Design",
    featured: false,
    readingTime: 7,
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    seo: {
      metaTitle: "CSS Grid and Flexbox for Responsive Layouts - Complete Guide",
      metaDescription: "Learn to build modern responsive layouts with CSS Grid and Flexbox. Includes practical examples and best practices.",
      keywords: ["CSS Grid", "Flexbox", "Responsive Design", "CSS Layout", "Web Development"]
    }
  }
];

export const categories = [
  "All",
  "Web Development",
  "Learning Journey", 
  "CSS & Design",
  "JavaScript",
  "React",
  "Tools & Tips"
];

// Helper function to calculate reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};