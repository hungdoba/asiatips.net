import Link from 'next/link';
import { prisma } from '@/utils/db';
import { post } from '@prisma/client';
import { convert } from '@/utils/slugify';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@/components/Layout/SEO';
import Tags from '@/components/Common/Tags';
import Admin from '@/components/Layout/Admin';
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import Subscribe from '@/components/Layout/Subscribe';
import ArticleCard from '@/components/Card/ArticleCard';

export const getStaticPaths = async () => {
  const uniqueCategories = await prisma.post.findMany({
    distinct: ['category'],
  });

  const paths = uniqueCategories.map((category) => ({
    params: { category: convert(category.category) },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const locale = context.locale;
  const posts = await prisma.post.findMany({
    orderBy: [{ created_at: 'asc' }],
    include: {
      post_translation: true,
    },
  });

  const filteredPosts = posts.filter(
    (post) => convert(post.category) === context.params.category
  );

  const serializedPosts = filteredPosts.map((post) => ({
    ...post,
    created_at: post.created_at?.toISOString(),
  }));

  return {
    props: {
      postsInit: serializedPosts,
      category: context.params.category,
      ...(await serverSideTranslations(locale)),
    },
  };
};

interface CategoryProps {
  postsInit: any;
  category: string;
}

function CategoryPage({ postsInit, category }: CategoryProps) {
  const { data: session, status } = useSession();
  let isAdmin = status === 'authenticated';

  const { t } = useTranslation();

  const [posts, setPosts] = useState(postsInit);

  useEffect(() => {
    setPosts(postsInit);
  }, [postsInit]);

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
            <Tags category={category} />
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
                      <ArticleCard post={post} />
                      <Link
                        type="button"
                        href={`/markdown/${post.url}`}
                        target="_blank"
                        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      >
                        Chỉnh sửa
                      </Link>
                    </div>
                  ) : (
                    <ArticleCard key={post.url} post={post} />
                  )
                )}
            </div>

            <div className="w-full md:w-1/4 mb-2">
              <div className="sticky top-24">
                <Admin />
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

export default CategoryPage;
