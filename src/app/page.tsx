'use client';

import Contact from '@/components/Contact';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Services from '@/components/Services';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', name: 'Home' },
  { id: 'resume', name: 'Resume' },
  { id: 'services', name: 'Services' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('Home');

  useEffect(() => {
    const handleScroll = () => {
      // 1. If we are near the very top of the page, always highlight 'Home'
      if (window.scrollY < 100) {
        setActiveSection('Home');
        return;
      }

      // 2. If we are scrolled all the way to the bottom, always highlight 'Contact'
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection('Contact');
        return;
      }

      // 3. Otherwise, determine which section is currently in the active viewport zone.
      // We check which section starts above or at the threshold (e.g. 100px from viewport top).
      // The last section that meets this criteria is the active one.
      const threshold = 120;
      let currentSection = 'Home';

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentSection = SECTIONS[i].name;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set correct initial active section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303] text-foreground font-sans overflow-x-hidden">
      
      {/* Decorative Grid Grid & Glowing Orbs Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.015),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Top capsule navigation */}
      <Navigation active={activeSection} />

      {/* Main content centered layout */}
      <main className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-10 sm:pb-16 flex flex-col gap-6 sm:gap-10 lg:gap-14">
        
        <Section id="home">
          <HeroSection />
        </Section>
        
        <Section id="resume">
          <Resume />
        </Section>
        
        <Section id="services">
          <Services />
        </Section>
        
        <Section id="projects">
          <Projects />
        </Section>
        
        <Section id="contact">
          <Contact />
        </Section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/[0.04] bg-[#050505] py-8 text-center text-xs text-neutral-500 font-mono tracking-wider">
        <p>&copy; {new Date().getFullYear()} YARED TEGEGN.</p>
      </footer>
    </div>
  );
}

type SectionProps = {
  children: React.ReactNode;
  id: string;
};

function Section({ children, id }: SectionProps) {
  return (
    <section id={id} className="w-full py-6 sm:py-10 scroll-mt-20 sm:scroll-mt-24">
      {children}
    </section>
  );
}

