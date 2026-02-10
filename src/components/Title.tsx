import React from 'react';
import { motion } from 'framer-motion';

type TitleProps = {
  title: string;
};

export const Title = ({ title }: TitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12 flex flex-col items-center text-center"
    >
      <h1 className="bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-600 bg-clip-text text-4xl font-bold text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-sky-500">
        {title}
      </h1>
      <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-sky-600/50 dark:from-cyan-400/50 dark:via-blue-400/50 dark:to-sky-500/50" />


    </motion.div>
  );
};
