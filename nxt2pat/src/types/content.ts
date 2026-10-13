export type ProjectCategory = 'embedded' | 'tauri' | 'web' | 'ml' | 'game';
export type ProjectStatus = 'production' | 'active' | 'archived' | 'concept';

export interface GalleryItem {
  url: string;
  caption?: string;
  alt?: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  tagline: string;
  summary?: string;
  imageUrl?: string;
  coverImage?: string;
  gallery?: (string | GalleryItem)[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  year: number;
  techStack: string[];
  aiUsage?: string;
  aiLevel?: string;
  githubUrl?: string;
  demoUrl?: string;
  hardwareSpec?: string;
  metrics?: {
    latency?: string;
    footprint?: string;
    efficiency?: string;
  };
}

export interface Project extends Omit<ProjectFrontmatter, 'gallery'> {
  gallery?: GalleryItem[];
  content: string;
  readingTimeMinutes: number;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  summary?: string;
  imageUrl?: string;
  coverImage?: string;
  gallery?: (string | GalleryItem)[];
  date: string; // ISO YYYY-MM-DD
  category: string;
  tags: string[];
  aiUsage?: string;
  readingTimeMinutes?: number;
  featured: boolean;
  published: boolean;
}

export interface Post extends Omit<PostFrontmatter, 'gallery'> {
  gallery?: GalleryItem[];
  content: string;
  readingTimeMinutes: number;
}

export interface HardwareDevice {
  name: string;
  codename: string;
  type: string;
  cpu: string;
  ram: string;
  gpu: string;
  os: string;
  role: string;
  status?: string;
}

export interface ProfileData {
  name: string;
  thaiName?: string;
  school?: string;
  handle: string;
  headline: string;
  bio: string;
  location: string;
  timezone: string;
  statusText: string;
  hardwareCreed: {
    philosophy: string;
    primaryMachine?: string;
    gpu?: string;
    constraints?: string;
    primaryFocus?: string;
    keyProjects?: string;
  };
  hardwareFleet?: HardwareDevice[];
  socialLinks: {
    github: string;
    email?: string;
    gmail?: string;
    itchio?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
}
