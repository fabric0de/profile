'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const navigation = {
  ko: [
    { name: '홈', href: '/' },
    { name: '소개', href: '/about' },
    { name: '프로젝트', href: '/projects' },
    { name: '블로그', href: '/blog' },
  ],
  en: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
  ],
  ja: [
    { name: 'ホーム', href: '/' },
    { name: 'プロフィール', href: '/about' },
    { name: 'プロジェクト', href: '/projects' },
    { name: 'ブログ', href: '/blog' },
  ],
};

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const t = useTranslations('Common');

  // Extract locale from pathname
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'ko';

  // Navigation with locale support
  const currentNavigation =
    navigation[currentLocale as keyof typeof navigation] || navigation.ko;
  const navigationWithLocale = currentNavigation.map(item => ({
    ...item,
    href: `/${currentLocale}${item.href}`,
  }));

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className='sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>f</span>
            </div>
            <span className='font-bold text-xl text-gray-900 dark:text-white'>
              fabric0de
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navigationWithLocale.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search, Theme Toggle & Mobile Menu Button */}
          <div className='flex items-center space-x-4'>
            {/* Desktop Search Button */}
            <button
              className='hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm text-gray-600 dark:text-gray-400'
              onClick={() => setSearchModalOpen(true)}
            >
              <Search className='h-4 w-4' />
              <span>{t('searchPlaceholder')}</span>
              <kbd className='hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded'>
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <LanguageSwitcher />

            {/* Mobile Search Button */}
            <button
              className='md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
              onClick={() => setSearchModalOpen(true)}
              aria-label='Search'
            >
              <Search className='h-5 w-5' />
            </button>

            <button
              className='md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label='Toggle mobile menu'
            >
              {mobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-200 dark:border-gray-700'>
            <nav className='flex flex-col space-y-2'>
              {navigationWithLocale.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        locale={currentLocale}
      />
    </header>
  );
}
