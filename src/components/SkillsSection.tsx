
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
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'React.js', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'Next.js', level: 70 },
      { name: 'Vue.js', level: 65 },
      { name: 'Tailwind CSS', level: 80 },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 75 },
      { name: 'RESTful APIs', level: 85 },
      { name: 'GraphQL', level: 65 },
      { name: 'SQL Databases', level: 70 },
      { name: 'NoSQL Databases', level: 75 },
      { name: 'Authentication', level: 80 },
    ]
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Docker', level: 65 },
      { name: 'CI/CD', level: 70 },
      { name: 'Webpack', level: 75 },
      { name: 'Jest & Testing Library', level: 70 },
      { name: 'Figma', level: 60 },
      { name: 'VS Code', level: 90 },
    ]
  },
  {
    category: 'Soft Skills',
    skills: [
      { name: 'Problem Solving', level: 90 },
      { name: 'Communication', level: 85 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Time Management', level: 80 },
      { name: 'Adaptability', level: 85 },
      { name: 'Project Management', level: 75 },
      { name: 'Mentoring', level: 70 },
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
