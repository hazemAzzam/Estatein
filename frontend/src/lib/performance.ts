// Performance monitoring utilities

export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

export const trackPerformance = () => {
  if (typeof window === 'undefined') return;

  // Track First Contentful Paint (FCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
        // Send to analytics service
      }
    });
  }).observe({ entryTypes: ['paint'] });

  // Track Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      console.log('LCP:', lastEntry.startTime);
      // Send to analytics service
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Track First Input Delay (FID)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime);
      // Send to analytics service
    });
  }).observe({ entryTypes: ['first-input'] });

  // Track Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('CLS:', clsValue);
        // Send to analytics service
      }
    });
  }).observe({ entryTypes: ['layout-shift'] });

  // Track Time to First Byte (TTFB)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === 'navigation') {
        const ttfb = entry.responseStart - entry.requestStart;
        console.log('TTFB:', ttfb);
        // Send to analytics service
      }
    });
  }).observe({ entryTypes: ['navigation'] });
};

export const measurePageLoad = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      console.log('Page Load Time:', loadTime);
      console.log('DOM Content Loaded:', domContentLoaded);
      
      // Send to analytics service
    }
  });
};

export const trackImagePerformance = () => {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === img.src) {
          console.log(`Image loaded: ${img.src} in ${entry.duration}ms`);
          // Send to analytics service
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
  });
};



