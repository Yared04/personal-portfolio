'use client';
import Contact from '@/components/Contact';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import ParticlesBackground from '@/components/ParticlesBackground';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Services from '@/components/Services';
import { ThemeToggler } from '@/components/ThemeToggler';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('Home');
  const [showMobileNav, setShowMobileNav] = useState(true);

  const handleInViewChange = (name: string) => {
    setActiveSection(name);
  };

  // Show navigation while scrolling, hide 1 second after stopping
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        // Show navigation immediately when scrolling
        setShowMobileNav(true);
        // Hide navigation 1 second after scrolling stops
        scrollTimeout = setTimeout(() => {
          setShowMobileNav(false);
        }, 1000);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  return (
    <div className="">
      {/* Particles Background */}
      <ParticlesBackground />
      
      <div className="absolute right-5 top-5 z-10">
        <ThemeToggler />
      </div>
      
      {/* Desktop Navigation - Fixed left sidebar */}
      <nav className="fixed left-0 hidden h-full flex-col justify-center p-4 sm:flex">
        <Navigation active={activeSection} />
      </nav>

      {/* Mobile Navigation - Overlay on top */}
      <nav className={`fixed left-0 top-0 z-50 flex h-full w-full flex-col p-4 justify-center transition-opacity duration-300 sm:hidden ${showMobileNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navigation active={activeSection} />
      </nav>

      {/* Main content with responsive margins */}
      <main className="container flex max-w-screen-xl flex-col gap-32 px-4 sm:ml-24 lg:ml-36">
        <Section id="home" name="Home" onInViewChange={handleInViewChange}>
          <HeroSection />
        </Section>
        <Section id="resume" name="Resume" onInViewChange={handleInViewChange}>
          <Resume />
        </Section>
        <Section id="services" name="Services" onInViewChange={handleInViewChange}>
          <Services />
        </Section>
        <Section id="projects" name="Projects" onInViewChange={handleInViewChange}>
          <Projects />
        </Section>
        <Section id="contact" name="Contact" onInViewChange={handleInViewChange}>
          <Contact />
        </Section>
      </main>
    </div>
  );
}

type SectionProps = {
  name: string;
  onInViewChange: (name: string) => void;
  children: React.ReactNode;
  id: string;
};

function Section({ name, onInViewChange, children, id }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: typeof window !== 'undefined' && window.innerWidth < 800 && name === 'Projects' ? 0.1 : name === 'Resume' ? 0.2 : 0.6
  });

  useEffect(() => {
    if (isInView) {
      onInViewChange(name);
    }
  }, [isInView, name, onInViewChange]);

  return (
    <section ref={ref} id={id} className="flex w-full items-center justify-center py-10">
      {children}
    </section>
  );
}
