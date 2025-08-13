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
      <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-purple-500">
        {title}
      </h1>
      <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-purple-600/50 dark:from-blue-400/50 dark:via-purple-400/50 dark:to-purple-500/50" />
    </motion.div>
  );
};
