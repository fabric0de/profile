import { Layout } from '@/components/Layout';
import { RelatedPosts } from '@/components/RelatedPosts';
import { getPostBySlug, getSortedPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useTranslations } from 'next-intl';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map(post => ({
    locale: post.locale,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug, params.locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug, params.locale);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);
  const isKorean = params.locale === 'ko';

  return (
    <Layout>
      <div className='py-16 bg-white dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Back Button */}
          <Link
            href={`/${params.locale}/blog`}
            className='inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mb-8'
          >
            <ArrowLeft className='h-4 w-4' />
            <span>
              <BackToBlogText />
            </span>
          </Link>

          {/* Post Header */}
          <div className='mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-6'>
              {post.title}
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>
              {post.description}
            </p>

            <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8'>
              <div className='flex items-center space-x-2'>
                <Calendar className='h-4 w-4' />
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='h-4 w-4' />
                <span>5 min read</span>
              </div>
            </div>

            <div className='flex flex-wrap gap-2'>
              {post.tags?.map(tag => (
                <span
                  key={tag}
                  className='inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full'
                >
                  <Tag className='h-3 w-3' />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className='prose-custom max-w-none'>
            <MDXContent />
          </div>

          {/* Related Posts */}
          <div className='mt-16'>
            <RelatedPosts currentSlug={post.slug} />
          </div>

          {/* Author Bio */}
          <div className='mt-16 pt-8 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-start space-x-4'>
              <div className='w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center'>
                <span className='text-2xl font-bold text-primary-600 dark:text-primary-400'>
                  f
                </span>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  fabric0de
                </h3>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>
                  {isKorean
                    ? '우아한 솔루션을 만들고 코드와 글을 통해 지식을 공유하는 것에 열정을 가진 풀스택 개발자입니다.'
                    : 'Full-stack developer passionate about creating elegant solutions and sharing knowledge through code and writing.'}
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
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Client component for translations
function BackToBlogText() {
  const t = useTranslations('Common');
  return t('backToBlog');
}
