'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const socialLinks = [
  {
    name: 'GitHub',
    href: siteConfig.github,
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: siteConfig.linkedin,
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
];

export function Footer() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'ko';

  const isKorean = currentLocale === 'ko';

  const quickLinks = isKorean
    ? [
        { name: '소개', href: '/about' },
        { name: '프로젝트', href: '/projects' },
        { name: '블로그', href: '/blog' },
      ]
    : [
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
      ];

  return (
    <footer className='bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <Link
              href={`/${currentLocale}`}
              className='flex items-center space-x-2'
            >
              <div className='w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>f</span>
              </div>
              <span className='font-bold text-xl text-gray-900 dark:text-white'>
                fabric0de
              </span>
            </Link>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              {isKorean
                ? '우아한 솔루션을 만들고 지식을 공유하는 것에 열정을 가진 풀스택 개발자입니다.'
                : 'Full-stack developer passionate about creating elegant solutions and sharing knowledge.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-gray-900 dark:text-white'>
              {isKorean ? '빠른 링크' : 'Quick Links'}
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={`/${currentLocale}${link.href}`}
                    className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-200'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-gray-900 dark:text-white'>
              {isKorean ? '연결' : 'Connect'}
            </h3>
            <div className='flex space-x-4'>
              {socialLinks.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200'
                  aria-label={item.name}
                >
                  <item.icon className='h-5 w-5 text-gray-600 dark:text-gray-400' />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <p className='text-center text-gray-600 dark:text-gray-400 text-sm'>
            © {new Date().getFullYear()} fabric0de. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
