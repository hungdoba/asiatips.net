import { prisma } from '@/utils/db';
import { serialize } from 'next-mdx-remote/serialize';

import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkEmoji from 'remark-emoji';
import remarkImages from 'remark-images';

import Review from '@/components/overview/Review';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'remark-autolink-headings';
import { convert } from '@/utils/categoryToUrl';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      url: true,
      category: true,
    },
  });

  const paths = posts.map((post) => ({
    params: { category: convert(post.category), url: post.url },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const post = await prisma.post.findFirst({
    where: {
      url: context.params.url,
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
            remarkPlugins: [remarkGfm, remarkToc, remarkEmoji, remarkImages],
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
            remarkPlugins: [remarkGfm, remarkToc, remarkEmoji, remarkImages],
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

function Article({ tableOfContents, content, post }) {
  return (
    <Review tableOfContents={tableOfContents} content={content} post={post} />
  );
}

export default Article;
