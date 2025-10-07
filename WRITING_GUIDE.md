# 📝 글 작성 가이드

## 🚀 빠른 시작

### 새 글 작성하기

```bash
# 대화형으로 새 글 작성
pnpm new-post

# 한국어 글 바로 작성
pnpm new-post:ko

# 영어 글 바로 작성
pnpm new-post:en
```

## 📁 파일 구조

```
content/
├── blog/
│   ├── ko/           # 한국어 글
│   │   ├── post-1.mdx
│   │   └── post-2.mdx
│   └── en/           # 영어 글
│       ├── post-1.mdx
│       └── post-2.mdx
└── projects/
    ├── ko/           # 한국어 프로젝트
    └── en/           # 영어 프로젝트
```

## ✍️ MDX 파일 작성법

### Frontmatter (필수)

```yaml
---
title: '글 제목'
date: '2024-01-01'
description: '글 설명'
tags: ['태그1', '태그2']
published: true
locale: 'ko' # 또는 "en"
---
```

### 마크다운 + JSX

````mdx
# 제목

일반 마크다운 문법을 사용할 수 있습니다.

## 코드 블록

```js
const hello = 'world';
console.log(hello);
```
````

## React 컴포넌트 사용

<CustomComponent prop="value" />

## 이미지

![이미지 설명](/path/to/image.jpg)

````

## 🏷️ 태그 시스템

### 추천 태그들
- **기술**: `nextjs`, `react`, `typescript`, `tailwind`
- **주제**: `tutorial`, `tips`, `review`, `project`
- **난이도**: `beginner`, `intermediate`, `advanced`

## 🌐 다국어 지원

### 같은 글의 다른 언어 버전
```bash
# 한국어 버전
content/blog/ko/my-post.mdx

# 영어 버전
content/blog/en/my-post.mdx
````

**주의사항:**

- 같은 `slug`를 사용하세요
- `locale` 필드를 올바르게 설정하세요
- 내용은 번역하되 구조는 유지하세요

## 📸 이미지 사용법

### 1. public 폴더 사용

```
public/
└── images/
    └── my-post/
        ├── hero.jpg
        └── diagram.png
```

```mdx
![Hero Image](/images/my-post/hero.jpg)
```

### 2. 외부 이미지

```mdx
![External Image](https://images.unsplash.com/photo-xxx)
```

## 🔧 유용한 명령어

```bash
# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 린트 검사
pnpm lint

# 새 글 작성
pnpm new-post
```

## 💡 팁

1. **미리보기**: `pnpm dev`로 실시간 미리보기
2. **SEO**: `description`을 명확하게 작성
3. **태그**: 관련성 높은 태그 3-5개 사용
4. **이미지**: 적절한 alt 텍스트 작성
5. **코드**: 구문 강조를 위해 언어 지정

## 🚨 주의사항

- 파일명은 `kebab-case` 사용
- `locale` 필드는 반드시 `ko` 또는 `en`
- `published: false`로 설정하면 공개되지 않음
- 이미지 경로는 `/`로 시작 (public 폴더 기준)
