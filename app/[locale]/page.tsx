'use client';

import { Layout } from '@/components/Layout';
import { PostCard } from '@/components/PostCard';
import { ProjectCard } from '@/components/ProjectCard';
import { getFeaturedPosts, getFeaturedProjects } from '@/lib/content';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { PageProps } from '@/lib/types';

export default function HomePage({ params }: PageProps) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'ko';

  const featuredPosts = getFeaturedPosts(3, currentLocale);
  const featuredProjects = getFeaturedProjects(3, currentLocale);
  const t = useTranslations('Home');

  return (
    <Layout>
      <div className='min-h-screen bg-white dark:bg-gray-900'>
        {/* Hero Section */}
        <section className='relative py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden'>
          <div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10'>
            <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-6'>
              {t('title')}
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto'>
              {t('subtitle')}
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-12'>
              <Link
                href={`/${currentLocale}/projects`}
                className='text-base font-normal text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150'
              >
                {t('viewProjects')}
              </Link>
              <Link
                href={`/${currentLocale}/blog`}
                className='text-base font-normal text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150'
              >
                {t('readBlog')}
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className='py-12'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                {t('latestPosts')}
              </h2>
              <p className='text-base text-gray-600 dark:text-gray-300'>
                {t('postsSubtitle')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
              {featuredPosts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  href={post.url}
                  delay={index * 0.1}
                />
              ))}
            </div>

            <div className='text-center'>
              <Link
                href={`/${currentLocale}/blog`}
                className='text-sm font-normal text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150'
              >
                {t('viewAllPosts')}
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className='py-12 bg-gray-50 dark:bg-gray-800'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                {t('featuredProjects')}
              </h2>
              <p className='text-base text-gray-600 dark:text-gray-300'>
                {t('projectsSubtitle')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  github={project.github}
                  live={project.live}
                  stack={project.stack}
                  href={project.url}
                  featured={project.featured}
                  delay={index * 0.1}
                />
              ))}
            </div>

            <div className='text-center'>
              <Link
                href={`/${currentLocale}/projects`}
                className='text-sm font-normal text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150'
              >
                {t('viewAllProjects')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
