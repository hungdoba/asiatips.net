import { prisma } from '@/utils/db';
import SEO from '@/components/Layout/SEO';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Mondai from '@/components/Control/Mondai';
import React, { useEffect, useState } from 'react';
import { jlpt_mondai, jlpt_question } from '@prisma/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import MondaiQuestions from '@/components/Control/MondaiQuestions';
import Cookies from 'js-cookie';

// Component Props
interface JLPTProps {
  mondais: jlpt_mondai[];
  questions: jlpt_question[];
  year: string;
  month: string;
}

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
    const mondais = await prisma.jlpt_mondai.findMany({
      where: {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
      },
      orderBy: {
        mondai_number: 'asc',
      },
    });

    const questions = await prisma.jlpt_question.findMany({
      where: {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
      },
      orderBy: {
        question_number: 'asc',
      },
    });

    return {
      props: {
        mondais: JSON.parse(JSON.stringify(mondais)), // Ensuring the data is serializable
        questions: JSON.parse(JSON.stringify(questions)),
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

const JLPTFull: NextPage<JLPTProps> = ({ mondais, questions, year, month }) => {
  const cookieKey = `selectedOptions_${year}_${month}`;

  const mondaiComponents = [
    { Component: Mondai, number: 1 },
    { Component: Mondai, number: 2 },
    { Component: Mondai, number: 3 },
    { Component: Mondai, number: 4 },
    { Component: Mondai, number: 5 },
    { Component: Mondai, number: 6 },
    { Component: MondaiQuestions, number: 7 },
    { Component: MondaiQuestions, number: 8 },
    { Component: MondaiQuestions, number: 9 },
    { Component: MondaiQuestions, number: 10 },
    { Component: MondaiQuestions, number: 11 },
    { Component: MondaiQuestions, number: 12 },
    { Component: MondaiQuestions, number: 13 },
  ];

  const initialSelectedOptions = Cookies.get(cookieKey);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>(initialSelectedOptions ? JSON.parse(initialSelectedOptions) : {});

  const handleOptionSelect = (
    question_number: number,
    optionNumber: number
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [question_number]: optionNumber,
      };
      // Save updated options to cookies
      Cookies.set(cookieKey, JSON.stringify(updatedOptions));
      return updatedOptions;
    });
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
      <div className="flex flex-col mx-4 mt-20 text-wrap lg:max-w-4xl lg:mx-auto underline-offset-4">
        {mondaiComponents.map(({ Component, number }) => {
          const isEightOrNine = number === 8 || number === 9;
          const filteredMondais = mondais.filter(({ mondai_number }) =>
            isEightOrNine
              ? mondai_number.toString().startsWith(number.toString())
              : Number(mondai_number) === number
          );
          const filteredQuestions = questions.filter(({ mondai_number }) =>
            isEightOrNine
              ? mondai_number.toString().startsWith(number.toString())
              : Number(mondai_number) === number
          );

          return (
            <Component
              onOptionSelect={handleOptionSelect}
              key={number}
              mondais={filteredMondais}
              questions={filteredQuestions}
              selectedOptions={selectedOptions}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default JLPTFull;
