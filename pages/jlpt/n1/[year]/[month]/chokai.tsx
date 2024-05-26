import { prisma } from '@/utils/db';
import SEO from '@/components/Layout/SEO';
import { jlpt_chokai } from '@prisma/client';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ChokaiComponent from '@/components/Control/MondaiChokaiComponent';

// Component Props
interface JLPTChokai {
  chokais: jlpt_chokai[];
  year: string;
  month: string;
}

const JLPTChokai: NextPage<JLPTChokai> = ({ chokais, year, month }) => {
  let sortedChokais = chokais.sort(
    (a, b) => a.question_number - b.question_number
  );

  let mondai1 = sortedChokais.filter((chokai) => chokai.mondai_number === 1);
  let mondai2 = sortedChokais.filter((chokai) => chokai.mondai_number === 2);
  let mondai3 = sortedChokais.filter((chokai) => chokai.mondai_number === 3);
  let mondai4 = sortedChokais.filter((chokai) => chokai.mondai_number === 4);
  let mondai5 = sortedChokais.filter((chokai) => chokai.mondai_number === 5);

  const handleOptionSelect = (
    mondaiNumber: number,
    questionNumber: number,
    optionNumber: number
  ) => {
    console.log(mondaiNumber, questionNumber, optionNumber);
  };

  return (
    <>
      <SEO
        title="Asiatips | Mẹo hay ở Nhật"
        description="Blog chia sẻ kiến thức và mẹo hay khi sống ở Nhật dành cho người nước ngoài"
        image="https://www.asiatips.net/card.png"
        url="https://asiatips.net/knowledge"
      />
      <Navbar />
      <div className="no-select flex flex-col mx-4 mt-20 text-wrap lg:max-w-4xl lg:mx-auto underline-offset-4">
        <ChokaiComponent
          chokais={mondai1}
          onOptionSelect={handleOptionSelect}
        />
        <ChokaiComponent
          chokais={mondai2}
          onOptionSelect={handleOptionSelect}
        />
        <ChokaiComponent
          chokais={mondai3}
          onOptionSelect={handleOptionSelect}
        />
        <ChokaiComponent
          chokais={mondai4}
          onOptionSelect={handleOptionSelect}
        />
        <ChokaiComponent
          chokais={mondai5}
          onOptionSelect={handleOptionSelect}
        />
      </div>
      <div className="no-select flex flex-col mx-4 mt-20 text-wrap lg:max-w-4xl lg:mx-auto underline-offset-4"></div>
      <Footer />
    </>
  );
};

export default JLPTChokai;

// Static Paths
export const getStaticPaths: GetStaticPaths = async () => {
  const times = await prisma.jlpt_mondai.findMany({
    select: { year: true, month: true },
  });

  const paths = times.map((time) => ({
    params: { year: time.year.toString(), month: time.month.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

// Static Props
export const getStaticProps: GetStaticProps = async (context) => {
  const { year, month } = context.params as { year: string; month: string };

  try {
    const chokais = await prisma.jlpt_chokai.findMany({
      where: {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
      },
      orderBy: {
        mondai_number: 'asc',
      },
    });

    return {
      props: {
        chokais: JSON.parse(JSON.stringify(chokais)), // Ensuring the data is serializable
        year,
        month,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
};
