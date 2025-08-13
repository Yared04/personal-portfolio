'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !project) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!project || !project.images.length) return;
    
    setCurrentImageIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? project.images.length - 1 : prev - 1;
      } else {
        return prev === project.images.length - 1 ? 0 : prev + 1;
      }
    });
  };

  const getCurrentImage = () => {
    if (!project || !project.images[currentImageIndex]) return null;
    
    const image = project.images[currentImageIndex];
    return image;
  };

  if (!project) return null;

  const currentImage = getCurrentImage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-6xl my-8 rounded-lg bg-white dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40"
            >
              <X size={20} />
            </button>

            {/* Image Gallery */}
            {project.images.length > 0 && currentImage && (
              <div className="relative">
                <div className="relative h-[50vh] md:h-[60vh] w-full bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.caption}
                    fill
                    className="object-contain"
                    priority
                  />
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                    {currentImageIndex + 1} of {project.images.length}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImage('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => navigateImage('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Image Caption */}
                <div className="bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm">{currentImage.caption}</p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.github && (
                    <Button
                      onClick={() => window.open(project.github, '_blank')}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Github size={16} />
                      Code
                    </Button>
                  )}
                  {project.live && (
                    <Button
                      onClick={() => window.open(project.live, '_blank')}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
