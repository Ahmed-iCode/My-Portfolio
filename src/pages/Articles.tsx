import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Article {
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

const articles: Article[] = [
  {
    title: "مقدمة في React",
    summary: "مقال تعليمي عن أساسيات React وكيفية البدء في استخدامه",
    content: "محتوى المقال الكامل هنا...",
    date: "2024",
    imageUrl: "/article1.jpg",
    tags: ["React", "JavaScript", "Frontend"]
  },
  // يمكنك إضافة المزيد من المقالات هنا
];

const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">مقالاتي</h1>
      
      {selectedArticle ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← العودة للمقالات
          </button>
          <img
            src={selectedArticle.imageUrl}
            alt={selectedArticle.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-3xl font-bold mb-4">{selectedArticle.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{selectedArticle.date}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedArticle.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="prose dark:prose-invert max-w-none">
            {selectedArticle.content}
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{article.summary}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{article.date}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles; 