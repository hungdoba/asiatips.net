import Image from 'next/image';

import { MDXRemote } from 'next-mdx-remote';
import TableOfContents from './TableOfContents';
import { Fragment, useEffect, useState } from 'react';

import Top10Newest from './RecentlyAddedArticles';

import { useTranslation } from 'next-i18next';
import Tags from '../Common/Tags';
import Admin from './Admin';
import Subscribe from './Subscribe';
import SEO from './SEO';
import SocialMedia from '../Common/SocialMedia';
import Navbar from './Navbar';
import Footer from './Footer';
import YouTube from '../Control/YouTube';
import { convert } from '@/utils/slugify';
import { Alert } from '../Control/Alert';
import Underline from '../Control/Underline';
import Button from '../Control/Button';

interface ArticleDetailProps {
  tableOfContents: string;
  content: any;
  post: any;
}

export default function ArticleDetail({
  tableOfContents,
  content,
  post,
}: ArticleDetailProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [popupTableOfContent, setPopupTableOfContent] = useState(false);
  const [isShowControlButton, setShowControlButton] = useState(false);
  const [isHideTableOfContent, setIsHideTableOfContent] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/tags');
      const data = await response.json();
      setTags(data);
    };
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function isScrollAtBottom() {
    const windowHeight = window.innerHeight; // Height of the viewport
    const documentHeight = document.documentElement.scrollHeight; // Total scrollable height
    const scrollY = window.scrollY || window.pageYOffset; // Current scroll position
    return documentHeight - scrollY <= windowHeight + 50;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollAtBottom()) {
        setIsHideTableOfContent(true);
      } else {
        setIsHideTableOfContent(false);
      }

      if (window.scrollY > 800) {
        setShowControlButton(true);
      } else {
        setShowControlButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <SEO
        title={post.title}
        description={post.brief}
        image={post.image}
        url={`https://asiatips.net/${convert(post.category)}/${post.url}`}
      />
      <Navbar />
      <main className="container mx-auto mt-24 md:flex md:flex-col md:max-w-7xl">
        <header className="mx-4">
          <Tags />
          <hr className="h-px my-2 bg-blue-200 border-0 "></hr>
        </header>

        <div className="md:flex md:flex-row mx-4">
          <article className="w-full md:w-3/4 md:pr-4">
            <Image
              className="w-full rounded-xl"
              height={1000}
              width={800}
              src={post.image}
              alt="Article Image"
            />
            <h1 className="text-4xl font-bold my-4">{post.title}</h1>
            <div className="w-full md:hidden">
              <TableOfContents
                content={tableOfContents}
                isPopupMode={false}
                isPopup={false}
                setHidden={null}
              />
            </div>
            <div className="prose max-w-none prose-lg overflow-hidden">
              <MDXRemote
                {...content}
                components={{
                  Alert,
                  Underline,
                  YouTube,
                  Button,
                }}
              />
            </div>

            <hr className="my-4" />
            <h2 className="mt-4 mb-2 text-xl font-bold text-gray-900">
              {t('common:shareCallout')}
            </h2>
            <SocialMedia />

            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              {t('common:readMore')}
            </h2>
            <hr className="mb-2" />
            <Tags />
            <Top10Newest />
          </article>
          <div className="w-full md:w-1/4">
            <div className="hidden md:block">
              <Admin />
            </div>
            <div className="sticky top-24">
              <Subscribe />
            </div>
            <div
              className={`hidden ${
                isHideTableOfContent ? 'md:hidden' : 'md:block'
              } md:sticky top-96`}
            >
              <TableOfContents
                content={tableOfContents}
                isPopupMode={false}
                isPopup={false}
                setHidden={null}
              />
            </div>
          </div>
        </div>
        <TableOfContents
          content={tableOfContents}
          isPopupMode={true}
          isPopup={popupTableOfContent}
          setHidden={() => setPopupTableOfContent(false)}
        />
      </main>

      <div className={isShowControlButton ? 'block' : 'hidden'}>
        {/* Scroll to Top Icon */}
        <div className="fixed bottom-4 right-4">
          <div className="relative">
            <a href="#top-of-page">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-30 backdrop-blur-md border"
                onClick={scrollToTop}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Table of Contents Icon */}
        <div className="fixed bottom-20 right-4">
          <div className="relative">
            <a href="#top-of-page">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-30 backdrop-blur-md border"
                onClick={() => setPopupTableOfContent(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
