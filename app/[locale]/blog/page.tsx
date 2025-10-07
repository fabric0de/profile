'use client';

import { Layout } from '@/components/Layout';
import { PostCard } from '@/components/PostCard';
import { TagFilter } from '@/components/TagFilter';
import { getSortedPosts, getPostsByTag } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BlogPageProps } from '@/lib/types';

export default function BlogPage({ params }: BlogPageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const t = useTranslations('Blog');

  const allPosts = getSortedPosts(params.locale);
  const filteredPosts = selectedTag
    ? getPostsByTag(selectedTag, params.locale)
    : allPosts;

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

          {/* Tag Filter */}
          <div className='mb-12'>
            <TagFilter
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
              className='justify-center'
            />
          </div>

          {/* Posts Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
            {filteredPosts.map((post, index) => (
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

          {filteredPosts.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                {t('noPostsFound')}
              </p>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className='bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('newsletterTitle')}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              {t('newsletterDescription')}
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder={t('emailPlaceholder')}
                className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              />
              <button className='btn-primary w-full sm:w-auto'>
                {t('subscribeButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
