/**
 * ProgressBar - Top loading bar component
 * Using NProgress for route transitions
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// Configure NProgress
if (typeof window !== 'undefined') {
  NProgress.configure({ 
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.08,
  });
}

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Add custom styles for NProgress
    const style = document.createElement('style');
    style.innerHTML = `
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: hsl(var(--primary));
        position: fixed;
        z-index: 1500;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px hsl(var(--primary)), 0 0 5px hsl(var(--primary));
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

// Hook for programmatic progress control
export function useProgress() {
  return {
    start: () => NProgress.start(),
    done: () => NProgress.done(),
    set: (value: number) => NProgress.set(value),
    inc: (amount?: number) => NProgress.inc(amount),
  };
}

