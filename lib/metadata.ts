import { Metadata } from 'next';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateMetadata({
  title = 'fabric0de - Full-Stack Developer',
  description = 'Full-stack developer passionate about creating elegant solutions and sharing knowledge through code and writing.',
  image = 'https://fabric0de.dev/og-image.jpg',
  url = 'https://fabric0de.dev',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = ['fabric0de'],
  tags = [],
}: GenerateMetadataProps = {}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords: [
      'developer',
      'full-stack',
      'react',
      'nextjs',
      'typescript',
      'blog',
      'portfolio',
      ...tags,
    ],
    authors: authors.map(author => ({ name: author })),
    creator: 'fabric0de',
    openGraph: {
      type,
      locale: 'en_US',
      url,
      title,
      description,
      siteName: 'fabric0de',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fabric0de',
      images: [image],
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
    alternates: {
      canonical: url,
    },
  };

  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      tags,
    };
  }

  return metadata;
}
