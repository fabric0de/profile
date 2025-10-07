import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content';
import { getAllProjects } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabric0de.dev';
  const locales = ['ko', 'en', 'ja'];

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];

  // 다국어 기본 페이지들
  const localizedPages = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]);

  const blogPages = locales.flatMap(async locale => {
    const posts = await getAllPosts(locale);
    return posts.map((post: any) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  });

  const projectPages = locales.flatMap(async locale => {
    const projects = await getAllProjects(locale);
    return projects.map((project: any) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  });

  const [blogPagesResolved, projectPagesResolved] = await Promise.all([
    Promise.all(blogPages),
    Promise.all(projectPages),
  ]);

  const allBlogPages = blogPagesResolved.flat();
  const allProjectPages = projectPagesResolved.flat();

  return [
    ...staticPages,
    ...localizedPages,
    ...allBlogPages,
    ...allProjectPages,
  ];
}
