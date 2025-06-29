// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Check if gtag is available
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Track page views
export const trackPageView = (page_title: string, page_location: string) => {
  if (isGtagAvailable()) {
    window.gtag('config', 'G-7SXT4VERJZ', {
      page_title,
      page_location,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, parameters?: Record<string, any>) => {
  if (isGtagAvailable()) {
    window.gtag('event', action, {
      event_category: 'engagement',
      event_label: parameters?.label || '',
      value: parameters?.value || 0,
      ...parameters,
    });
  }
};

// Specific tracking functions for common actions

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string, location: string) => {
  trackEvent('click_external_link', {
    event_category: 'outbound',
    event_label: linkText,
    link_url: url,
    link_location: location,
  });
};

// Track certificate views
export const trackCertificateView = (certificateTitle: string, issuer: string) => {
  trackEvent('view_certificate', {
    event_category: 'certificates',
    event_label: certificateTitle,
    certificate_issuer: issuer,
  });
};

// Track certificate verification clicks
export const trackCertificateVerification = (certificateTitle: string, issuer: string) => {
  trackEvent('verify_certificate', {
    event_category: 'certificates',
    event_label: certificateTitle,
    certificate_issuer: issuer,
  });
};

// Track project views
export const trackProjectView = (projectTitle: string, techStack: string[]) => {
  trackEvent('view_project', {
    event_category: 'projects',
    event_label: projectTitle,
    project_technologies: techStack.join(', '),
  });
};

// Track project demo clicks
export const trackProjectDemo = (projectTitle: string, demoUrl: string) => {
  trackEvent('click_project_demo', {
    event_category: 'projects',
    event_label: projectTitle,
    demo_url: demoUrl,
  });
};

// Track project code clicks
export const trackProjectCode = (projectTitle: string, githubUrl: string) => {
  trackEvent('click_project_code', {
    event_category: 'projects',
    event_label: projectTitle,
    github_url: githubUrl,
  });
};

// Track blog article views
export const trackArticleView = (articleTitle: string, category: string, readingTime: number) => {
  trackEvent('view_article', {
    event_category: 'blog',
    event_label: articleTitle,
    article_category: category,
    reading_time: readingTime,
  });
};

// Track blog article shares
export const trackArticleShare = (articleTitle: string, shareMethod: string) => {
  trackEvent('share_article', {
    event_category: 'blog',
    event_label: articleTitle,
    share_method: shareMethod,
  });
};

// Track contact form submissions
export const trackContactForm = (formType: string, success: boolean) => {
  trackEvent('contact_form_submit', {
    event_category: 'contact',
    event_label: formType,
    form_success: success,
  });
};

// Track search usage
export const trackSearch = (searchTerm: string, searchLocation: string, resultsCount: number) => {
  trackEvent('search', {
    event_category: 'search',
    search_term: searchTerm,
    search_location: searchLocation,
    results_count: resultsCount,
  });
};

// Track filter usage
export const trackFilter = (filterType: string, filterValue: string, location: string) => {
  trackEvent('use_filter', {
    event_category: 'filters',
    filter_type: filterType,
    filter_value: filterValue,
    filter_location: location,
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number, page: string) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    page_location: page,
    scroll_percentage: percentage,
  });
};

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number, page: string) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    event_label: page,
    time_seconds: timeInSeconds,
  });
};

// Track CV downloads
export const trackCVDownload = () => {
  trackEvent('download_cv', {
    event_category: 'downloads',
    event_label: 'CV/Resume',
  });
};

// Track theme changes
export const trackThemeChange = (newTheme: string) => {
  trackEvent('change_theme', {
    event_category: 'preferences',
    event_label: newTheme,
  });
};

// Track navigation
export const trackNavigation = (fromPage: string, toPage: string, navigationMethod: string) => {
  trackEvent('navigate', {
    event_category: 'navigation',
    from_page: fromPage,
    to_page: toPage,
    navigation_method: navigationMethod,
  });
};