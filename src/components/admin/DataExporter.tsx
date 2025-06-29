import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Code, 
  Copy, 
  Check,
  AlertCircle,
  Github,
  GitBranch
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCertificates, useProjects, useArticles } from '@/hooks/useLocalData';
import { Certificate } from '@/data/certificates';
import { Project } from '@/data/projects';
import { Article } from '@/data/articles';

const DataExporter = () => {
  const { toast } = useToast();
  const { data: certificates } = useCertificates();
  const { data: projects } = useProjects();
  const { data: articles } = useArticles();
  
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<string | null>(null);

  // Generate TypeScript file content
  const generateCertificatesFile = (data: Certificate[]) => {
    return `export interface Certificate {
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

export const initialCertificates: Certificate[] = ${JSON.stringify(data, null, 2)};`;
  };

  const generateProjectsFile = (data: Project[]) => {
    return `export interface Project {
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

export const initialProjects: Project[] = ${JSON.stringify(data, null, 2)};`;
  };

  const generateArticlesFile = (data: Article[]) => {
    return `export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published_at: string;
  updated_at: string;
  author_name: string;
  author_avatar?: string;
  tags: string[];
  category: string;
  featured: boolean;
  reading_time: number;
  image?: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}

export const initialArticles: Article[] = ${JSON.stringify(data, null, 2)};`;
  };

  // Download file function
  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded!",
      description: `${filename} has been downloaded successfully.`,
    });
  };

  // Copy to clipboard function
  const copyToClipboard = async (content: string, filename: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFile(filename);
      setTimeout(() => setCopiedFile(null), 2000);
      
      toast({
        title: "Copied to clipboard!",
        description: `${filename} content copied successfully.`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try downloading instead.",
        variant: "destructive",
      });
    }
  };

  // Download all files as ZIP (simplified - individual downloads)
  const downloadAllFiles = () => {
    if (certificates) {
      downloadFile(generateCertificatesFile(certificates), 'certificates.ts');
    }
    if (projects) {
      setTimeout(() => downloadFile(generateProjectsFile(projects), 'projects.ts'), 500);
    }
    if (articles) {
      setTimeout(() => downloadFile(generateArticlesFile(articles), 'articles.ts'), 1000);
    }
    
    toast({
      title: "All files downloaded!",
      description: "All data files have been generated and downloaded.",
    });
  };

  const fileConfigs = [
    {
      name: 'certificates.ts',
      title: 'Certificates Data',
      description: 'All certificate data with TypeScript interfaces',
      data: certificates,
      generator: generateCertificatesFile,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      name: 'projects.ts',
      title: 'Projects Data',
      description: 'All project data with TypeScript interfaces',
      data: projects,
      generator: generateProjectsFile,
      icon: Code,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      name: 'articles.ts',
      title: 'Articles Data',
      description: 'All blog article data with TypeScript interfaces',
      data: articles,
      generator: generateArticlesFile,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Data Export & Sync</h2>
        <p className="text-muted-foreground">
          Export your data as TypeScript files to sync with your codebase and version control.
        </p>
      </div>

      {/* Instructions Card */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Github className="w-5 h-5" />
            Git Workflow Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 dark:text-amber-300">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Export the updated data files using the buttons below</li>
            <li>Replace the corresponding files in <code className="bg-amber-200 dark:bg-amber-900 px-1 rounded">src/data/</code></li>
            <li>Commit your changes: <code className="bg-amber-200 dark:bg-amber-900 px-1 rounded">git add . && git commit -m "Update portfolio data"</code></li>
            <li>Push to GitHub: <code className="bg-amber-200 dark:bg-amber-900 px-1 rounded">git push</code></li>
          </ol>
        </CardContent>
      </Card>

      {/* Quick Export All */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Quick Export All
          </CardTitle>
          <CardDescription>
            Download all data files at once for easy deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={downloadAllFiles} size="lg" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download All Data Files
          </Button>
        </CardContent>
      </Card>

      {/* Individual File Exports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fileConfigs.map((config) => {
          const fileContent = config.data ? config.generator(config.data) : '';
          const isCopied = copiedFile === config.name;
          
          return (
            <motion.div
              key={config.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <config.icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    {config.title}
                  </CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <strong>{config.data?.length || 0}</strong> items • 
                    <strong> {Math.round(fileContent.length / 1024)}KB</strong>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => downloadFile(fileContent, config.name)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {config.name}
                    </Button>
                    
                    <Button
                      onClick={() => copyToClipboard(fileContent, config.name)}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      {isCopied ? 'Copied!' : 'Copy Content'}
                    </Button>
                    
                    <Button
                      onClick={() => setShowPreview(showPreview === config.name ? null : config.name)}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {showPreview === config.name ? 'Hide Preview' : 'Preview'}
                    </Button>
                  </div>

                  {/* File Preview */}
                  {showPreview === config.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <Textarea
                        value={fileContent.substring(0, 500) + (fileContent.length > 500 ? '...' : '')}
                        readOnly
                        className="font-mono text-xs h-32 resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Preview showing first 500 characters. Download for complete file.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Git Commands Helper */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Git Commands Helper
          </CardTitle>
          <CardDescription>
            Copy these commands to update your repository
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
              <div className="text-muted-foreground mb-2"># Navigate to your project directory</div>
              <div>cd your-portfolio-project</div>
            </div>
            
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
              <div className="text-muted-foreground mb-2"># Replace the data files with exported versions</div>
              <div># (Copy downloaded files to src/data/ directory)</div>
            </div>
            
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
              <div className="text-muted-foreground mb-2"># Commit and push changes</div>
              <div>git add src/data/</div>
              <div>git commit -m "Update portfolio data from admin panel"</div>
              <div>git push origin main</div>
            </div>
          </div>
          
          <Button
            onClick={() => copyToClipboard(`cd your-portfolio-project
# Replace the data files with exported versions
git add src/data/
git commit -m "Update portfolio data from admin panel"
git push origin main`, 'git-commands')}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Git Commands
          </Button>
        </CardContent>
      </Card>

      {/* Future Enhancement Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-blue-800 dark:text-blue-200">
              <h4 className="font-medium mb-1">Future Enhancement</h4>
              <p className="text-sm">
                In the future, we can add GitHub API integration to automatically commit and push changes 
                directly from the admin panel. This would require GitHub authentication and repository permissions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataExporter;