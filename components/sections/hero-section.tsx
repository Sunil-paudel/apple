
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section>
      {/* Other hero section content */}
      <div style={{ width: '400px', height: '600px' }}> {/* Adjust size as needed */}
        <IDCardScene imageUrl="/images/hero-profile.jpg" name="Your Name" title="Your Title" />
      </div>
    </section>
  );
};

export default HeroSection;
interface HeroSectionProps {
  id: string;
}

export default function HeroSection({ id }: HeroSectionProps) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [handState, setHandState] = useState<'idle' | 'entering' | 'waving' | 'leaving'>('idle');
  const waveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handWaveCount = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const heroHeight = containerRef.current.offsetHeight;
      const currentScroll = window.scrollY;
      const fadeStart = heroHeight * 0.1;
      const fadeEnd = heroHeight * 0.7;

      if (currentScroll <= fadeStart) {
        setScrollOpacity(1);
      } else if (currentScroll >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        setScrollOpacity(1 - (currentScroll - fadeStart) / (fadeEnd - fadeStart));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (waveTimeoutRef.current) {
      clearTimeout(waveTimeoutRef.current);
    }

    switch (handState) {
      case 'idle':
        if (handWaveCount.current === 0) {
          waveTimeoutRef.current = setTimeout(() => setHandState('entering'), 1500);
        }
        break;
      case 'entering':
        waveTimeoutRef.current = setTimeout(() => setHandState('waving'), 300);
        break;
      case 'waving':
        waveTimeoutRef.current = setTimeout(() => {
          if (handWaveCount.current < 2) {
            handWaveCount.current++;
            setHandState('waving');
          } else {
            setHandState('leaving');
          }
        }, 700);
        break;
      case 'leaving':
        waveTimeoutRef.current = setTimeout(() => {
          setHandState('idle');
        }, 300);
        break;
    }

    return () => {
      if (waveTimeoutRef.current) {
        clearTimeout(waveTimeoutRef.current);
      }
    };
  }, [handState]);

  return (
    <section
      id={id}
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-background"
      style={{ opacity: scrollOpacity, transition: 'opacity 0.3s ease-out' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content: Text and Buttons */}
          <div className="md:w-3/5 lg:w-1/2 text-center md:text-left order-2 md:order-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
              Shikhar <span className="text-primary">KC</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-10 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              IT Support Specialist | Google IT Support Certified | Tech Enthusiast
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="#contact">Get in Touch</Link>
              </Button>
              <div className="relative">
                <Button asChild variant="secondary" size="lg" className="shadow-lg hover:shadow-secondary/50 transition-shadow relative z-10">
                  <Link href="/Shikhar_KC_Resume.pdf" target="_blank" rel="noopener noreferrer">Download CV</Link>
                </Button>
                <Hand
                  className={cn(
                    "absolute text-yellow-500 dark:text-yellow-300 transition-all duration-300 ease-out pointer-events-none",
                    "w-7 h-7",
                    "top-1/2 right-[-14px] -translate-y-1/2",
                    {
                      'opacity-0 scale-0': handState === 'idle',
                      'opacity-100 scale-100 rotate-[-20deg] -translate-x-6 -translate-y-5': handState === 'entering',
                      'opacity-100 scale-100 animate-wave-hand-animation -translate-x-7 -translate-y-6': handState === 'waving',
                      'opacity-0 scale-90 rotate-[20deg] -translate-x-4 -translate-y-4': handState === 'leaving',
                    }
                  )}
                  style={{
                    transformOrigin: 'bottom right',
                  }}
                />
              </div>
              <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-muted-foreground/30 transition-shadow">
                <Link href="#projects">View Projects</Link>
              </Button>
            </div>
          </div>

          {/* Right Content: Image */}
          <div className="md:w-2/5 lg:w-1/2 flex justify-center md:justify-end order-1 md:order-2 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-2xl border-4 border-primary/30">
              <Image
                src="/images/hero-profile.jpg"
                alt="Shikhar KC Profile"
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
