// 사이트 설정
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'fabric0de',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Full-stack developer passionate about creating elegant solutions and sharing knowledge',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fabric0de.dev',

  // 연락처 정보
  email: process.env.NEXT_PUBLIC_EMAIL || 'hello@fabric0de.dev',
  github: process.env.NEXT_PUBLIC_GITHUB || 'https://github.com/fabric0de',
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN || 'https://linkedin.com/in/fabric0de',

  // 소셜 미디어
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'fabric0de',

  // Analytics
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,

  // 뉴스레터
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL,
};

// 메타데이터 생성
export const generateMetadata = (title?: string, description?: string) => {
  const siteName = siteConfig.name;
  const siteDescription = siteConfig.description;
  const siteUrl = siteConfig.url;

  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description: description || siteDescription,
    openGraph: {
      title: title ? `${title} | ${siteName}` : siteName,
      description: description || siteDescription,
      url: siteUrl,
      siteName,
      locale: 'ko_KR',
      type: 'website',
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
};
