export interface ProjectImage {
  src: string;
  caption: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  images: ProjectImage[];
  technologies: string[];
  github?: string;
  live?: string;
  featured: boolean;
}
