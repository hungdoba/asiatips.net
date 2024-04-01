import { post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@/components/Layout/SEO';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ArticleCard from '@/components/Card/ArticleCard';
// import Admin from '@/components/Layout/Admin';
import Subscribe from '@/components/Layout/Subscribe';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const locale = context.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default function SearchPage() {
  const router = useRouter();
  const { searchTerm } = router.query;
  const [results, setResults] = useState<post[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `/api/article/search?searchTerm=${searchTerm}`
          );
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error('Error while searching:', error);
        }
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <>
      <SEO
        title="Rgeen.com Online Tool Review"
        description="Unleash your digital potential with our trusted online tool reviews. Compare, evaluate, and find the perfect solutions for enhancing productivity and streamlining workflows. Trust our expert evaluations and user feedback to make informed decisions. Discover the ultimate resource for unbiased tool recommendations."
        image="https://www.rgeen.com/card.png"
        url="https://rgeen.com/knowledge"
      />
      <Navbar />
      <div className="container mx-2 md:mx-auto mt-24 md:flex md:flex-col md:max-w-7xl">
        <h2 className="mb-4 text-xl font-bold">Results: {results.length}</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 md:mr-2">
            {results &&
              results.map((post: post, index: number) => (
                <ArticleCard key={index} post={post} />
              ))}
          </div>

          <div className="w-full md:w-1/4">
            <div className="sticky top-24 mb-4">
              <Subscribe />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
