'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const languages = [
  { code: 'ko', name: '한국어', nativeName: '한국어' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('ko');
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Common');

  useEffect(() => {
    // Extract locale from pathname
    const segments = pathname.split('/');
    const locale = segments[1] || 'ko';
    setCurrentLocale(locale);
  }, [pathname]);

  const changeLanguage = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage =
    languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
      >
        <Globe className='h-4 w-4' />
        <span className='text-sm font-medium'>
          {currentLanguage.nativeName}
        </span>
        <ChevronDown className='h-3 w-3' />
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50'>
          <div className='py-1'>
            {languages.map(language => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  currentLocale === language.code
                    ? 'text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className='flex flex-col'>
                  <span className='font-medium'>{language.nativeName}</span>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    {language.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
