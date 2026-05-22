'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!project || !project.images.length) return;
    
    setCurrentImageIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? project.images.length - 1 : prev - 1;
      } else {
        return prev === project.images.length - 1 ? 0 : prev + 1;
      }
    });
  }, [project]);

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
  }, [isOpen, project, onClose, navigateImage]);

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

  if (!project) return null;

  const currentImage = project.images[currentImageIndex];
  const imageSrc = currentImage 
    ? (typeof currentImage === 'string' ? currentImage : currentImage.src)
    : '/placeholder.jpg';
  const imageCaption = currentImage && typeof currentImage !== 'string' 
    ? currentImage.caption 
    : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#050506] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with brand / name and close */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04] bg-[#050506]">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                Project Detail View
              </span>
              <button
                onClick={onClose}
                className="p-1.5 border border-white/[0.08] hover:border-white/[0.2] bg-neutral-900/50 hover:bg-neutral-900 text-neutral-400 hover:text-white rounded-full transition-all duration-200"
                aria-label="Close details"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body scrollable */}
            <div className="overflow-y-auto flex-grow">
              {/* Main Visual showcase */}
              {project.images.length > 0 && (
                <div className="relative aspect-video w-full bg-black flex items-center justify-center border-b border-white/[0.03]">
                  <Image
                    src={imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-w-4xl) 100vw"
                    className="object-contain"
                    priority
                  />
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 rounded-full bg-black/75 border border-white/[0.05] px-3 py-1 font-mono text-[10px] text-neutral-400">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>

                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateImage('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-black/60 p-2.5 text-neutral-400 hover:text-white transition-all duration-200 hover:bg-black/80"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => navigateImage('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-black/60 p-2.5 text-neutral-400 hover:text-white transition-all duration-200 hover:bg-black/80"
                        aria-label="Next image"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* Caption Overlay */}
                  {imageCaption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <p className="text-xs font-sans text-neutral-300">{imageCaption}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Text Info */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="font-bricolage text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                    {project.title}
                  </h2>
                  
                  {/* Direct Code / Live links */}
                  <div className="flex items-center space-x-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 border border-white/[0.06] hover:border-white/[0.15] bg-neutral-900/50 hover:bg-neutral-900 text-neutral-300 hover:text-white text-xs font-semibold rounded-full transition-all duration-200 font-sans"
                      >
                        <Github size={14} />
                        <span>Repository</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-semibold rounded-full transition-all duration-200 font-sans"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Tech tags list */}
                <div className="space-y-2">
                  <h3 className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase font-semibold">
                    Core Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-[10px] font-mono tracking-wider text-neutral-300 bg-neutral-900/40 border border-white/[0.04] rounded-full uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
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
