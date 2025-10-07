'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { getSortedPosts } from '@/lib/content';
import Link from 'next/link';

interface SearchBarProps {
  onClose?: () => void;
  className?: string;
}

export function SearchBar({ onClose, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const posts = getSortedPosts();

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    return posts
      .filter(
        post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.description.toLowerCase().includes(query.toLowerCase()) ||
          post.tags?.some(tag =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      )
      .slice(0, 5);
  }, [query, posts]);

  const handleClose = () => {
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className={`relative ${className}`}>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
        <input
          type='text'
          placeholder='Search posts...'
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className='w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && query && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto'>
          {filteredPosts.length > 0 ? (
            <div className='p-2'>
              {filteredPosts.map(post => (
                <Link
                  key={post.slug}
                  href={post.url}
                  onClick={handleClose}
                  className='block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200'
                >
                  <h3 className='font-medium text-gray-900 dark:text-white mb-1'>
                    {post.title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className='p-4 text-center text-gray-500 dark:text-gray-400'>
              No posts found for "{query}"
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      {isOpen && <div className='fixed inset-0 z-40' onClick={handleClose} />}
    </div>
  );
}
