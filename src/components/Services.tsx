import React, { useRef } from 'react';
import { Title } from './Title';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import skillsData from '../data/skillsData.json';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <div ref={ref}>
      <Title title="Technical Skills" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <motion.div className="flex" variants={cardVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <Card className="group w-full h-full transition-all duration-300 hover:scale-105 dark:bg-neutral-900">
            <CardHeader>
              <div className="flex flex-col gap-3">
                <Image
                  className="rounded-lg bg-white p-2 dark:bg-neutral-900"
                  src="/icons/backend.png"
                  width={60}
                  height={60}
                  alt="backend"
                />
                <p className="text-xl font-semibold dark:text-white">Backend Development</p>
              </div>
            </CardHeader>
            <CardContent className="dark:text-white">
              <motion.div
                className="grid grid-cols-2 gap-2"
                variants={container}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
              >
                {skillsData.backend.map(skill => (
                  <motion.span key={`backend-${skill.name}`} className="p-2" variants={item}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  </motion.span>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="flex" variants={cardVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <Card className="group w-full h-full transition-all duration-300 hover:scale-105 dark:bg-neutral-900">
            <CardHeader>
              <div className="flex flex-col gap-3">
                <Image
                  className="rounded-lg bg-white p-2 dark:bg-neutral-900"
                  src="/icons/frontend.png"
                  width={60}
                  height={60}
                  alt="frontend"
                />
                <p className="text-xl font-semibold dark:text-white">Frontend Development</p>
              </div>
            </CardHeader>
            <CardContent className="dark:text-white">
              <motion.div
                className="grid grid-cols-2 gap-2"
                variants={container}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
              >
                {skillsData.frontend.map(skill => (
                  <motion.span key={`frontend-${skill.name}`} className="p-2" variants={item}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  </motion.span>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="flex" variants={cardVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
          <Card className="group w-full h-full transition-all duration-300 hover:scale-105 dark:bg-neutral-900">
            <CardHeader>
              <div className="flex flex-col gap-3">
                <Image
                  className="rounded-lg bg-white p-2 dark:bg-neutral-900"
                  src="/icons/devops.svg"
                  width={60}
                  height={60}
                  alt="devops"
                />
                <p className="text-xl font-semibold dark:text-white">DevOps</p>
              </div>
            </CardHeader>
            <CardContent className="dark:text-white">
              <motion.div
                className="grid grid-cols-2 gap-2"
                variants={container}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
              >
                {skillsData.devops.map(skill => (
                  <motion.span key={`devops-${skill.name}`} className="p-2" variants={item}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  </motion.span>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
