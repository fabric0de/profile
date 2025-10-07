import { getAllPosts } from '@/lib/content';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabric0de.dev';
  const locales = ['ko', 'en', 'ja'];

  // 모든 언어의 포스트를 가져오기
  const allPosts = await Promise.all(
    locales.map(async locale => {
      const posts = await getAllPosts(locale);
      return posts.map((post: any) => ({
        ...post,
        locale,
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
      }));
    })
  );

  // 모든 포스트를 하나의 배열로 평탄화하고 날짜순으로 정렬
  const flatPosts = allPosts
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fabric0de Blog</title>
    <description>개발자 김정현의 기술 블로그</description>
    <link>${baseUrl}</link>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${flatPosts
      .map(
        post => `
    <item>
      <title>${post.title}</title>
      <description>${post.description}</description>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.tags.join(', ')}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
