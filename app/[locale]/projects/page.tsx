'use client';

import { Layout } from '@/components/Layout';
import { ProjectCard } from '@/components/ProjectCard';
import { getSortedProjects } from '@/lib/content';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { PageProps } from '@/lib/types';

export default function ProjectsPage({ params }: PageProps) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'ko';

  const projects = getSortedProjects(currentLocale);
  const t = useTranslations('Projects');

  return (
    <Layout>
      <div className='py-16 bg-white dark:bg-gray-900'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('title')}
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              {t('description')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map((project, index) => (
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

          {projects.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                {t('noProjectsFound')}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
