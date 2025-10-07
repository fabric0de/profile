import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';
import { OptimizedImage } from './OptimizedImage';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BaseCardProps } from '@/lib/types';

interface ProjectCardProps extends BaseCardProps {
  image?: string;
  github?: string;
  live?: string;
  stack: string[];
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  image,
  github,
  live,
  stack,
  href,
  featured = false,
  delay = 0,
}: ProjectCardProps) {
  return (
    <AnimatedCard delay={delay}>
      <Card
        className={`hover:shadow-xl transition-all duration-300 h-full ${featured ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''}`}
      >
        {image && (
          <div className='relative h-48 w-full overflow-hidden rounded-t-lg'>
            <OptimizedImage
              src={image}
              alt={title}
              width={400}
              height={200}
              className='h-full w-full object-cover'
            />
          </div>
        )}

        <CardHeader>
          <div className='flex items-center justify-between gap-2'>
            <CardTitle className='hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex-1'>
              <Link href={href}>{title}</Link>
            </CardTitle>
            {featured && <FeaturedBadge />}
          </div>
          <CardDescription className='text-sm leading-relaxed'>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex flex-wrap gap-2'>
            {stack.map(tech => (
              <Badge key={tech} variant='secondary' className='text-xs'>
                {tech}
              </Badge>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <Button variant='link' size='sm' asChild>
              <Link href={href}>
                <ViewDetailsText />
              </Link>
            </Button>
            {github && (
              <Button variant='ghost' size='icon' asChild>
                <a
                  href={github}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='View on GitHub'
                >
                  <Github className='h-4 w-4' />
                </a>
              </Button>
            )}
            {live && (
              <Button variant='ghost' size='icon' asChild>
                <a
                  href={live}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='View live site'
                >
                  <ExternalLink className='h-4 w-4' />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}

// Client components for translations
function FeaturedBadge() {
  const t = useTranslations('Common');
  return (
    <Badge variant='default' className='text-xs'>
      {t('featured')}
    </Badge>
  );
}

function ViewDetailsText() {
  const t = useTranslations('Common');
  return t('viewDetails');
}
