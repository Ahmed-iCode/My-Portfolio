
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5 & CSS3', level: 80 },
      { name: 'JavaScript (ES6+)', level: 70 },
      { name: 'React.js', level: 70 },
      { name: 'TypeScript', level: 50 },
      { name: 'Next.js', level: 20 },
      { name: 'Vue.js', level: 40 },
      { name: 'Tailwind CSS', level: 30 },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 20 },
      { name: 'RESTful APIs', level: 50 },
      { name: 'GraphQL', level: 0 },
      { name: 'SQL Databases', level: 70 },
      { name: 'NoSQL Databases', level: 75 },
      { name: 'Authentication', level: 0 },
    ]
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 75 },
      { name: 'Docker', level: 0 },
      { name: 'CI/CD', level: 0 },
      { name: 'Webpack', level: 10 },
      { name: 'Jest & Testing Library', level: 10 },
      { name: 'Figma', level: 40 },
      { name: 'VS Code', level: 90 },
    ]
  },
  {
    category: 'Soft Skills',
    skills: [
      { name: 'Problem Solving', level: 70 },
      { name: 'Communication', level: 85 },
      { name: 'Team Collaboration', level: 85 },
      { name: 'Time Management', level: 90 },
      { name: 'Adaptability', level: 75 },
      { name: 'Project Management', level: 70 },
      { name: 'Mentoring', level: 60 },
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-muted py-24">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="text-muted-foreground mb-12 max-w-3xl">
          My technical skills and proficiency levels across various technologies, frameworks, and tools that I use to build robust applications.
        </p>

        <Tabs defaultValue="Frontend" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {skillCategories.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SkillsSection;
