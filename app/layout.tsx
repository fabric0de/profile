import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'fabric0de - Full-Stack Developer',
    template: '%s | fabric0de',
  },
  description:
    'Full-stack developer passionate about creating elegant solutions and sharing knowledge through code and writing.',
  keywords: [
    'developer',
    'full-stack',
    'react',
    'nextjs',
    'typescript',
    'blog',
  ],
  authors: [{ name: 'fabric0de' }],
  creator: 'fabric0de',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fabric0de.dev',
    title: 'fabric0de - Full-Stack Developer',
    description:
      'Full-stack developer passionate about creating elegant solutions and sharing knowledge through code and writing.',
    siteName: 'fabric0de',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fabric0de - Full-Stack Developer',
    description:
      'Full-stack developer passionate about creating elegant solutions and sharing knowledge through code and writing.',
    creator: '@fabric0de',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
