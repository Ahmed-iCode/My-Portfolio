import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogSkeletonProps {
  variant?: 'featured' | 'regular';
}

const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ variant = 'regular' }) => {
  if (variant === 'featured') {
    return (
      <div className="bg-card rounded-xl shadow-lg overflow-hidden border">
        {/* Featured image skeleton */}
        <div className="relative">
          <Skeleton className="w-full h-48" />
          {/* Featured badge skeleton */}
          <div className="absolute top-3 left-3">
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="p-6">
          {/* Meta info skeleton */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Title skeleton */}
          <Skeleton className="h-6 w-5/6 mb-3" />
          
          {/* Excerpt skeleton */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>

          {/* Read article link skeleton */}
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border">
      {/* Regular image skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-40" />
        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-5">
        {/* Meta info skeleton */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-2 w-2" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-2 w-2" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Title skeleton */}
        <Skeleton className="h-5 w-4/5 mb-2" />
        
        {/* Excerpt skeleton */}
        <div className="space-y-1 mb-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Skeleton className="h-4 w-10 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-6 rounded-full" />
        </div>

        {/* Read more link skeleton */}
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
};

export default BlogSkeleton;