/*
  # Seed Portfolio Data

  This migration populates the tables with existing portfolio data
*/

-- Insert certificates data
INSERT INTO certificates (title, issuer, date, image, certificate_url, skills, featured, category, tags, description) VALUES
('McKinsey.org Forward Program', 'McKinsey', '2024', 'https://i.postimg.cc/x1fCv8cC/Mc-Kinsey-org-Forward20250331-27-3gy9s0.png', 'https://www.credly.com/badges/db88e8bd-a0c1-4d4b-a0fb-48ec7f0e5b11', ARRAY['Adaptability & Resilience', 'Problem Solving', 'Communicating for Impact', 'Relationships & Well-being', 'Leadership'], true, 'Soft Skills', ARRAY['McKinsey', 'Leadership', 'Problem Solving', 'Communication', 'Professional Development'], 'Comprehensive leadership and professional development program by McKinsey'),

('Frontend Engineering with React', 'Manara', '2024', 'https://i.postimg.cc/HLT0VcPN/Frontend-Engineering-with-React-Manara.png', 'https://app.manara.tech/verify-certificate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0aWZpY2F0ZUlkIjozNDA2MywiaWF0IjoxNzQzNTI5NjY2fQ.yYxorgRxVc73AJ0oEzdq1r8pqImyw7gTn7rCTBq37RU', ARRAY['React', 'Frontend', 'Web Development'], true, 'Web Development', ARRAY['React', 'Frontend', 'Manara', 'JavaScript', 'Component-based'], 'Comprehensive React frontend engineering course'),

('Introduction to Software Engineering', 'IBM', '2025', 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~1K8X0PZTAJC9/CERTIFICATE_LANDING_PAGE~1K8X0PZTAJC9.jpeg', 'https://coursera.org/verify/1K8X0PZTAJC9', ARRAY['Web Development', 'Software Architecture', 'Software Development Life Cycle'], true, 'Programming', ARRAY['Software Engineering', 'IBM', 'Coursera', 'SDLC', 'Architecture'], 'Introduction to software engineering principles and practices'),

('Web Design for Beginners', 'Udemy', '2024', 'https://udemy-certificate.s3.amazonaws.com/image/UC-966caa79-6fcc-4a58-8e67-5fc9146f6380.jpg?v=1718111616000', 'https://ude.my/UC-966caa79-6fcc-4a58-8e67-5fc9146f6380', ARRAY['Web Design', 'HTML', 'CSS'], false, 'Design', ARRAY['Web Design', 'Udemy', 'HTML', 'CSS', 'UI/UX'], 'Comprehensive web design course covering design principles and implementation'),

('HTML & CSS Development', 'Udemy', '2024', 'https://udemy-certificate.s3.amazonaws.com/image/UC-56d5624f-839f-4df8-8a53-e909f86775ad.jpg?v=1717956409000', 'https://www.udemy.com/certificate/UC-56d5624f-839f-4df8-8a53-e909f86775ad/', ARRAY['HTML', 'CSS', 'Responsive Design'], false, 'Web Development', ARRAY['HTML', 'CSS', 'Udemy', 'Responsive', 'Frontend'], 'Complete HTML and CSS development with responsive design techniques');

-- Insert projects data
INSERT INTO projects (title, description, image, tech_stack, demo_link, github_link, featured) VALUES
('Leon Template', 'My first project, a simple template for a website, i made it using HTML and CSS, I inspired by ElZero Web School', 'https://i.postimg.cc/05X9Jn7z/Leon-Template-One-03-31-2025-04-12-PM.png', ARRAY['HTML', 'CSS'], 'https://ahmed-icode.github.io/HTML_and_Css_Template_1/', 'https://github.com/Ahmed-iCode/HTML_and_Css_Template_1', true),

('CRUD Product Management System', 'A simple product management system that allows you to add, edit, and delete products, inspired by Abdelrahman Gamal', 'https://i.postimg.cc/DZj3LfJ9/CRUD-System-03-31-2025-04-18-PM.png', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://ahmed-icode.github.io/CRUD-Product-Management-System/', 'https://github.com/Ahmed-iCode/CRUD-Product-Management-System', true),

('مواقيت الصلاة', 'موقع لعرض مواقيت الصلاة باستخدام API Aladhan.', 'https://i.postimg.cc/Vs0znMg4/03-31-2025-04-31-PM.png', ARRAY['HTML', 'CSS', 'JavaScript', 'Aladhan API', 'OpenStreetMap API'], 'https://ahmed-icode.github.io/prayer-times/', 'https://github.com/Ahmed-iCode/prayer-times', true),

('XO Game', 'A simple XO game, i made it using HTML, CSS and JavaScript, inspired by Abdelrahman Gamal', 'https://i.postimg.cc/FKF9LBCJ/XO-Game-03-31-2025-04-25-PM.png', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://ahmed-icode.github.io/XO-Game/', 'https://github.com/Ahmed-iCode/XO-Game', false),

('Smart Assistant', 'مساعد ذكي يتحدث العربية ويستخدم Gemini AI للرد على الأسئلة وتنفيذ الأوامر.', '', ARRAY['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB', 'Gemini AI'], 'https://ahmed-icode.github.io/smart-assistant/', 'https://github.com/Ahmed-iCode/smart-assistant', false);

-- Insert articles data
INSERT INTO articles (title, slug, excerpt, content, published_at, author_name, tags, category, featured, reading_time, image, meta_title, meta_description, keywords) VALUES
('How I Built My Certificate Management System', 'how-i-built-my-certificates-page', 'A deep dive into creating a responsive, filterable certificate showcase using React, TypeScript, and modern UI components.', '# How I Built My Certificate Management System

Building a portfolio is more than just showcasing projects—it''s about telling the story of your learning journey. When I decided to create a dedicated certificates page for my portfolio, I wanted something that would be both visually appealing and functionally robust.

## The Challenge

I had accumulated over 30 certificates from various platforms like SATR, Udemy, Coursera, and others. The challenge was to create a system that could:

- Display certificates in an organized, searchable manner
- Filter by categories and skills
- Provide detailed views with modal interactions
- Maintain excellent performance and UX

## Technical Implementation

### Data Structure

First, I designed a comprehensive data structure to capture all certificate information:

```typescript
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
```

### Component Architecture

I built the system using several key components:

1. **Main Certificates Page**: Handles filtering, search, and grid layout
2. **Certificate Modal**: Provides detailed certificate views
3. **Filter System**: Dynamic category and search filtering
4. **Responsive Grid**: Adapts to different screen sizes

### Key Features

#### Advanced Filtering
The filtering system uses React''s `useMemo` hook for optimal performance:

```typescript
const filteredCertificates = useMemo(() => {
  return certificates.filter(cert => {
    const matchesCategory = selectedCategory === ''All'' || cert.category === selectedCategory;
    const matchesSearch = searchTerm === '''' || 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
}, [selectedCategory, searchTerm]);
```

#### Smooth Animations
Using Framer Motion for delightful micro-interactions:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.05 }}
  viewport={{ once: true }}
>
```

## Lessons Learned

1. **Performance Matters**: Using `useMemo` for filtering prevented unnecessary re-renders
2. **UX is King**: Small details like hover states and loading animations make a huge difference
3. **Accessibility**: Proper ARIA labels and keyboard navigation are essential
4. **Mobile-First**: Designing for mobile first ensured a great experience across all devices

## What''s Next?

I''m planning to add:
- Certificate verification links
- Achievement statistics
- Learning path visualization
- Integration with learning platforms APIs

Building this system taught me valuable lessons about data organization, component architecture, and user experience design. It''s become one of my favorite portfolio features!

## Tech Stack

- **React** with TypeScript for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** for accessible components
- **Lucide React** for icons

The complete source code is available on my [GitHub](https://github.com/Ahmed-iCode).', '2024-12-15', 'Ahmed Samir', ARRAY['React', 'TypeScript', 'Portfolio', 'UI/UX'], 'Web Development', true, 8, 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'How I Built My Certificate Management System - Ahmed Samir', 'Learn how I created a responsive certificate showcase using React, TypeScript, and modern UI components.', ARRAY['React', 'TypeScript', 'Portfolio', 'Certificates', 'Web Development']),

('My Journey Learning React: From Beginner to Building Real Projects', 'my-react-learning-journey', 'Sharing my experience learning React, the challenges I faced, and the projects that helped me grow as a developer.', '# My Journey Learning React: From Beginner to Building Real Projects

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

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

**Key Learning**: Components are just JavaScript functions that return JSX.

### Phase 2: State and Events (Weeks 3-4)

Learning about `useState` was a game-changer:

```jsx
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
```

### Phase 3: Real Projects (Weeks 5-8)

This is where everything clicked. I built:

1. **Todo App**: Classic beginner project that taught me about lists and state updates
2. **Weather App**: Introduced me to API calls and useEffect
3. **Portfolio Website**: Combined everything I learned

## Challenges I Faced

### 1. Understanding State Updates
Initially, I struggled with why state updates are asynchronous:

```jsx
// This doesn''t work as expected
setCount(count + 1);
setCount(count + 1); // Still adds only 1, not 2!

// Correct way
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Now adds 2
```

### 2. Props vs State Confusion
It took time to understand when to use props vs state and how data flows in React.

### 3. useEffect Dependencies
Learning when and how to use the dependency array properly:

```jsx
// Infinite loop - missing dependency
useEffect(() => {
  setData(processData(input));
}, []); // input should be in dependencies

// Correct
useEffect(() => {
  setData(processData(input));
}, [input]);
```

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
Don''t jump into complex projects immediately. Master the basics first.

### 2. Build Projects
Reading tutorials is good, but building projects is where real learning happens.

### 3. Understand JavaScript First
React is JavaScript. Strong JS fundamentals make React much easier.

### 4. Use Developer Tools
React DevTools are invaluable for debugging and understanding component behavior.

### 5. Read the Documentation
The React docs are excellent. Don''t skip them for random tutorials.

## Current Focus Areas

Now I''m diving deeper into:
- **Next.js** for full-stack applications
- **React Query** for server state management
- **Testing** with Jest and React Testing Library
- **Performance optimization** techniques

## Advice for Beginners

1. **Be patient**: React has a learning curve, but it''s worth it
2. **Practice consistently**: Code every day, even if it''s just 30 minutes
3. **Join communities**: React communities are incredibly helpful
4. **Build real projects**: Theory is good, but practice is better
5. **Don''t compare**: Everyone learns at their own pace

## What''s Next?

I''m excited to continue learning and building more complex applications. My next goals include:
- Contributing to open source React projects
- Learning React Native for mobile development
- Exploring advanced patterns like render props and compound components

React has opened up so many possibilities for me as a developer. If you''re just starting your React journey, stick with it—the "aha!" moments are incredibly rewarding.

Happy coding! 🚀', '2024-12-10', 'Ahmed Samir', ARRAY['React', 'Learning', 'JavaScript', 'Beginner'], 'Learning Journey', true, 6, 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'My React Learning Journey - From Beginner to Real Projects', 'Follow my journey learning React from scratch, including challenges faced and projects that accelerated my growth.', ARRAY['React', 'Learning', 'JavaScript', 'Web Development', 'Beginner Guide']);