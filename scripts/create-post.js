#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function createPost() {
  console.log('📝 새 블로그 글 생성하기\n');

  const title = await question('글 제목: ');
  const description = await question('글 설명: ');
  const tags = await question('태그 (쉼표로 구분): ');
  const locale = (await question('언어 (ko/en): ')) || 'ko';

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  const date = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: "${title}"
date: "${date}"
description: "${description}"
tags: [${tags
    .split(',')
    .map(tag => `"${tag.trim()}"`)
    .join(', ')}]
published: true
locale: "${locale}"
---

# ${title}

${description}

## 시작하기

여기에 글 내용을 작성하세요...

## 결론

글을 마무리하세요.
`;

  const dir = path.join('content', 'blog', locale);
  const filePath = path.join(dir, `${slug}.mdx`);

  // 디렉토리 생성
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 파일 생성
  fs.writeFileSync(filePath, frontmatter);

  console.log(`\n✅ 글이 생성되었습니다: ${filePath}`);
  console.log(`📝 편집하세요: code ${filePath}`);

  rl.close();
}

createPost().catch(console.error);
