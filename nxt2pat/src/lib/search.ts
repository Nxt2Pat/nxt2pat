import Fuse from 'fuse.js';

export interface SearchableItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  type: 'project' | 'devlog';
  category: string;
  tags: string[];
}

export function createSearchIndex(items: SearchableItem[]) {
  return new Fuse(items, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'tags', weight: 0.25 },
      { name: 'category', weight: 0.15 },
      { name: 'subtitle', weight: 0.1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });
}
