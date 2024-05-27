import { useState } from 'react';
import Cookies from 'js-cookie';
import { prisma } from '@/utils/db';
import SEO from '@/components/Layout/SEO';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import SettingForm from '@/components/Form/SettingForm';
import { jlpt_mondai, jlpt_question } from '@prisma/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import MondaiComponent from '@/components/Control/MondaiComponent';

// Component Props
interface JLPTProps {
  mondais: jlpt_mondai[];
  questions: jlpt_question[];
  year: string;
  month: string;
}

const JLPTFull: NextPage<JLPTProps> = ({ mondais, questions, year, month }) => {
  const [score, setScore] = useState(0);
  const cookieKey = `selected_options_${year}_${month}`;
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>({});
  const [settingShowHint, setSettingShowHint] = useState(false);
  const [settingShowBookmark, setSettingShowBookmark] = useState(false);
  const [settingShowAllAnswer, setSettingShowAllAnswer] = useState(false);

  const handleOptionSelect = (
    question_number: number,
    optionNumber: number
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [question_number]: optionNumber,
      };
      calculateScore(updatedOptions);
      // Save updated options to cookies
      Cookies.set(cookieKey, JSON.stringify(updatedOptions));
      return updatedOptions;
    });
  };

  function calculateTotalScore(): number {
    const mondaiCounts = questions.reduce((acc, chokai) => {
      acc[Number(chokai.mondai_number)] =
        (acc[Number(chokai.mondai_number)] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return (
      (mondaiCounts[1] || 0) +
      (mondaiCounts[2] || 0) +
      (mondaiCounts[3] || 0) +
      (mondaiCounts[4] || 0) * 2 +
      (mondaiCounts[5] || 0) +
      (mondaiCounts[6] || 0) +
      (mondaiCounts[7] || 0) * 3 +
      (mondaiCounts[8] || 0) * 2 +
      (mondaiCounts[9] || 0) * 2 +
      (mondaiCounts[10] || 0) * 3 +
      (mondaiCounts[11] || 0) * 3 +
      (mondaiCounts[12] || 0) * 3 +
      (mondaiCounts[13] || 0) * 3 -
      1
    );
  }

  const mondaiComponents = [
    { Component: MondaiComponent, number: 1 },
    { Component: MondaiComponent, number: 2 },
    { Component: MondaiComponent, number: 3 },
    { Component: MondaiComponent, number: 4 },
    { Component: MondaiComponent, number: 5 },
    { Component: MondaiComponent, number: 6 },
    { Component: MondaiComponent, number: 7 },
    { Component: MondaiComponent, number: 8 },
    { Component: MondaiComponent, number: 9 },
    { Component: MondaiComponent, number: 10 },
    { Component: MondaiComponent, number: 11 },
    { Component: MondaiComponent, number: 12 },
    { Component: MondaiComponent, number: 13 },
  ];

  function handleShowHint(showHint: boolean): void {
    setSettingShowHint(showHint);
  }
  function handleShowBookmark(showBookmark: boolean): void {
    setSettingShowBookmark(showBookmark);
  }

  function handleShowAllAnswer(showAllAnswer: boolean): void {
    setSettingShowAllAnswer(showAllAnswer);
  }

  function handleShowLastChosen(showLastChosen: boolean): void {
    if (showLastChosen) {
      const initialSelectedOptions = Cookies.get(cookieKey);
      if (initialSelectedOptions) {
        setSelectedOptions(JSON.parse(initialSelectedOptions));
      }
    } else {
      const resetOptions: { [key: number]: number } = {};
      for (let i = 1; i < questions.length; i++) {
        resetOptions[i] = 0;
      }
      setSelectedOptions(resetOptions);
    }
  }

  function calculateScore(selectedOptions: any): void {
    let score = 0;
    const ones = [1, 2, 3, 5, 6];
    const twos = [4, 6, 8, 9];
    const threes = [7, 10, 11, 12, 13];

    questions.forEach((question) => {
      if (question.answer === selectedOptions[question.question_number]) {
        const mondaiNumber = Math.floor(Number(question.mondai_number));
        if (ones.includes(mondaiNumber)) {
          score += 1;
        } else if (threes.includes(mondaiNumber)) {
          score += 3;
        } else if (twos.includes(mondaiNumber)) {
          score += 2;
        }
      }
    });

    // Special case, first question of mondai 7 is 2 points
    let question = questions
      .filter((question) => Number(question.mondai_number) === 7)
      .sort((a, b) => a.question_number - b.question_number)[0];
    // If this question is right then reduce final score to 1
    if (question.answer === selectedOptions[question.question_number]) {
      score = score - 1;
    }

    setScore(score);
  }

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
              key={number}
              mondais={filteredMondais}
              questions={filteredQuestions}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
              showHint={settingShowHint}
              showBookmark={settingShowBookmark}
              showAllAnswer={settingShowAllAnswer}
            />
          );
        })}
      </div>
      <SettingForm
        score={score}
        totalScore={calculateTotalScore()}
        onShowHint={handleShowHint}
        onShowBookmark={handleShowBookmark}
        onShowAllAnswer={handleShowAllAnswer}
        onShowLastChosen={handleShowLastChosen}
      />
      <Footer />
    </>
  );
};

export default JLPTFull;

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
