# 🧩 컴포넌트 가이드

## shadcn/ui 기반 공통 컴포넌트

### Button 컴포넌트

```tsx
import { Button } from '@/components/ui/button'

// 기본 버튼
<Button>Click me</Button>

// 다양한 변형
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// 다양한 크기
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// Link와 함께 사용
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

### Card 컴포넌트

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Badge 컴포넌트

```tsx
import { Badge } from '@/components/ui/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

## 기존 컴포넌트들

### PostCard

```tsx
import { PostCard } from '@/components/PostCard';

<PostCard
  title='Post Title'
  description='Post description'
  date='2024-01-01'
  tags={['react', 'nextjs']}
  href='/blog/post-slug'
  delay={0.1}
/>;
```

### ProjectCard

```tsx
import { ProjectCard } from '@/components/ProjectCard';

<ProjectCard
  title='Project Title'
  description='Project description'
  image='/project-image.jpg'
  github='https://github.com/user/repo'
  live='https://project.com'
  stack={['React', 'TypeScript']}
  href='/projects/project-slug'
  featured={true}
  delay={0.1}
/>;
```

## 타입 정의

### BaseCardProps

```tsx
interface BaseCardProps {
  title: string;
  description: string;
  href: string;
  delay?: number;
}
```

### ButtonProps

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

## 스타일링

### CSS 변수

shadcn/ui는 CSS 변수를 사용하여 테마를 관리합니다:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... */
}
```

### Tailwind 클래스

```tsx
// 커스텀 스타일링
<Button className="bg-custom-color hover:bg-custom-color/90">
  Custom Button
</Button>

// 조건부 스타일링
<Card className={cn(
  "base-styles",
  featured && "ring-2 ring-primary-200"
)}>
  Content
</Card>
```

## 유틸리티 함수

### cn 함수

```tsx
import { cn } from '@/lib/utils'

// 클래스 병합
<div className={cn("base-class", condition && "conditional-class")} />

// shadcn/ui와 함께 사용
<Button className={cn(buttonVariants({ variant: "outline" }), "custom-class")} />
```

## 모범 사례

1. **일관성**: 항상 shadcn/ui 컴포넌트를 우선 사용
2. **재사용성**: 공통 props는 BaseCardProps 등 타입으로 정의
3. **접근성**: aria-label, aria-describedby 등 적절히 사용
4. **성능**: React.memo, useMemo 등 최적화 고려
5. **타입 안전성**: TypeScript 타입을 명확히 정의

## 새로운 컴포넌트 추가

새로운 공통 컴포넌트를 추가할 때:

1. `components/ui/` 폴더에 생성
2. `components/ui/index.ts`에 export 추가
3. 타입 정의는 `lib/types.ts`에 추가
4. 사용 예시를 이 문서에 추가
