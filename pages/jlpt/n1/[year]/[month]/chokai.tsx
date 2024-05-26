import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { prisma } from '@/utils/db';
import SEO from '@/components/Layout/SEO';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import SettingForm from '@/components/Form/SettingForm';
import { jlpt_chokai, jlpt_mondai, jlpt_question } from '@prisma/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import MondaiComponent from '@/components/Control/MondaiComponent';
import ChokaiComponent from '@/components/Control/ChokaiComponent';
import NumberBox from '@/components/Control/NumberBox';
import AudioPlayer from '@/components/Control/AudioPlayer';

// Component Props
interface JLPTChokai {
  chokais: jlpt_chokai[];
  year: string;
  month: string;
}

const getHeaderText = (mondai: number): string => {
  switch (mondai) {
    case 1:
      return '問題1 では、まず質問を聞いてください。それから話を聞いて、問題用紙の(1)から(4)の中から、最もよいものをー つ選んでください。';
    case 2:
      return '問題2 では、まず質問を聞いてください。そのあと、問題用紙のせんたくしを読んでください。読む時間があります。それから話を聞いて、問題用紙の(1)から(4)の中から、最もよいものを一つ選んでください。';
    case 3:
      return '問題3 では、問題用紙に何も印刷されていません。この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから、しつもんとせんたくしを聞いて、(1)から(4)の中から、最もよいものを一つ選んでください。';
    case 4:
      return '問題4 では、問題用紙に何も印刷されていません。まず文を聞いてください。それから、それに対する返事を聞いて、(1)から(3)の中から、最もよいものを一つ選んでください。';
    case 5:
      return '問題5 では長めの話を聞きます。この問題には練習はありません。メモをとってもかまいません。';
    default:
      return '問題 未定義';
  }
};

const JLPTChokai: NextPage<JLPTChokai> = ({ chokais, year, month }) => {
  let sortedChokais = chokais.sort(
    (a, b) => a.question_number - b.question_number
  );

  let mondai1 = sortedChokais.filter((chokai) => chokai.mondai_number === 1);
  let mondai2 = sortedChokais.filter((chokai) => chokai.mondai_number === 2);
  let mondai3 = sortedChokais.filter((chokai) => chokai.mondai_number === 3);
  let mondai4 = sortedChokais.filter((chokai) => chokai.mondai_number === 4);
  let mondai5 = sortedChokais.filter((chokai) => chokai.mondai_number === 5);

  const Options = ({ options }: any) => (
    <div className="mx-2">
      <div className="flex flex-wrap justify-between">
        {['1', '2', '3', '4'].map((num) => (
          <div key={num} className="flex flex-row mr-4">
            <div className="flex mb-2 px-2 rounded-lg hover:cursor-pointer border">
              <div className="mr-4">{num}</div>
              <div>{options[`option_${num}`]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
        <ChokaiComponent chokais={mondai1} />
        <ChokaiComponent chokais={mondai2} />
        <ChokaiComponent chokais={mondai3} />
        <ChokaiComponent chokais={mondai4} />
        <ChokaiComponent chokais={mondai5} />
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
