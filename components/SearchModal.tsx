'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, FileText, FolderOpen, ArrowRight } from 'lucide-react';
import { getSortedPosts, getSortedProjects } from '@/lib/content';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

interface SearchResult {
  id: string;
  type: 'post' | 'project';
  title: string;
  description: string;
  url: string;
  tags?: string[];
  date?: string;
}

export function SearchModal({ isOpen, onClose, locale }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Common');

  const posts = getSortedPosts(locale);
  const projects = getSortedProjects(locale);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const allResults: SearchResult[] = [
      ...posts.map(post => ({
        id: post.slug,
        type: 'post' as const,
        title: post.title,
        description: post.description,
        url: post.url,
        tags: post.tags,
        date: post.date,
      })),
      ...projects.map(project => ({
        id: project.slug,
        type: 'project' as const,
        title: project.title,
        description: project.description,
        url: project.url,
        tags: project.stack,
      })),
    ];

    return allResults
      .filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tags?.some(tag =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      )
      .slice(0, 8);
  }, [query, posts, projects]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = document.querySelector(
      `[data-search-index="${selectedIndex}"]`
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault();
      window.location.href = searchResults[selectedIndex].url;
      handleClose();
    }
  };

  // Handle global keyboard events
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleGlobalKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling

      // Add class to body to indicate modal is open
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not child elements
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[99999] bg-black/40 flex items-start justify-center pt-20'
        style={{ backdropFilter: 'blur(8px)' }}
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='w-full max-w-3xl mx-4'
          onClick={e => e.stopPropagation()}
        >
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
            {/* Search Input */}
            <div className='flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <Search className='h-5 w-5 text-gray-400 mr-3' />
              <input
                ref={inputRef}
                type='text'
                placeholder={t('searchPlaceholder')}
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className='flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg'
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className='ml-3 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
                >
                  <X className='h-4 w-4 text-gray-400' />
                </button>
              )}
            </div>

            {/* Search Results */}
            <div className='max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'>
              {query ? (
                searchResults.length > 0 ? (
                  <div className='py-2'>
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        data-search-index={index}
                      >
                        <Link
                          href={result.url}
                          onClick={handleClose}
                          className={`block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            index === selectedIndex
                              ? 'bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-200 dark:ring-primary-800'
                              : ''
                          }`}
                        >
                          <div className='flex items-start space-x-3'>
                            <div className='flex-shrink-0 mt-1'>
                              {result.type === 'post' ? (
                                <FileText className='h-5 w-5 text-blue-500' />
                              ) : (
                                <FolderOpen className='h-5 w-5 text-green-500' />
                              )}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center space-x-2 mb-1'>
                                <h3 className='font-medium text-gray-900 dark:text-white truncate'>
                                  {result.title}
                                </h3>
                                <span className='text-xs text-gray-500 dark:text-gray-400 uppercase'>
                                  {result.type}
                                </span>
                              </div>
                              <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2'>
                                {result.description}
                              </p>
                              {result.tags && result.tags.length > 0 && (
                                <div className='flex flex-wrap gap-1'>
                                  {result.tags.slice(0, 3).map(tag => (
                                    <span
                                      key={tag}
                                      className='px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full'
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <ArrowRight className='h-4 w-4 text-gray-400 flex-shrink-0' />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className='px-6 py-12 text-center'>
                    <Search className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                      {t('noResults')}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      {t('noResultsFor')} "{query}"
                    </p>
                  </div>
                )
              ) : (
                <div className='px-6 py-12 text-center'>
                  <Search className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                    {t('searchPosts')}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {t('searchDescription')}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className='px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                <div className='flex items-center space-x-4'>
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
                <span>⌘K</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
