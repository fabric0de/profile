'use client';

import { Layout } from '@/components/Layout';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { PageProps } from '@/lib/types';

export default function AboutPage({ params }: PageProps) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'ko';

  const t = useTranslations('About');

  return (
    <Layout>
      <div className='py-16 bg-white dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('title')}
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              {t('subtitle')}
            </p>
          </div>

          {/* Profile Section */}
          <div className='flex flex-col lg:flex-row items-center gap-12 mb-16'>
            <div className='flex-shrink-0'>
              <div className='w-64 h-64 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center'>
                <span className='text-8xl font-bold text-primary-600 dark:text-primary-400'>
                  f
                </span>
              </div>
            </div>
            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                {t('name')}
              </h2>
              <p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
                {t('description')}
              </p>
              <div className='flex space-x-4'>
                <a
                  href='https://github.com/fabric0de'
                  className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                >
                  GitHub
                </a>
                <a
                  href='https://twitter.com/fabric0de'
                  className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className='mb-16'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center'>
              {t('techStack')}
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {[
                { name: 'Next.js', level: 90 },
                { name: 'React', level: 95 },
                { name: 'TypeScript', level: 85 },
                { name: 'Node.js', level: 80 },
                { name: 'Python', level: 75 },
                { name: 'PostgreSQL', level: 70 },
                { name: 'AWS', level: 65 },
                { name: 'Docker', level: 60 },
              ].map(skill => (
                <div key={skill.name} className='text-center'>
                  <div className='w-20 h-20 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center'>
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                      {skill.name}
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                    <div
                      className='bg-primary-600 h-2 rounded-full transition-all duration-1000'
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                    {skill.level}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className='mb-16'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center'>
              {t('experience')}
            </h2>
            <div className='space-y-8'>
              <div className='border-l-4 border-primary-500 pl-6'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                  {t('fullStackDeveloper')}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 mb-2'>
                  {t('experiencePeriod')}
                </p>
                <p className='text-gray-600 dark:text-gray-300'>
                  {t('experienceDescription')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className='text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('getInTouch')}
            </h2>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              {t('getInTouchSubtitle')}
            </p>
            <a
              href='mailto:contact@fabric0de.dev'
              className='btn-primary inline-flex items-center space-x-2'
            >
              <span>{t('sendEmail')}</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
