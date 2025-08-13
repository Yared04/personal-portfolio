'use client';
import React from 'react';
import { Title } from './Title';
import { Button } from './ui/button';
import resumeData from '@/data/resumeData.json';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Resume = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="body-font w-full">
      <Title title="Resume" />

      <Tabs defaultValue="experience" className="w-full">
        <TabsList className="mx-auto mb-12 grid w-full max-w-lg grid-cols-2">
        <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase size={20} />
            <span>Experience</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap size={20} />
            <span>Education</span>
          </TabsTrigger>
          
        </TabsList>

        <TabsContent value="education">
          <motion.div
            className="mx-auto flex w-full max-w-6xl flex-col gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
          >
            <div className="relative">
              {/* Center line for larger screens, left line for smaller screens */}
              <div className="absolute left-1/2 h-full w-0.5 bg-primary md:block hidden"></div>
              <div className="absolute left-4 h-full w-0.5 bg-primary md:hidden"></div>
              
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={`education-${index}`}
                  variants={itemVariants}
                  whileInView="visible"
                  viewport={{ once: false, margin: '-50px' }}
                  initial="hidden"
                  className={`relative mb-16 flex items-start gap-8 md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                >
                  <div
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-12`}
                  >
                    <h4 className="mb-2 text-xl font-semibold">{edu.title}</h4>
                    <p className="mb-1 text-sm text-primary">{edu.date}</p>
                    <p className="mb-2 italic text-neutral-500">{edu.institution}</p>
                    <ul className={`text-left text-neutral-600 dark:text-neutral-300`}>
                      {edu.description.map((desc, idx) => (
                        <li className="list-disc" key={idx}>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Center dot for larger screens, left dot for smaller screens */}
                  <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-white md:block hidden"></div>
                  <div className="absolute left-4 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-white md:hidden"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="experience">
          <motion.div
            className="mx-auto flex w-full max-w-6xl flex-col gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
          >
            <div className="relative">
              {/* Center line for larger screens, left line for smaller screens */}
              <div className="absolute left-1/2 h-full w-0.5 bg-primary md:block hidden"></div>
              <div className="absolute left-4 h-full w-0.5 bg-primary md:hidden"></div>
              
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={`experience-${index}`}
                  variants={itemVariants}
                  whileInView="visible"
                  viewport={{ once: false, margin: '-50px' }}
                  initial="hidden"
                  className={`relative mb-16 flex items-start gap-8 md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                >
                  <div
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-12`}
                  >
                    <h4 className="mb-2 text-xl font-semibold">{exp.title}</h4>
                    <p className="mb-1 text-sm text-primary">{exp.date}</p>
                    <p className="mb-2 italic text-neutral-500">{exp.company}</p>
                    
                    {/* Projects section for new format */}
                    {exp.projects ? (
                      <div className="text-left text-neutral-600 dark:text-neutral-300 space-y-4">
                        {exp.projects.map((project, projIdx) => (
                          <div key={projIdx}>
                            <h5 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                              {project.title}
                            </h5>
                            <ul className="pl-4 space-y-1">
                              {project.description.map((desc, descIdx) => (
                                <li key={descIdx} className="list-disc">
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Original description format for backward compatibility */
                      <ul className={`text-left text-neutral-600 dark:text-neutral-300`}>
                        {exp.description?.map((desc, idx) => (
                          <li key={idx} className="list-disc">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {exp.technologies && (
                      <div className="mt-4 text-left">
                        <span className="text-sm font-semibold text-primary">Tech Stack: </span>
                        <span className="text-sm italic">
                          {exp.technologies.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Center dot for larger screens, left dot for smaller screens */}
                  <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-white md:block hidden"></div>
                  <div className="absolute left-4 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-white md:hidden"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        className="mx-auto mt-8 w-full text-center"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <Button size={'lg'} onClick={() => window.open("/Yared Tegegn's Resume.pdf", '_blank')} className="rounded-3xl py-2">
          View Resume
        </Button>
      </motion.div>
    </section>
  );
};

export default Resume;
