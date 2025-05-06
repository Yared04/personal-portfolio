'use client';
import Contact from '@/components/Contact';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Services from '@/components/Services';
import { ThemeToggler } from '@/components/ThemeToggler';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('Home');

  const handleInViewChange = (name: string) => {
    setActiveSection(name);
  };

  return (
    <div className="">
      <div className="absolute right-5 top-5 z-10">
        <ThemeToggler />
      </div>
      <nav className="fixed left-0 flex h-full flex-col justify-center p-4">
        <Navigation active={activeSection} />
      </nav>
      <main className="container ml-24 flex max-w-screen-xl flex-col gap-32 lg:ml-36">
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
  const isInView = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    if (isInView) {
      onInViewChange(name);
    }
  }, [isInView, name, onInViewChange]);

  return (
    <section ref={ref} id={id} className="flex min-h-screen w-full items-center justify-center">
      {children}
    </section>
  );
}
