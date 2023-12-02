import Image from 'next/image';
import SEO from '@/components/layout/SEO';
import Tags from '@/components/common/Tags';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MDXRemote } from 'next-mdx-remote';
import PostCard from '@/components/overview/PostCard';
import { Fragment, useEffect, useState } from 'react';
import { post } from '@prisma/client';
import Breadcrumb from '../common/Breadcrumb';

export default function Article({ data, content, post }) {
  const [relatedPost, setRelatedPost] = useState<post[]>([]);

  const fetchData = async (queryString) => {
    const response = await fetch(`/api/post/related?${queryString}`, {
      method: 'GET',
    });
    const result = await response.json();
    setRelatedPost(result);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();
    post.tags.forEach((tag) => {
      searchParams.append('tags', tag);
    });
    const queryString = searchParams.toString(); // "tags=tag3&tags=tag2"
    fetchData(queryString);
  }, [post]);

  return (
    <Fragment>
      <SEO
        title={post.title}
        description={post.brief}
        image="https://www.Asiatips.net/card.jpg"
        url={`https://Asiatips.net/knowledge/${post.url}`}
      />
      <Navbar />
      <main className="mt-20 md:mt-24 pb-16 bg-white">
        <div className="px-4 mx-auto max-w-screen-xl">
          <header className="mb-4">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                <Image
                  className="mr-4 w-16 h-16 rounded-full"
                  height={48}
                  width={48}
                  src="/admin.png"
                  alt="Admin logo"
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900"
                  >
                    Admin
                  </a>
                  <p className="text-base font-light text-gray-500">
                    Writer, Coder, SEO of Asiatips
                  </p>
                  <p className="text-base font-light text-gray-500">
                    {data.date}
                  </p>
                </div>
              </div>
            </address>
            <hr />
          </header>
        </div>
        <div className="px-4 mx-auto max-w-screen-lg pb-8">
          <article className="mx-auto w-full md:px-6 lg:px-32">
            <Image
              className="mr-4 w-full rounded-xl"
              height={1000}
              width={800}
              src={post.image}
              // src="/article-main-image-1.webp"
              alt="Admin logo"
            />
            <Breadcrumb />
            <div className="prose md:prose-lg max-w-none prose-slate py-2">
              <MDXRemote {...content} />
            </div>
          </article>
        </div>
        <div className="px-4 mx-auto max-w-screen-xl">
          <hr />
          <div>
            <h3 className="my-8 text-2xl font-bold text-gray-900">
              Related Post
            </h3>
            {relatedPost?.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
          <div>
            <h3 className="my-8 text-2xl font-bold text-gray-900">More Tags</h3>
            <Tags
              highline={null}
              initTags={null}
              category={null}
              isClickable={false}
            />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
