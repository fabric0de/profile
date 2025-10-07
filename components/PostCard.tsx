import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { Badge } from './ui/badge';
import { BaseCardProps } from '@/lib/types';

interface PostCardProps extends BaseCardProps {
  date: string;
  readingTime?: string;
  tags?: string[];
}

export function PostCard({
  title,
  description,
  date,
  readingTime,
  tags,
  href,
  delay = 0,
}: PostCardProps) {
  return (
    <AnimatedCard delay={delay}>
      <Card className='hover:shadow-xl transition-all duration-300 h-full'>
        <CardHeader>
          <CardTitle className='hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200'>
            <Link href={href}>{title}</Link>
          </CardTitle>
          <CardDescription className='text-sm leading-relaxed'>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
            <div className='flex items-center space-x-1'>
              <Calendar className='h-4 w-4' />
              <span>{format(new Date(date), 'MMM d, yyyy')}</span>
            </div>
            {readingTime && (
              <div className='flex items-center space-x-1'>
                <Clock className='h-4 w-4' />
                <span>{readingTime}</span>
              </div>
            )}
          </div>

          {tags && tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {tags.map(tag => (
                <Badge key={tag} variant='secondary' className='text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}
