# 🚀 배포 가이드

## GitHub + Vercel 배포

### 1. GitHub 저장소 생성

1. GitHub에서 새 저장소 생성
2. 저장소 이름: `fabric0de-blog` (또는 원하는 이름)
3. Public 또는 Private 선택

### 2. 로컬 Git 설정

```bash
# Git 초기화
git init

# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/fabric0de-blog.git

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Next.js blog with i18n support"

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3. Vercel 배포

1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. 설정 확인:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `pnpm build` (자동 감지)
   - **Output Directory**: `.next` (자동 감지)

### 4. 환경 변수 설정

Vercel 대시보드에서 Environment Variables 추가:

```bash
# 필수 환경 변수
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=fabric0de
NEXT_PUBLIC_EMAIL=your-email@example.com
NEXT_PUBLIC_GITHUB=https://github.com/your-username
NEXT_PUBLIC_TWITTER=https://twitter.com/your-handle
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/in/your-profile

# 선택사항
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics
NEXT_PUBLIC_NEWSLETTER_URL=https://your-newsletter.com
```

### 5. 도메인 설정 (선택사항)

1. Vercel 대시보드 → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정:
   - A 레코드: `76.76.19.61`
   - CNAME: `cname.vercel-dns.com`

### 6. 자동 배포 확인

- GitHub에 푸시할 때마다 자동 배포
- Pull Request 생성 시 Preview 배포
- Production 브랜치: `main`

## 🔧 배포 후 설정

### 1. Google Analytics 설정

```bash
# 환경 변수에 GA ID 추가
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. 뉴스레터 설정

```bash
# 환경 변수에 뉴스레터 URL 추가
NEXT_PUBLIC_NEWSLETTER_URL=https://your-newsletter.com
```

### 3. SEO 최적화

- `robots.txt` 자동 생성됨
- `sitemap.xml` 자동 생성됨
- RSS 피드 자동 생성됨

## 📝 글 작성 및 배포

### 새 글 작성

```bash
# 한국어 글
pnpm new-post:ko

# 영어 글
pnpm new-post:en
```

### 자동 태그 생성

```bash
pnpm auto-tags content/blog/ko/my-post.mdx
```

### 배포

```bash
# 변경사항 커밋 및 푸시
git add .
git commit -m "Add new post: My New Post"
git push origin main
```

## 🚨 문제 해결

### 빌드 에러

- `pnpm build` 로컬에서 테스트
- Vercel 로그 확인

### 환경 변수 문제

- Vercel 대시보드에서 환경 변수 확인
- 재배포 실행

### 도메인 문제

- DNS 설정 확인
- SSL 인증서 대기 (최대 24시간)

## 📊 성능 모니터링

- Vercel Analytics 사용
- Google Analytics 연동
- Core Web Vitals 모니터링

## 🔄 업데이트

### 의존성 업데이트

```bash
pnpm update
git add package.json pnpm-lock.yaml
git commit -m "Update dependencies"
git push origin main
```

### Next.js 업데이트

```bash
pnpm add next@latest
git add package.json pnpm-lock.yaml
git commit -m "Update Next.js to latest"
git push origin main
```
