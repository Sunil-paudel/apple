
"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This is a good place for any global GSAP settings or configurations
    // For instance, you could set default eases or durations here.
    
    // Refresh ScrollTrigger on mount to ensure it has correct dimensions
    ScrollTrigger.refresh();
  }, []);

  return <>{children}</>;
}
