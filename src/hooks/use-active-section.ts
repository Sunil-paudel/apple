"use client";
import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[], rootMargin = "-50% 0px -50% 0px") {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        sectionElementsRef.current.set(id, element);
      }
    });

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin } 
    );

    const currentObserver = observerRef.current;
    sectionElementsRef.current.forEach(element => currentObserver.observe(element));

    // Set initial active section (e.g. first one if visible, or hero)
    const firstSection = sectionElementsRef.current.get(sectionIds[0]);
    if (firstSection) {
       // A simple check to see if it's at the top of the page
      if (window.scrollY < firstSection.offsetHeight / 2) {
        setActiveSection(sectionIds[0]);
      }
    }


    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [sectionIds, rootMargin]);

  return activeSection;
}
