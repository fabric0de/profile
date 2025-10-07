import { Layout } from '@/components/Layout';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getProjectBySlug, getSortedProjects } from '@/lib/content';
import { ProjectDetailPageProps } from '@/lib/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

export async function generateStaticParams() {
  const projects = getSortedProjects();
  return projects.map(project => ({
    slug: project.slug,
    locale: project.locale,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug, params.locale);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug, params.locale);

  if (!project) {
    notFound();
  }

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <Layout>
      <div className='py-16 bg-white dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Back Button */}
          <Link
            href={`/${params.locale}/projects`}
            className='inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mb-8'
          >
            <ArrowLeft className='h-4 w-4' />
            <span>
              <BackToProjectsText />
            </span>
          </Link>

          {/* Project Header */}
          <div className='mb-12'>
            {project.image && (
              <div className='relative h-64 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-8'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover'
                />
              </div>
            )}

            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8'>
              <div>
                <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                  {project.title}
                </h1>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-6'>
                  {project.description}
                </p>
              </div>
              <div className='flex flex-col sm:flex-row lg:flex-col space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-4'>
                {project.github && (
                  <a
                    href={project.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn-secondary inline-flex items-center justify-center space-x-2'
                  >
                    <Github className='h-4 w-4' />
                    <span>View Code</span>
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn-primary inline-flex items-center justify-center space-x-2'
                  >
                    <ExternalLink className='h-4 w-4' />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className='flex flex-wrap gap-2'>
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className='px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Content */}
          <div className='prose-custom max-w-none'>
            <MDXContent />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Client component for translations
function BackToProjectsText() {
  const t = useTranslations('Common');
  return t('backToProjects');
}
