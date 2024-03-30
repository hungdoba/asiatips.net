import { prisma } from '@/utils/db';
import { GetStaticPaths } from 'next';
import { post } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from '@/components/Layout/SEO';
import Navbar from '@/components/Layout/Navbar';
import Tags from '@/components/Common/Tags';
import ArticleCard from '@/components/Card/ArticleCard';
// import Admin from '@/components/Layout/Admin';
import Subscribe from '@/components/Layout/Subscribe';
import Footer from '@/components/Layout/Footer';

type Props = {
  posts: post[];
  tag: string | null;
};

type Params = {
  tag: string;
};

const TagPage = ({ posts, tag }: Props) => {
  return (
    <>
      <SEO
        title="Asiatips | Mẹo hay ở Nhật"
        description="Blog chia sẻ kiến thức và mẹo hay khi sống ở Nhật dành cho người nước ngoài"
        image="https://www.asiatips.net/card.jpg"
        url="https://asiatips.net/knowledge"
      />
      <Navbar />
      <div className="container md:mx-auto mt-24 md:flex md:flex-col md:max-w-7xl">
        <div className="mx-2">
          <div className="w-full flex">
            <Tags highlightedTag={tag ?? undefined} clickable />
          </div>
          <hr className="h-px my-2 bg-blue-200 border-0 "></hr>
          <h2 className="mb-2 text-xl font-bold">Bài viết</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:mr-2">
              {posts &&
                posts.map((post: post) => (
                  <ArticleCard key={post.url} post={post} />
                ))}
            </div>

            <div className="w-full md:w-1/4 mb-2">
              <div className="sticky top-24">
                {/* <Admin /> */}
                <Subscribe />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const locale = context.locale;
  const tag = context.params.tag;
  const posts = await prisma.post.findMany({
    where: { tags: { has: tag }, active: true },
    orderBy: { created_at: 'desc' },
    include: {
      post_translation: true,
    },
  });

  return {
    props: {
      tag: tag,
      posts: posts.map((post) => ({
        ...post,
        created_at: post.created_at.toISOString(),
      })),
      ...(await serverSideTranslations(locale)),
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = await prisma.post.findMany({
    distinct: ['tags'],
    select: { tags: true },
    where: {
      active: true,
    },
  });

  const paths = tags.map((tag) => ({ params: { tag: tag.tags[0] } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default TagPage;
