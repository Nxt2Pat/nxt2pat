import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { readingTime } from '@/lib/utils';
import type { Project, ProjectFrontmatter, Post, PostFrontmatter, ProfileData, GalleryItem } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const PROFILE_FILE = path.join(CONTENT_DIR, 'profile.json');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const VALID_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif']);

/**
 * Resolves cover image from frontmatter or by auto-detecting cover image in relativeDir
 */
export function resolveCoverImage(
  explicitUrl?: string,
  relativeDir?: string
): string | undefined {
  if (explicitUrl) return explicitUrl;

  if (relativeDir) {
    const diskDir = path.join(PUBLIC_DIR, relativeDir);
    if (fs.existsSync(diskDir) && fs.statSync(diskDir).isDirectory()) {
      const files = fs.readdirSync(diskDir);
      const coverFile = files.find((f) => {
        const ext = path.extname(f).toLowerCase();
        const base = path.basename(f, ext).toLowerCase();
        return (base === 'cover' || base === 'thumbnail' || base === 'hero') && VALID_IMAGE_EXTS.has(ext);
      });

      if (coverFile) {
        return ('/' + path.join(relativeDir, coverFile)).replace(/\\/g, '/');
      }
    }
  }

  return undefined;
}

/**
 * Resolves gallery items from frontmatter or by auto-scanning the image directory
 */
export function resolveGallery(
  rawGallery?: (string | GalleryItem)[],
  relativeDir?: string
): GalleryItem[] {
  // 1. Explicit gallery from frontmatter
  if (rawGallery && Array.isArray(rawGallery) && rawGallery.length > 0) {
    return rawGallery.map((item, index) => {
      if (typeof item === 'string') {
        return {
          url: item,
          alt: `Gallery image ${index + 1}`,
          caption: undefined,
        };
      }
      return {
        url: item.url,
        alt: item.alt || item.caption || `Gallery image ${index + 1}`,
        caption: item.caption,
      };
    });
  }

  // 2. Auto-discover from public folder
  if (relativeDir) {
    const diskDir = path.join(PUBLIC_DIR, relativeDir);
    if (fs.existsSync(diskDir) && fs.statSync(diskDir).isDirectory()) {
      const files = fs.readdirSync(diskDir);
      const imageFiles = files
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return VALID_IMAGE_EXTS.has(ext) && !file.startsWith('.');
        })
        .filter((file) => {
          const base = path.basename(file, path.extname(file)).toLowerCase();
          return base !== 'cover' && base !== 'thumbnail' && base !== 'hero';
        })
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      if (imageFiles.length > 0) {
        return imageFiles.map((file, index) => {
          const baseName = path.basename(file, path.extname(file));
          // Strip leading numbering e.g. "01-", "1-00", "02_"
          const textPart = baseName
            .replace(/^(\d+[-_])+(\d+)?[-_]?/, '')
            .replace(/[-_]/g, ' ')
            .trim();
          const hasMeaningfulText = textPart.length > 0 && !/^\d+$/.test(textPart);

          const caption = hasMeaningfulText
            ? textPart.charAt(0).toUpperCase() + textPart.slice(1)
            : `ภาพประกอบที่ ${index + 1}`;

          const normalizedUrl = ('/' + path.join(relativeDir, file)).replace(/\\/g, '/');

          return {
            url: normalizedUrl,
            alt: hasMeaningfulText ? textPart : `ภาพประกอบที่ ${index + 1}`,
            caption,
          };
        });
      }
    }
  }

  return [];
}

/**
 * Read and parse all Markdown project case studies
 */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const fileNames = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md'));

  const projects: Project[] = fileNames
    .map((fileName) => {
      const fullPath = path.join(PROJECTS_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const frontmatter = data as ProjectFrontmatter;
      const slug = frontmatter.slug || fileName.replace(/\.md$/, '');
      const projectDir = path.join('images', 'projects', slug);
      const coverImage = resolveCoverImage(frontmatter.imageUrl || frontmatter.coverImage, projectDir);
      const gallery = resolveGallery(frontmatter.gallery, projectDir);

      return {
        ...frontmatter,
        aiUsage: frontmatter.aiUsage || frontmatter.aiLevel,
        imageUrl: coverImage,
        slug,
        gallery,
        content,
        readingTimeMinutes: readingTime(content),
      };
    })
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.year || 0) - (a.year || 0);
    });

  return projects;
}

/**
 * Get single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Read and parse all Markdown devlog posts
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const fileNames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  const posts: Post[] = fileNames
    .map((fileName) => {
      const fullPath = path.join(POSTS_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const frontmatter = data as PostFrontmatter;
      const slug = frontmatter.slug || fileName.replace(/\.md$/, '');
      const blogDir = path.join('images', 'blog', slug);
      const postsDir = path.join('images', 'posts', slug);
      const coverImage =
        resolveCoverImage(frontmatter.imageUrl || frontmatter.coverImage, blogDir) ||
        resolveCoverImage(frontmatter.imageUrl || frontmatter.coverImage, postsDir);

      const gallery =
        resolveGallery(frontmatter.gallery, blogDir).length > 0
          ? resolveGallery(frontmatter.gallery, blogDir)
          : resolveGallery(frontmatter.gallery, postsDir);

      return {
        ...frontmatter,
        imageUrl: coverImage,
        slug,
        gallery,
        content,
        readingTimeMinutes: frontmatter.readingTimeMinutes || readingTime(content),
      };
    })
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get single devlog post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Load profile metadata
 */
export function getProfileData(): ProfileData {
  if (!fs.existsSync(PROFILE_FILE)) {
    return {
      name: 'Nxt2Pat',
      handle: '@nxt2pat',
      headline: 'Full-Stack Systems & Creative Software Engineer',
      bio: 'Crafting tangible embedded telemetry, lightweight desktop environments, and zero-database web software.',
      location: 'Thailand',
      timezone: 'UTC+7 (Bangkok)',
      statusText: 'Operational · Crafting PWA Systems',
      hardwareCreed: {
        philosophy: 'CPU-first efficiency and local-first resilience over cloud bloat.',
        primaryMachine: 'AMD Ryzen 5 + Radeon RX 580 (8GB VRAM)',
        gpu: 'Polaris 20 (gfx803) · Lean compute baseline',
        constraints: 'Targeting sub-100ms response times and offline capability everywhere.',
      },
      socialLinks: {
        github: 'https://github.com/nxt2pat',
        email: 'mailto:contact@nxt2pat.dev',
      },
      skills: [],
    };
  }

  const raw = fs.readFileSync(PROFILE_FILE, 'utf8');
  return JSON.parse(raw) as ProfileData;
}
