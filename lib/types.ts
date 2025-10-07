// 공통 타입 정의

// Locale 타입
export type Locale = 'ko' | 'en';

// 페이지 Props 타입
export interface PageProps {
  params: {
    locale: string;
  };
}

// 블로그 페이지 Props 타입
export interface BlogPageProps {
  params: {
    locale: string;
  };
}

// 블로그 상세 페이지 Props 타입
export interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// 프로젝트 페이지 Props 타입
export interface ProjectPageProps {
  params: {
    locale: string;
  };
}

// 프로젝트 상세 페이지 Props 타입
export interface ProjectDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// 소셜 링크 타입
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 네비게이션 아이템 타입
export interface NavigationItem {
  name: string;
  href: string;
}

// 메타데이터 타입
export interface MetadataProps {
  title?: string;
  description?: string;
  locale?: string;
}

// 공통 컴포넌트 Props 타입
export interface BaseCardProps {
  title: string;
  description: string;
  href: string;
  delay?: number;
}

// 애니메이션 Props 타입
export interface AnimationProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

// 검색 Props 타입
export interface SearchProps {
  className?: string;
  onClose?: () => void;
}

// 태그 필터 Props 타입
export interface TagFilterProps {
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  tags: string[];
  className?: string;
}
