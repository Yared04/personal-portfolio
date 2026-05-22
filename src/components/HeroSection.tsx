'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Layers, Cpu, Globe } from 'lucide-react';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },

];

const floatingBadges = [
  { icon: Code2, label: 'Full Stack Dev', color: 'text-yellow-400', delay: 0 },
  { icon: Cpu, label: 'AI Integration', color: 'text-orange-400', delay: 0.15 },
  { icon: Layers, label: 'Cloud Native', color: 'text-sky-400', delay: 0.3 },
  { icon: Globe, label: 'Open to Remote', color: 'text-emerald-400', delay: 0.45 },
];

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative w-full flex items-center justify-start min-h-[60vh] sm:min-h-[75vh]">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-yellow-500/[0.025] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-orange-500/[0.02] blur-[100px] pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* ─── Left: Text Content ─── */}
        <div className="flex flex-col space-y-5 sm:space-y-8">

          {/* Role label */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold"
          >
            Full Stack &amp; AI Engineer
          </motion.p>

          {/* Name */}
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl md:text-7xl font-bricolage font-black tracking-tighter uppercase leading-none text-white"
            >
              YARED
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl md:text-7xl font-bricolage font-black tracking-tighter uppercase leading-none bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent"
            >
              TEGEGN
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="text-base sm:text-lg text-neutral-400 leading-relaxed font-sans max-w-lg"
          >
            I architect <span className="text-white font-medium">scalable cloud-native systems</span>, craft pixel-perfect user experiences, and integrate{' '}
            <span className="text-white font-medium">intelligent AI models</span> to solve complex real-world challenges.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-6 sm:gap-8 pt-1 sm:pt-2"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-bricolage text-2xl font-black text-white leading-none">{stat.value}</span>
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="group flex items-center space-x-2 bg-white text-black hover:bg-neutral-200 transition-all duration-300 text-sm font-semibold px-6 py-3 rounded-full font-sans tracking-wide"
            >
              <span>Let&apos;s Build Together</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center space-x-2 bg-neutral-900/50 hover:bg-neutral-900 border border-white/[0.08] hover:border-white/[0.15] text-neutral-300 hover:text-white transition-all duration-300 text-sm font-semibold px-6 py-3 rounded-full font-sans tracking-wide"
            >
              <span>Explore My Work</span>
            </button>
          </motion.div>
        </div>

        {/* ─── Right: Visual Panel ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className="hidden lg:flex flex-col gap-4 relative"
        >
          {/* Main decorative card */}
          <div className="relative bg-neutral-900/30 border border-white/[0.06] rounded-2xl p-8 overflow-hidden">
            {/* Inner glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-yellow-500/[0.04] blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-orange-500/[0.03] blur-[50px] pointer-events-none" />

            {/* Fake terminal header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-3 font-mono text-[10px] tracking-widest text-neutral-600 uppercase">profile.ts</span>
            </div>

            {/* Pseudo code block */}
            <div className="font-mono text-sm leading-7 space-y-0.5">
              <p><span className="text-sky-400">const</span> <span className="text-white">software_engineer</span> <span className="text-neutral-500">=</span> {'{'}</p>
              <p className="pl-5"><span className="text-yellow-400">name</span><span className="text-neutral-500">:</span> <span className="text-emerald-400">&quot;Yared Tegegn&quot;</span><span className="text-neutral-500">,</span></p>
              <p className="pl-5"><span className="text-yellow-400">role</span><span className="text-neutral-500">:</span> <span className="text-emerald-400">&quot;Full Stack + AI&quot;</span><span className="text-neutral-500">,</span></p>
              <p className="pl-5"><span className="text-yellow-400">openTo</span><span className="text-neutral-500">:</span> <span className="text-emerald-400">&quot;Remote Work&quot;</span><span className="text-neutral-500">,</span></p>
              <p className="pl-5"><span className="text-yellow-400">location</span><span className="text-neutral-500">:</span> <span className="text-emerald-400">&quot;Addis Ababa, ET&quot;</span><span className="text-neutral-500">,</span></p>
              <p className="pl-5"><span className="text-yellow-400">status</span><span className="text-neutral-500">:</span> <span className="text-emerald-400 flex items-center gap-2">&quot;Available&quot;
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 align-middle"
                /></span>
              </p>
              <p>{'}'}</p>
            </div>
          </div>

          {/* Floating skill badges */}
          <div className="grid grid-cols-2 gap-3">
            {floatingBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + badge.delay, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex items-center gap-3 bg-neutral-900/30 border border-white/[0.05] rounded-xl p-3.5 cursor-default group"
                >
                  <div className={`${badge.color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={16} />
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors tracking-wide">{badge.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
