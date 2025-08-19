'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development and in the browser
    if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') {
      return;
    }

    // --- Core Web Vitals Observer ---
    const vitalsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ('value' in entry) {
          console.log(
            `${entry.name}: ${(entry as PerformanceEntry & { value?: number }).value}`
          );
        } else {
          console.log(entry.name);
        }
      }
    });
    vitalsObserver.observe({
      entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
    });

    // --- Long Task Observer ---
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry.duration, 'ms');
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });

    // --- Memory Usage Monitor ---
    let memoryInterval: NodeJS.Timeout | null = null;
    if ('memory' in performance) {
      memoryInterval = setInterval(() => {
        const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
          console.warn(
            'High memory usage:',
            Math.round(memory.usedJSHeapSize / 1024 / 1024),
            'MB'
          );
        }
      }, 10000);
    }

    // Cleanup
    return () => {
      vitalsObserver.disconnect();
      longTaskObserver.disconnect();
      if (memoryInterval) clearInterval(memoryInterval);
    };
  }, []);

  return null;
}
