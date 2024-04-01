import { prisma } from '@/utils/db';
import { post } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@/components/Layout/SEO';
import Tags from '@/components/Common/Tags';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Subscribe from '@/components/Layout/Subscribe';
import ArticleCard from '@/components/Card/ArticleCard';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);

  const posts = await prisma.post.findMany({
    orderBy: [{ created_at: 'asc' }],
    include: {
      post_translation: true,
    },
  });

  const serializedPosts = posts.map((post) => ({
    ...post,
    created_at: post.created_at?.toISOString(),
  }));

  const locale = context.locale;

  return {
    props: {
      posts: serializedPosts,
      session,
      ...(await serverSideTranslations(locale)),
    },
  };
};

interface HomePageProps {
  posts: any;
}

function HomePage({ posts }: HomePageProps) {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Asiatips | Mẹo hay ở Nhật"
        description="Blog chia sẻ kiến thức và mẹo hay khi sống ở Nhật dành cho người nước ngoài"
        image="https://www.asiatips.net/card.png"
        url="https://asiatips.net/knowledge"
      />
      <Navbar />
      <div className="container md:mx-auto mt-24 md:flex md:flex-col md:max-w-7xl">
        <div className="mx-2">
          <div className="w-full">
            <Tags clickable />
          </div>
          <hr className="h-px my-4 bg-blue-200 border-0 "></hr>
          <h2 className="mb-2 text-xl font-bold">{t('title:article')}</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:mr-2">
              {posts &&
                posts.map((post: post, index: number) => (
                  <div key={index}>
                    <ArticleCard
                      priority={index === 0}
                      key={index}
                      post={post}
                    />
                  </div>
                ))}
            </div>

            <div className="w-full md:w-1/4 mb-2">
              <div className="sticky top-24">
                <Subscribe />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
