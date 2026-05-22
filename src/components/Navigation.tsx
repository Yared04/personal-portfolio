'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownToLine, Menu, X } from 'lucide-react';

type Props = {
  active: string;
};

const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'resume', name: 'Resume' },
  { id: 'services', name: 'Services' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
];

function Navigation({ active }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'py-3 bg-[#030303]/60 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick('home')}
              className="text-lg font-bricolage font-black tracking-tight cursor-pointer text-white"
            >
              YARED<span className="text-yellow-400">&nbsp;T</span>
            </motion.span>
          </div>

          {/* Desktop Capsule Navigation Links */}
          <nav className="hidden md:flex items-center bg-neutral-900/40 border border-white/[0.06] rounded-full p-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = active.toLowerCase() === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 rounded-full ${isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.05] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Call to Action */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/CV.pdf"
              download="Yared_Tegegn_CV.pdf"
              className="group flex items-center space-x-2 bg-white text-black hover:bg-neutral-200 transition-all duration-300 text-xs font-semibold px-4 py-2 rounded-full font-sans tracking-wide"
            >
              <span>Download CV</span>
              <ArrowDownToLine size={14} className="group-hover:translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href="/CV.pdf"
              download="Yared_Tegegn_CV.pdf"
              className="p-2 bg-white text-black hover:bg-neutral-200 transition-all duration-300 rounded-full"
              aria-label="Download CV"
            >
              <ArrowDownToLine size={16} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/[0.08] bg-neutral-900/50 hover:bg-neutral-900 text-neutral-300 rounded-full transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-[#030303] border-b border-white/[0.06] overflow-hidden mt-3"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {navItems.map((item) => {
                const isActive = active.toLowerCase() === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-3 px-4 text-sm font-medium tracking-wide rounded-lg transition-all duration-200 ${isActive
                        ? 'bg-white/[0.05] text-white border-l-2 border-yellow-400 font-semibold pl-5'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]'
                      }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navigation;
