import { allPosts, allProjects, Post, Project } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export function getSortedPosts(locale?: string): Post[] {
  return allPosts
    .filter(post => post.published && (!locale || post.locale === locale))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getAllPosts(locale?: string): Post[] {
  return allPosts
    .filter(post => post.published && (!locale || post.locale === locale))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getFeaturedPosts(limit = 2, locale?: string): Post[] {
  return getSortedPosts(locale).slice(0, limit);
}

export function getPostBySlug(slug: string, locale?: string): Post | undefined {
  return allPosts.find(
    post => post.slug === slug && (!locale || post.locale === locale)
  );
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return getSortedPosts()
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.tags?.some(tag => currentPost.tags?.includes(tag)))
    .slice(0, limit);
}

export function getSortedProjects(locale?: string): Project[] {
  return allProjects
    .filter(project => !locale || project.locale === locale)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
}

export function getAllProjects(locale?: string): Project[] {
  return allProjects
    .filter(project => !locale || project.locale === locale)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
}

export function getFeaturedProjects(limit = 2, locale?: string): Project[] {
  return getSortedProjects(locale).slice(0, limit);
}

export function getProjectBySlug(
  slug: string,
  locale?: string
): Project | undefined {
  return allProjects.find(
    project => project.slug === slug && (!locale || project.locale === locale)
  );
}

export function getPostsByTag(tag: string, locale?: string): Post[] {
  return getSortedPosts(locale).filter(post => post.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const tags = allPosts
    .filter(post => post.published)
    .flatMap(post => post.tags || []);

  return Array.from(new Set(tags)).sort();
}
