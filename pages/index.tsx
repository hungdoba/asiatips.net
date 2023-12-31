import Link from 'next/link';
import { prisma } from '@/utils/db';
import SEO from '@/components/layout/SEO';
import Tags from '@/components/common/Tags';
import { post } from '@prisma/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Aboutme from '@/components/overview/Aboutme';
import { getSession, useSession } from 'next-auth/react';
import PostCard from '@/components/overview/PostCard';
import Subscribe from '@/components/common/Subscribe';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

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

function Post({ posts }) {
  const { data: session, status } = useSession();
  let isAdmin = status === 'authenticated';

  const { t } = useTranslation();

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
          <div className="w-full">
            <Tags
              highline={null}
              category={null}
              initTags={null}
              isClickable={true}
            />
          </div>
          <hr className="h-px my-2 bg-blue-200 border-0 "></hr>
          <h2 className="mb-2 text-xl font-bold">{t('title:article')}</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:mr-2">
              {posts &&
                posts.map((post: post) =>
                  isAdmin ? (
                    <div
                      key={post.url}
                      className={`border rounded-lg mb-4 flex flex-col items-end ${
                        !post.active && 'bg-gray-300'
                      }`}
                    >
                      <PostCard post={post} />
                      <Link
                        type="button"
                        href={`/markdown/${post.url}`}
                        target="_blank"
                        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      >
                        {t('button:modify')}
                      </Link>
                    </div>
                  ) : (
                    <PostCard key={post.url} post={post} />
                  )
                )}
            </div>

            <div className="w-full md:w-1/4 mb-2">
              <div className="sticky top-24">
                <Aboutme />
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

export default Post;
