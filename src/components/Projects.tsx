'use client';

import React, { useState } from 'react';
import { Title } from './Title';
import { motion } from 'framer-motion';
import projectsData from '../data/projectsData.json';
import { Github, ExternalLink } from 'lucide-react';
import ProjectModal from './ProjectModal';
import type { Project } from '@/types/project';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="w-full">
      <Title title="Featured Projects" subtitle="My Creative & Technical Endeavors" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="flex flex-col gap-px border border-white/[0.06] rounded-2xl overflow-hidden bg-neutral-900/10 mt-5 sm:mt-8"
      >
        {projectsData.projects.map((project) => {
          return (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              onClick={() => openProjectModal(project as unknown as Project)}
              className="group relative cursor-pointer block border-b border-white/[0.04] last:border-b-0 hover:bg-neutral-900/40 transition-colors duration-300"
            >
              {/* Subtle Backglow Orb */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-yellow-500/[0.002] group-hover:bg-yellow-500/[0.006] blur-2xl pointer-events-none transition-all duration-500" />
              
              <div className="flex items-start md:items-center justify-between p-4 sm:p-6 lg:p-8 flex-col md:flex-row gap-4 md:gap-6">
                
                {/* Left Column: Info */}
                <div className="flex items-start md:items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bricolage text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-yellow-400 transition-colors duration-300 uppercase">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span 
                            key={i} 
                            className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded border border-white/[0.06] text-neutral-400 bg-neutral-950/40"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded border border-white/[0.06] text-neutral-500">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl font-sans group-hover:text-neutral-300 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right Column: Actions */}
                <div className="flex items-center space-x-4 ml-auto md:ml-6 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-white/[0.06] hover:border-white/[0.15] bg-neutral-900/50 hover:bg-neutral-900 text-neutral-400 hover:text-white rounded-full transition-all duration-200"
                      aria-label="GitHub Repository"
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-white/[0.06] hover:border-white/[0.15] bg-neutral-900/50 hover:bg-neutral-950 text-neutral-400 hover:text-white rounded-full transition-all duration-200"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </div>
  );
};

export default Projects;
