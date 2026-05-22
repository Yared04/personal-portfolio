'use client';

import React from 'react';
import { motion } from 'framer-motion';

type TitleProps = {
  title: string;
  subtitle?: string;
};

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-6 sm:mb-10 flex flex-col space-y-1.5 text-left"
    >
      {subtitle && (
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">
          {subtitle}
        </span>
      )}
      <div className="flex items-center space-x-4">
        <h2 className="font-bricolage text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
          {title}
        </h2>
        <div className="h-[1px] flex-grow bg-white/[0.06]" />
      </div>
    </motion.div>
  );
};
