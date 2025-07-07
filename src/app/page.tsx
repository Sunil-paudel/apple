
"use client"
import { useEffect } from 'react';
import { gsap } from 'gsap';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import EducationSection from '@/components/sections/education-section';
import {ExperienceSection} from '@/components/sections/experience-section';
import SkillsSection from '@/components/sections/skills-section';
import ProjectsSection from '@/components/sections/projects-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  useEffect(() => {
    // Set initial states for animations
    gsap.set("section:not(#hero)", { autoAlpha: 0, y: 50 });
    gsap.set('#hero-text-content > *, #hero-image-container', { autoAlpha: 0 });

    // Animate Hero section elements on load
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }});
    tl.to(
      '#hero-text-content > *',
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.2, delay: 0.2 }
    )
    .to(
      '#hero-image-container',
      { x: 0, autoAlpha: 1, duration: 1 },
      "-=1.2" // Start this animation 1.2s before the previous one ends
    );


    // Animate other sections on scroll
    const sections = gsap.utils.toArray<HTMLElement>('section:not(#hero)');
    sections.forEach((section) => {
      gsap.to(
        section,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);


  return (
    <>
      <HeroSection id="hero" />
      <AboutSection id="about" />
      <EducationSection id="education" />
      <ExperienceSection id="experience" />
      <SkillsSection id="skills" />
      <ProjectsSection id="projects" />
      <ContactSection id="contact" />
    </>
  );
}
