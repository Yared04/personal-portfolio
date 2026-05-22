'use client';

import React from 'react';
import { Title } from './Title';
import Image from 'next/image';
import { motion } from 'framer-motion';
import skillsData from '../data/skillsData.json';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  },
};

const Services = () => {
  return (
    <div className="w-full">
      <Title title="Technical Skills" subtitle="My Tech Stack & Expertise" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-0 w-full bg-neutral-900/10 border border-white/[0.04] rounded-2xl p-4 sm:p-6 lg:p-8"
      >
        {/* Backend Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start py-3 sm:py-5 border-b border-white/[0.04]">
          <div className="md:col-span-3 flex items-center space-x-3 mt-1.5">
            <div className="p-2 bg-neutral-900 border border-white/[0.06] rounded-xl text-yellow-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0 1 12 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 2c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z" />
              </svg>
            </div>
            <h3 className="font-bricolage text-sm font-black tracking-tight text-white uppercase">
              Backend
            </h3>
          </div>
          <div className="md:col-span-9 flex flex-wrap gap-2 pt-1">
            {skillsData.backend.map((skill) => (
              <motion.div
                key={`backend-${skill.name}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/[0.04] bg-neutral-950/60 text-neutral-300 text-[11px] font-mono hover:text-white hover:border-white/[0.12] transition-colors duration-300 cursor-default"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={12}
                  height={12}
                  className="w-3 h-3 object-contain filter brightness-90 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Frontend Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start py-3 sm:py-5 border-b border-white/[0.04]">
          <div className="md:col-span-3 flex items-center space-x-3 mt-1.5">
            <div className="p-2 bg-neutral-900 border border-white/[0.06] rounded-xl text-orange-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21m0 0-.75-2.25M9 21h7.5m-.75-6H21m-9-10.5H3m2 17H3m14-5.25L12 9.75M12 9.75 8.25 15.75M12 9.75V3" />
              </svg>
            </div>
            <h3 className="font-bricolage text-sm font-black tracking-tight text-white uppercase">
              Frontend
            </h3>
          </div>
          <div className="md:col-span-9 flex flex-wrap gap-2 pt-1">
            {skillsData.frontend.map((skill) => (
              <motion.div
                key={`frontend-${skill.name}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/[0.04] bg-neutral-950/60 text-neutral-300 text-[11px] font-mono hover:text-white hover:border-white/[0.12] transition-colors duration-300 cursor-default"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={12}
                  height={12}
                  className="w-3 h-3 object-contain filter brightness-90 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DevOps Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start py-3 sm:py-5">
          <div className="md:col-span-3 flex items-center space-x-3 mt-1.5">
            <div className="p-2 bg-neutral-900 border border-white/[0.06] rounded-xl text-yellow-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.64 8.38a9 9 0 1 1-1.39 9.25m8.39-7.25h.008v.008H16.7V10.4Z" />
              </svg>
            </div>
            <h3 className="font-bricolage text-sm font-black tracking-tight text-white uppercase">
              Devops
            </h3>
          </div>
          <div className="md:col-span-9 flex flex-wrap gap-2 pt-1">
            {skillsData.devops.map((skill) => (
              <motion.div
                key={`devops-${skill.name}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/[0.04] bg-neutral-950/60 text-neutral-300 text-[11px] font-mono hover:text-white hover:border-white/[0.12] transition-colors duration-300 cursor-default"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={12}
                  height={12}
                  className="w-3 h-3 object-contain filter brightness-90 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Services;
