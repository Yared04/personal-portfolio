import React, { useRef } from 'react';
import { Title } from './Title';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import projectsData from '../data/projectsData.json';
import { GithubIcon, ExternalLink } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <div ref={ref} className="body-font w-full">
      <Title title="Featured Projects" />
      <motion.div
        className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {projectsData.projects.map(project => (
          <motion.div key={project.id} variants={item} className="group">
            <Card className="h-full transition-all duration-300 group-hover:scale-105 dark:bg-neutral-700">
              <CardHeader className="relative">
                <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative h-48 w-full">
                            <Image
                              src={image}
                              alt={`${project.title} - Image ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold dark:text-white">{project.title}</h3>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-neutral-600 dark:text-gray-300"
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
    </div>
  );
};

export default Projects;
