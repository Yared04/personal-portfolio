import { motion } from 'framer-motion';
import Avatar from './Avatar';
import { Button } from './ui/button';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="flex w-full items-center justify-center pt-10">
      <div className="mx-auto flex flex-col items-center justify-between gap-8 px-4 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="basis-1/2 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-600 bg-clip-text text-4xl font-bold text-transparent leading-tight py-2 lg:text-5xl dark:from-cyan-400 dark:via-blue-400 dark:to-sky-500"


          >
            Yared Tegegn
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-lg font-medium text-primary/80 dark:text-primary/90 lg:text-xl"
          >
            Software Engineer | Full-Stack Developer
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 lg:text-lg"
          >
            <p>
              From{' '}
              <span className="font-semibold">pixel-perfect UIs</span> to{' '}
              <span className="font-semibold">rock-solid backends</span>, I
              craft digital experiences that work beautifully and grow with your
              needs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-gradient-to-r text-base from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-8"


            >
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: [0, -20, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="hidden lg:flex basis-1/2 items-center justify-center relative"
        >

          <motion.div
            animate={{
              // background: [
              //   "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(6, 182, 212, 0.15) 100%)",
              //   "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
              //   "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(6, 182, 212, 0.15) 100%)"

              // ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          />
          <div className="relative z-10 overflow-hidden">
            <Avatar />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
