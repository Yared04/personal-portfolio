'use client';

import React from 'react';
import { Title } from './Title';
import resumeData from '@/data/resumeData.json';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const Resume = () => {
  return (
    <div className="w-full">
      <Title title="Resume" subtitle="Education & Professional Experience" />

      <Tabs defaultValue="experience" className="w-full space-y-6 sm:space-y-10">
        
        {/* Modern Tab Selector capsule */}
        <div className="flex justify-center">
          <TabsList className="bg-neutral-900/40 border border-white/[0.06] rounded-full p-1 h-auto">
            <TabsTrigger 
              value="experience" 
              className="flex items-center space-x-2 px-5 py-2 text-xs font-semibold rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Briefcase size={12} />
              <span>Experience</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="flex items-center space-x-2 px-5 py-2 text-xs font-semibold rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg transition-all duration-300"
            >
              <GraduationCap size={12} />
              <span>Education</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Education Timeline */}
        <TabsContent value="education">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative border-l border-white/[0.06] ml-4 sm:ml-8 pl-5 sm:pl-8 space-y-8 sm:space-y-12 max-w-4xl mx-auto text-left"
          >
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={`education-${index}`}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#030303] border-2 border-white/[0.1] group-hover:border-yellow-400 transition-colors duration-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 group-hover:bg-yellow-400 transition-colors duration-300" />
                </span>

                <div className="space-y-3">
                  {/* Meta details (Date, Location) */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-wider uppercase text-neutral-400">
                    <span className="flex items-center space-x-1">
                      <Calendar size={10} className="text-yellow-400" />
                      <span>{edu.date}</span>
                    </span>
                    {edu.location && (
                      <span className="flex items-center space-x-1">
                        <MapPin size={10} />
                        <span>{edu.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="font-bricolage text-xl font-black text-white uppercase group-hover:text-yellow-400 transition-colors duration-300">
                      {edu.title}
                    </h3>
                    <p className="text-sm font-semibold text-neutral-400">{edu.institution}</p>
                  </div>

                  {/* Details bullet points */}
                  <ul className="space-y-2 pl-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    {edu.description.map((desc, idx) => (
                      <li key={idx} className="list-disc marker:text-yellow-400/50">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Experience Timeline */}
        <TabsContent value="experience">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative border-l border-white/[0.06] ml-4 sm:ml-8 pl-5 sm:pl-8 space-y-8 sm:space-y-12 max-w-4xl mx-auto text-left"
          >
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={`experience-${index}`}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#030303] border-2 border-white/[0.1] group-hover:border-orange-400 transition-colors duration-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 group-hover:bg-orange-400 transition-colors duration-300" />
                </span>

                <div className="space-y-4">
                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-wider uppercase text-neutral-400">
                    <span className="flex items-center space-x-1">
                      <Calendar size={10} className="text-orange-400" />
                      <span>{exp.date}</span>
                    </span>
                    {exp.location && (
                      <span className="flex items-center space-x-1">
                        <MapPin size={10} />
                        <span>{exp.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Company */}
                  <div className="space-y-1">
                    <h3 className="font-bricolage text-xl font-black text-white uppercase group-hover:text-orange-400 transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-semibold text-neutral-400">{exp.company}</p>
                  </div>

                  {/* Sub-projects list or single descriptions */}
                  {exp.projects ? (
                    <div className="space-y-4 pl-2 border-l border-white/[0.03]">
                      {exp.projects.map((project, projIdx) => (
                        <div key={projIdx} className="space-y-1.5">
                          <h4 className="text-xs sm:text-sm font-semibold text-neutral-200 uppercase font-mono tracking-wide">
                            {"// " + project.title}
                          </h4>
                          <ul className="space-y-1.5 pl-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                            {project.description.map((desc, descIdx) => (
                              <li key={descIdx} className="list-disc marker:text-orange-400/45">
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 pl-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {exp.description?.map((desc, idx) => (
                        <li key={idx} className="list-disc marker:text-orange-400/45">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technology Tags */}
                  {exp.technologies && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[9px] font-mono tracking-widest text-neutral-400 bg-neutral-900/60 border border-white/[0.04] rounded-md uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resume;
