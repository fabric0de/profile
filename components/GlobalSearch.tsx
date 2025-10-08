'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchModal } from './SearchModal';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Extract locale from pathname
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'ko';

  // Keyboard shortcut for search (Cmd+K / Ctrl+K) and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    const handleOpenSearch = () => {
      setIsOpen(true);
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openSearch', handleOpenSearch);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openSearch', handleOpenSearch);
    };
  }, []);

  return (
    <SearchModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      locale={currentLocale}
    />
  );
}
