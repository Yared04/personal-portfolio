import React, { useState } from 'react';
import { Title } from './Title';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import projectsData from '../data/projectsData.json';
import { GithubIcon, ExternalLink } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import ProjectModal from './ProjectModal';

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="body-font w-full">
      <Title title="Featured Projects" />
      <motion.div
        className="mt-8 flex flex-wrap gap-8 justify-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-100px' }}
      >
        {projectsData.projects.map(project => (
          <motion.div key={project.id} variants={item} className="group">
            <Card 
              className="h-full max-w-96 transition-all duration-300 group-hover:scale-105 dark:bg-neutral-900 "
              onClick={() => openProjectModal(project)}
            >
              <CardHeader className="relative">
                <div 
                  className="relative h-48 w-full overflow-hidden rounded-t-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, index) => {
                        const imageSrc = typeof image === 'string' ? image : image.src;
                        return (
                          <CarouselItem key={index}>
                            <div className="relative h-48 w-full">
                              <Image
                                src={imageSrc}
                                alt={`${project.title} - Image ${index + 1}`}
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
                <div className="mt-12 flex items-center justify-between cursor-pointer">
                  <h3 className="text-xl font-semibold dark:text-white">{project.title}</h3>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 text-sm dark:text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-neutral-800 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
