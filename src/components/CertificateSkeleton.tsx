import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CertificateSkeleton = () => {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border">
      {/* Image skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-48" />
        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        {/* Award icon skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Header with title and issuer */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <Skeleton className="h-5 w-4/5 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Date skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Skills tags skeleton */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* View details skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
};

export default CertificateSkeleton;