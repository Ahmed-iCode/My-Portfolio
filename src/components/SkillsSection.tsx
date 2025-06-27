import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Code, Database, Wrench, Users } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon?: React.ReactNode;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
  icon: React.ReactNode;
  description: string;
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: <Code size={20} />,
    description: 'Modern frontend technologies and frameworks',
    skills: [
      { name: 'HTML5 & CSS3', level: 85 },
      { name: 'JavaScript (ES6+)', level: 80 },
      { name: 'React.js', level: 75 },
      { name: 'TypeScript', level: 65 },
      { name: 'Tailwind CSS', level: 70 },
      { name: 'Next.js', level: 40 },
      { name: 'Vue.js', level: 45 },
    ]
  },
  {
    category: 'Backend',
    icon: <Database size={20} />,
    description: 'Server-side development and database management',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 65 },
      { name: 'RESTful APIs', level: 70 },
      { name: 'SQL Databases', level: 75 },
      { name: 'NoSQL Databases', level: 70 },
      { name: 'GraphQL', level: 30 },
      { name: 'Authentication', level: 60 },
    ]
  },
  {
    category: 'Tools',
    icon: <Wrench size={20} />,
    description: 'Development tools and workflow optimization',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Webpack', level: 40 },
      { name: 'Jest & Testing Library', level: 35 },
      { name: 'Figma', level: 50 },
      { name: 'Docker', level: 25 },
      { name: 'CI/CD', level: 30 },
    ]
  },
  {
    category: 'Soft Skills',
    icon: <Users size={20} />,
    description: 'Professional and interpersonal capabilities',
    skills: [
      { name: 'Problem Solving', level: 85 },
      { name: 'Communication', level: 90 },
      { name: 'Team Collaboration', level: 85 },
      { name: 'Time Management', level: 90 },
      { name: 'Adaptability', level: 80 },
      { name: 'Project Management', level: 75 },
      { name: 'Mentoring', level: 65 },
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My technical expertise and proficiency levels across various technologies, frameworks, 
            and tools that I use to build robust applications and deliver exceptional results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="Frontend" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 h-auto p-1">
              {skillCategories.map((category) => (
                <TabsTrigger 
                  key={category.category} 
                  value={category.category}
                  className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.category}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {skillCategories.map((category, categoryIndex) => (
              <TabsContent key={category.category} value={category.category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-8">
                      <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            {category.icon}
                          </div>
                          <h3 className="text-2xl font-semibold">{category.category}</h3>
                        </div>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="space-y-3"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-foreground">{skill.name}</span>
                              <span className="text-sm text-muted-foreground font-medium">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="relative">
                              <Progress 
                                value={skill.level} 
                                className="h-3 bg-muted"
                              />
                              <div 
                                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;