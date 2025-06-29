import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectSkeleton = () => {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-3" />
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        
        {/* Tech stack skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>
        
        {/* Links skeleton */}
        <div className="flex space-x-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;