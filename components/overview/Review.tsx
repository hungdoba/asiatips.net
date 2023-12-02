import Tags from '../common/Tags';
import Image from 'next/image';
import Aboutme from './Aboutme';
import Subscribe from '../common/Subscribe';
import SEO from '@/components/layout/SEO';
import SocialMedia from './SocialMedia';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MDXRemote } from 'next-mdx-remote';
import TableOfContents from './TableOfContents';
import { Fragment, useEffect, useState } from 'react';

// Components of MDXRemote
import YouTube from '../article/YouTube';
import Top10Newest from './Top10Newest';
import AlertRed from '../article/alert/red';
import UnderRed from '../article/underline/red';
import AlertGreen from '../article/alert/green';
import AlertYellow from '../article/alert/yellow';
import UnderGreen from '../article/underline/green';
import ButtonOrange from '../article/button/orange';
import UnderYellow from '../article/underline/yellow';
import ButtonPinkOrange from '../article/button/pinkOrange';
import ButtonPurplePink from '../article/button/purplePink';
import { convert } from '@/utils/categoryToUrl';
import { useTranslation } from 'next-i18next';

export default function Article({ tableOfContents, content, post }) {
  const [tags, setTags] = useState<string[]>([]);
  const [popupTableOfContent, setPopupTableOfContent] = useState(false);
  const [isShowControlButton, setShowControlButton] = useState(false);
  const [isHideTableOfContent, setIsHideTableOfContent] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/post/tag');
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
          <Tags
            highline={null}
            category={null}
            initTags={null}
            isClickable={true}
          />
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
                  AlertRed,
                  AlertGreen,
                  AlertYellow,
                  UnderRed,
                  UnderYellow,
                  UnderGreen,
                  YouTube,
                  ButtonOrange,
                  ButtonPinkOrange,
                  ButtonPurplePink,
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
            <Tags
              highline={null}
              category={null}
              initTags={null}
              isClickable={true}
            />
            <Top10Newest />
          </article>
          <div className="w-full md:w-1/4">
            <div className="hidden md:block">
              <Aboutme />
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
