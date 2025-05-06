import { motion } from 'framer-motion';
import Avatar from './Avatar';

const HeroSection = () => {
  return (
    <section className="flex min-h-[100vh] w-full items-center justify-center">
      <div className="container mx-auto flex items-center justify-between gap-8 px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="basis-1/2"
        >
          <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-purple-500">
            Yared Gebeyaw
          </h1>
          <h3 className="mt-4 text-xl font-medium text-primary/80 dark:text-primary/90">
            Software Engineer | Full-stack Developer
          </h3>
          <p className="mt-6 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            I&apos;m a passionate fullstack developer with expertise in building modern web
            applications. With a strong foundation in both frontend and backend technologies, I
            create efficient, scalable, and user-friendly solutions. My approach combines technical
            excellence with creative problem-solving to deliver exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex basis-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-purple-600/10 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-purple-500/20"
        >
          <Avatar />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
