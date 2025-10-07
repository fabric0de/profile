#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 자동 태그 매핑
const autoTags = {
  // 기술 스택
  nextjs: ['nextjs', 'react', 'javascript'],
  'next.js': ['nextjs', 'react', 'javascript'],
  react: ['react', 'javascript', 'frontend'],
  typescript: ['typescript', 'javascript', 'programming'],
  tailwind: ['tailwind', 'css', 'frontend'],
  css: ['css', 'frontend', 'styling'],
  javascript: ['javascript', 'programming', 'web'],
  nodejs: ['nodejs', 'javascript', 'backend'],
  'node.js': ['nodejs', 'javascript', 'backend'],
  python: ['python', 'programming', 'backend'],
  django: ['django', 'python', 'backend'],
  express: ['express', 'nodejs', 'backend'],
  mongodb: ['mongodb', 'database', 'nosql'],
  postgresql: ['postgresql', 'database', 'sql'],
  redis: ['redis', 'database', 'cache'],
  docker: ['docker', 'devops', 'containerization'],
  aws: ['aws', 'cloud', 'devops'],
  vercel: ['vercel', 'deployment', 'hosting'],

  // 주제
  tutorial: ['tutorial', 'guide', 'learning'],
  guide: ['tutorial', 'guide', 'learning'],
  tips: ['tips', 'tricks', 'optimization'],
  tricks: ['tips', 'tricks', 'optimization'],
  review: ['review', 'opinion', 'analysis'],
  project: ['project', 'portfolio', 'showcase'],
  portfolio: ['project', 'portfolio', 'showcase'],
  showcase: ['project', 'portfolio', 'showcase'],

  // 난이도
  beginner: ['beginner', 'tutorial', 'learning'],
  intermediate: ['intermediate', 'advanced', 'programming'],
  advanced: ['advanced', 'expert', 'programming'],
  expert: ['advanced', 'expert', 'programming'],

  // 분야
  frontend: ['frontend', 'ui', 'ux'],
  backend: ['backend', 'api', 'server'],
  fullstack: ['fullstack', 'frontend', 'backend'],
  mobile: ['mobile', 'react-native', 'app'],
  web: ['web', 'frontend', 'development'],
  api: ['api', 'backend', 'integration'],
  database: ['database', 'data', 'storage'],
  devops: ['devops', 'deployment', 'infrastructure'],
  testing: ['testing', 'qa', 'quality'],
  performance: ['performance', 'optimization', 'speed'],
  security: ['security', 'auth', 'protection'],
  seo: ['seo', 'optimization', 'search'],
  accessibility: ['accessibility', 'a11y', 'inclusive'],
  ui: ['ui', 'frontend', 'design'],
  ux: ['ux', 'user-experience', 'design'],
};

function extractTagsFromContent(content) {
  const words = content
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);

  const foundTags = new Set();

  // 단어별 매칭
  words.forEach(word => {
    if (autoTags[word]) {
      autoTags[word].forEach(tag => foundTags.add(tag));
    }
  });

  // 부분 매칭
  Object.keys(autoTags).forEach(key => {
    if (content.toLowerCase().includes(key)) {
      autoTags[key].forEach(tag => foundTags.add(tag));
    }
  });

  return Array.from(foundTags).slice(0, 5); // 최대 5개
}

function updatePostTags(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Frontmatter 추출
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return;

    const frontmatter = frontmatterMatch[1];
    const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');

    // 기존 태그 추출
    const existingTagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
    const existingTags = existingTagsMatch
      ? existingTagsMatch[1]
          .split(',')
          .map(tag => tag.trim().replace(/['"]/g, ''))
      : [];

    // 자동 태그 생성
    const autoTags = extractTagsFromContent(body);

    // 기존 태그와 자동 태그 합치기
    const allTags = [...new Set([...existingTags, ...autoTags])];

    // 새로운 frontmatter 생성
    const newFrontmatter = frontmatter.replace(
      /tags:\s*\[.*?\]/,
      `tags: [${allTags.map(tag => `"${tag}"`).join(', ')}]`
    );

    const newContent = `---\n${newFrontmatter}\n---\n${body}`;

    fs.writeFileSync(filePath, newContent);
    console.log(`✅ ${filePath} 태그 업데이트: ${allTags.join(', ')}`);
  } catch (error) {
    console.error(`❌ ${filePath} 처리 실패:`, error.message);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('📝 자동 태그 생성기');
    console.log('사용법: node scripts/auto-tags.js <파일경로>');
    console.log('예시: node scripts/auto-tags.js content/blog/ko/my-post.mdx');
    return;
  }

  const filePath = args[0];

  if (!fs.existsSync(filePath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${filePath}`);
    return;
  }

  updatePostTags(filePath);
}

main();
