import { PostCard } from './PostCard';
import { getRelatedPosts } from '@/lib/content';

interface RelatedPostsProps {
  currentSlug: string;
  className?: string;
}

export function RelatedPosts({
  currentSlug,
  className = '',
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
        Related Posts
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {relatedPosts.map((post, index) => (
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
    </div>
  );
}
