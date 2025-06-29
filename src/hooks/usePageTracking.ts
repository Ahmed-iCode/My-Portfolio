import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';

// Custom hook to track page views automatically
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    const pageTitle = document.title;
    const pageLocation = window.location.href;
    
    trackPageView(pageTitle, pageLocation);
  }, [location]);
};

// Custom hook to track scroll depth
export const useScrollTracking = (pageName: string) => {
  useEffect(() => {
    let maxScrollDepth = 0;
    const scrollDepthThresholds = [25, 50, 75, 90, 100];
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
      }

      // Track specific scroll depth milestones
      scrollDepthThresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          import('@/utils/analytics').then(({ trackScrollDepth }) => {
            trackScrollDepth(threshold, pageName);
          });
        }
      });
    };

    const throttledHandleScroll = throttle(handleScroll, 1000);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [pageName]);
};

// Custom hook to track time on page
export const useTimeTracking = (pageName: string) => {
  useEffect(() => {
    const startTime = Date.now();
    const timeThresholds = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    const trackedTimes = new Set<number>();

    const trackTimeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      timeThresholds.forEach(threshold => {
        if (timeSpent >= threshold && !trackedTimes.has(threshold)) {
          trackedTimes.add(threshold);
          import('@/utils/analytics').then(({ trackTimeOnPage }) => {
            trackTimeOnPage(threshold, pageName);
          });
        }
      });
    }, 10000); // Check every 10 seconds

    return () => {
      clearInterval(trackTimeInterval);
      
      // Track final time on page when component unmounts
      const finalTime = Math.floor((Date.now() - startTime) / 1000);
      if (finalTime > 5) { // Only track if user spent more than 5 seconds
        import('@/utils/analytics').then(({ trackTimeOnPage }) => {
          trackTimeOnPage(finalTime, pageName);
        });
      }
    };
  }, [pageName]);
};

// Utility function to throttle scroll events
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}