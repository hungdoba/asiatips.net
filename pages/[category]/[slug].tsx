import { prisma } from '@/utils/db';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
// TODO: recheck remarkEmoji, error not assiable
// import remarkEmoji from 'remark-emoji';
import remarkImages from 'remark-images';

import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'remark-autolink-headings';

import { convert } from '@/utils/slugify';
import ArticleDetail from '@/components/Layout/ArticleDetail';

export const getStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      url: true,
      category: true,
    },
  });

  const paths = posts.map((post) => ({
    params: { category: convert(post.category), slug: post.url },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const post = await prisma.post.findFirst({
    where: {
      url: context.params.slug,
    },
    include: {
      post_translation: true,
    },
  });

  // Not found post or category mismatch
  if (!post || convert(post.category) !== context.params.category) {
    return {
      notFound: true,
    };
  }

  post.created_at = post.created_at ? new Date(post.created_at) : new Date();

  let serializedContent: MDXRemoteSerializeResult | null = null;
  let serializedTableOfContents: MDXRemoteSerializeResult | null = null;

  const locale = context.locale;

  if (locale === 'vi') {
    const viTranslation = post.post_translation.find(
      (translation) => translation.language_code === 'vi'
    );
    if (viTranslation) {
      [serializedContent, serializedTableOfContents] = await Promise.all([
        serialize(viTranslation.markdown, {
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypeHighlight,
            ],
            remarkPlugins: [remarkGfm, remarkToc, remarkImages],
          },
        }),
        serialize(viTranslation.tableOfContents, {
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypeHighlight,
            ],
          },
        }),
      ]);
    }
  } else if (locale === 'ja') {
    const jaTranslation = post.post_translation.find(
      (translation) => translation.language_code === 'ja'
    );
    if (jaTranslation) {
      [serializedContent, serializedTableOfContents] = await Promise.all([
        serialize(jaTranslation.markdown, {
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypeHighlight,
            ],
            remarkPlugins: [remarkGfm, remarkToc, remarkImages],
          },
        }),
        serialize(jaTranslation.tableOfContents, {
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypeHighlight,
            ],
          },
        }),
      ]);
    }
  }

  return {
    props: {
      content: serializedContent,
      tableOfContents: serializedTableOfContents,
      post: {
        ...post,
        created_at: post.created_at.toString(),
      },
      ...(await serverSideTranslations(locale)),
    },
  };
};

interface ArticleProps {
  tableOfContents: string;
  content: any;
  post: any;
}

function Article({ tableOfContents, content, post }: ArticleProps) {
  return (
    <ArticleDetail
      tableOfContents={tableOfContents}
      content={content}
      post={post}
    />
  );
}

export default Article;
