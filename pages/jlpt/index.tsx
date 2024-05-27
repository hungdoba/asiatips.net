import { prisma } from '@/utils/db';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import SEO from '@/components/Layout/SEO';
import Tags from '@/components/Common/Tags';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Subscribe from '@/components/Layout/Subscribe';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DocumentTextIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  const times = await prisma.jlpt_mondai.findMany({
    orderBy: [{ year: 'asc' }, { month: 'asc' }],
    select: {
      year: true,
      month: true,
    },
  });

  // Filter unique combinations of year and month
  const uniqueTimes = Array.from(
    new Set(times.map((time) => `${time.year}-${time.month}`))
  ).map((uniqueTime) => {
    const [year, month] = uniqueTime.split('-').map(Number);
    return { year, month };
  });

  const locale = context.locale;

  return {
    props: {
      times: uniqueTimes,
      session,
      ...(await serverSideTranslations(locale)),
    },
  };
};

interface HomePageProps {
  times: { year: number; month: number }[];
}

function HomePage({ times }: HomePageProps) {
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
          <h2 className="mb-2 text-xl font-bold">{t('title:jlptExams')}</h2>
          <p className="mb-2">{t('title:jlptOtherYearsNote')}</p>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:mr-2">
              <ul className="my-4 space-y-3">
                {times &&
                  times.map((time, index) => (
                    <li key={index}>
                      <a
                        href={`/jlpt/n1/${time.year}/${time.month}`}
                        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow "
                      >
                        <DocumentTextIcon className="w-6 h-6" />
                        <SpeakerWaveIcon className="w-6 h-6" />

                        <span className="flex-1 ms-3 ml-8 whitespace-nowrap">
                          {`${time.year} - ${time.month}`}
                        </span>
                        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                          {t('button:startTest')}
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
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
