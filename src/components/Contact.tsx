'use client';

import React from 'react';
import Image from 'next/image';
import { Title } from './Title';
import { Mail, MapPin, ArrowUpRight, Github, Linkedin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const Contact = () => {
  return (
    <div className="w-full">
      <Title title="Contact" subtitle="Let's Work Together" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start w-full text-left">
        
        {/* Left Side: Call to action */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <h3 className="font-bricolage text-3xl sm:text-4xl font-black text-white uppercase leading-none">
            Ready to bring your <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ideas to life?
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-sm">
            I am always open to discussing new projects, intelligent automation ideas, or remote team opportunities. Drop a line or hire me directly.
          </p>
          
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Response time: Under 12 hours</span>
          </div>
        </motion.div>

        {/* Right Side: Sleek Grid of Channels */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        >
          
          {/* Email Card */}
          <motion.a
            href="mailto:yaredt29@gmail.com"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group block relative bg-neutral-900/20 hover:bg-neutral-900/40 border border-white/[0.04] hover:border-white/[0.12] rounded-xl p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <Mail size={16} className="text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">Direct Email</h4>
                  <p className="text-sm font-semibold text-white mt-1 font-sans">yaredt29@gmail.com</p>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-white transition-colors duration-300" />
            </div>
          </motion.a>

          {/* Upwork Hire Card */}
          <motion.a
            href="https://www.upwork.com/freelancers/yaredt8"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group block relative bg-neutral-900/20 hover:bg-neutral-900/40 border border-white/[0.04] hover:border-white/[0.12] rounded-xl p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="w-4 h-4 relative group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/icons/upwork.svg"
                    alt="Upwork"
                    fill
                    className="object-contain filter brightness-90 grayscale group-hover:grayscale-0 group-hover:brightness-100"
                  />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">Hire on Upwork</h4>
                  <p className="text-sm font-semibold text-white mt-1 font-sans">Yared Tegegn</p>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-white transition-colors duration-300" />
            </div>
          </motion.a>

          {/* Telegram Card */}
          <motion.a
            href="https://t.me/ya_red04"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group block relative bg-neutral-900/20 hover:bg-neutral-900/40 border border-white/[0.04] hover:border-white/[0.12] rounded-xl p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <MessageSquare size={16} className="text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">Telegram Messenger</h4>
                  <p className="text-sm font-semibold text-white mt-1 font-sans">@ya_red04</p>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-white transition-colors duration-300" />
            </div>
          </motion.a>

          {/* Location / Phone Card */}
          <motion.div
            variants={itemVariants}
            className="relative bg-neutral-900/20 border border-white/[0.04] rounded-xl p-5"
          >
            <div className="space-y-3">
              <MapPin size={16} className="text-neutral-400" />
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">Location</h4>
                <p className="text-sm font-semibold text-white mt-1 font-sans">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Modern Socials Footer Row */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4 sm:gap-6"
      >
        <div className="flex items-center space-x-6 ml-auto">
          <a
            href="https://github.com/Yared04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-white transition-colors duration-200"
          >
            <Github size={14} />
            <span className="font-sans font-medium">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/yared04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-white transition-colors duration-200"
          >
            <Linkedin size={14} />
            <span className="font-sans font-medium">LinkedIn</span>
          </a>
        </div>
      </motion.div>

    </div>
  );
};

export default Contact;
