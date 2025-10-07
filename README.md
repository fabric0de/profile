# 🚀 fabric0de Blog

Next.js 14 + TypeScript + TailwindCSS + Contentlayer로 구축된 다국어 블로그입니다.

## ✨ 주요 기능

- 🌐 **다국어 지원** (한국어/영어)
- 📝 **MDX 기반** 글 작성
- 🎨 **다크/라이트 모드**
- 📱 **반응형 디자인**
- ⚡ **빠른 로딩** (Next.js 14)
- 🔍 **SEO 최적화**
- 🏷️ **자동 태그 생성**

## 🚀 빠른 시작

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 배포

자세한 배포 방법은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

```bash
# GitHub + Vercel 배포
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### 새 글 작성

```bash
# 대화형으로 새 글 작성
pnpm new-post

# 한국어 글 바로 작성
pnpm new-post:ko

# 영어 글 바로 작성
pnpm new-post:en
```

### 자동 태그 생성

```bash
# 특정 글에 자동 태그 추가
pnpm auto-tags content/blog/ko/my-post.mdx
```

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # 다국어 라우팅
│   ├── globals.css        # 전역 스타일
│   └── layout.tsx         # 루트 레이아웃
├── components/            # React 컴포넌트
├── content/              # MDX 콘텐츠
│   ├── blog/
│   │   ├── ko/           # 한국어 글
│   │   └── en/           # 영어 글
│   └── projects/
├── lib/                  # 유틸리티 함수
├── messages/             # 번역 파일
├── scripts/              # 자동화 스크립트
└── i18n/                 # 국제화 설정
```

## 📝 글 작성 가이드

자세한 글 작성 방법은 [WRITING_GUIDE.md](./WRITING_GUIDE.md)를 참고하세요.

### 빠른 글 작성

1. `pnpm new-post` 실행
2. 제목, 설명, 태그 입력
3. MDX 파일 편집
4. `pnpm dev`로 미리보기

## 🛠️ 사용된 기술

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Content**: Contentlayer + MDX
- **i18n**: next-intl
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

- **Website**: [fabric0de.dev](https://fabric0de.dev)
- **Email**: hello@fabric0de.dev
- **GitHub**: [@fabric0de](https://github.com/fabric0de)
