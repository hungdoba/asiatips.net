import Image from 'next/image';
import SEO from '@/components/Layout/SEO';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const locale = context.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="About Us - Asiatips.net"
        description=""
        image="https://www.Asiatips.net/card.jpg"
        url="https://Asiatips.net/about"
      />
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-24 mb-20 p-4 md:p-0">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <Image
            src="/admin.png"
            alt="Profile Picture"
            width={200}
            height={200}
          />
        </div>
        <h1 className="text-4xl font-bold mt-6"> Hung Ba </h1>
        <h2 className="text-xl text-gray-500">{t('aboutme:jobTitle')}</h2>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:thankyou')}
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:introduction')}
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:background')}
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:experience')}
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:motivationForBlog')}
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:goals')}
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:contactInformation')}
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          {t('aboutme:conclusion')}
        </p>
        <div className="mt-10">
          <a
            href="https://twitter.com/johndoe"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>
          <span className="mx-3 text-gray-400">•</span>
          <a
            href="https://github.com/johndoe"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <span className="mx-3 text-gray-400">•</span>
          <a
            href="https://linkedin.com/in/johndoe"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
