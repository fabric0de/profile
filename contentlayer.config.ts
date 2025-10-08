import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the post',
      required: false,
    },
    published: {
      type: 'boolean',
      description: 'Whether the post is published',
      required: true,
    },
    locale: {
      type: 'string',
      description: 'The locale of the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => {
        const locale = post.locale || 'ko';
        const slug = post._raw.flattenedPath.replace(`blog/${locale}/`, '');
        return `/${locale}/blog/${slug}`;
      },
    },
    slug: {
      type: 'string',
      resolve: post =>
        post._raw.flattenedPath.replace(`blog/${post.locale}/`, ''),
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the project',
      required: true,
    },
    image: {
      type: 'string',
      description: 'The image URL of the project',
      required: false,
    },
    github: {
      type: 'string',
      description: 'The GitHub URL of the project',
      required: false,
    },
    live: {
      type: 'string',
      description: 'The live URL of the project',
      required: false,
    },
    stack: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tech stack of the project',
      required: true,
    },
    featured: {
      type: 'boolean',
      description: 'Whether the project is featured',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the project',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the project',
      required: false,
    },
    published: {
      type: 'boolean',
      description: 'Whether the project is published',
      required: false,
    },
    locale: {
      type: 'string',
      description: 'The locale of the project',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: project => {
        const locale = project.locale || 'ko';
        const slug = project._raw.flattenedPath.replace(
          `projects/${locale}/`,
          ''
        );
        return `/${locale}/projects/${slug}`;
      },
    },
    slug: {
      type: 'string',
      resolve: project =>
        project._raw.flattenedPath.replace(`projects/${project.locale}/`, ''),
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode as any,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: false,
        },
      ],
    ],
  },
});
