import Cookies from 'js-cookie';
import { useState } from 'react';
import { prisma } from '@/utils/db';
import SEO from '@/components/Layout/SEO';
import { jlpt_chokai } from '@prisma/client';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import MondaiChokaiComponent from '@/components/Control/MondaiChokaiComponent';
import SettingChokaiForm from '@/components/Form/SettingChokaiForm';

// Component Props
interface JLPTChokai {
  chokais: jlpt_chokai[];
  year: string;
  month: string;
}

const JLPTChokai: NextPage<JLPTChokai> = ({ chokais, year, month }) => {
  const [score, setScore] = useState(0);

  const cookieKey = `selected_options_chokai_${year}_${month}`;
  const compositeKey = (mondaiNumber: number, questionNumber: number) =>
    mondaiNumber * 100 + questionNumber;

  let sortedChokais = chokais.sort(
    (a, b) => a.question_number - b.question_number
  );

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>({});

  const [settingShowHint, setSettingShowHint] = useState(false);
  const [settingShowBookmark, setSettingShowBookmark] = useState(false);
  const [settingShowAllAnswer, setSettingShowAllAnswer] = useState(false);
  const [settingShowButtonScript, setSettingShowButtonScript] = useState(false);

  const mondaiComponents = [
    { Component: MondaiChokaiComponent, mondai_number: 1 },
    { Component: MondaiChokaiComponent, mondai_number: 2 },
    { Component: MondaiChokaiComponent, mondai_number: 3 },
    { Component: MondaiChokaiComponent, mondai_number: 4 },
    { Component: MondaiChokaiComponent, mondai_number: 5 },
  ];

  const handleOptionSelect = (
    mondaiNumber: number,
    questionNumber: number,
    optionNumber: number
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [compositeKey(mondaiNumber, questionNumber)]: optionNumber,
      };
      calculateScore(updatedOptions);
      // Save updated options to cookies
      Cookies.set(cookieKey, JSON.stringify(updatedOptions));
      return updatedOptions;
    });
  };

  function handleShowHint(showHint: boolean): void {
    setSettingShowHint(showHint);
  }
  function handleShowBookmark(showBookmark: boolean): void {
    setSettingShowBookmark(showBookmark);
  }

  function handleShowAllAnswer(showAllAnswer: boolean): void {
    setSettingShowAllAnswer(showAllAnswer);
  }

  function handleShowButtonScript(showButtonScript: boolean): void {
    setSettingShowButtonScript(showButtonScript);
  }

  function handleShowLastChosen(showLastChosen: boolean): void {
    if (showLastChosen) {
      const initialSelectedOptions = Cookies.get(cookieKey);
      if (initialSelectedOptions) {
        setSelectedOptions(JSON.parse(initialSelectedOptions));
      }
    } else {
      const resetOptions: { [key: number]: number } = {};
      for (let i = 1; i < chokais.length; i++) {
        resetOptions[i] = 0;
      }
      setSelectedOptions(resetOptions);
    }
  }

  function calculateTotalScore(): number {
    const mondaiCounts = chokais.reduce((acc, chokai) => {
      acc[chokai.mondai_number] = (acc[chokai.mondai_number] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return (
      (mondaiCounts[1] || 0) * 2 +
      (mondaiCounts[2] || 0) +
      (mondaiCounts[3] || 0) * 2 +
      (mondaiCounts[4] || 0) +
      (mondaiCounts[5] || 0) * 3 +
      3
    );
  }

  function calculateScore(selectedOptions: any): void {
    let score = 0;
    const ones = new Set([2, 4]);
    const twos = new Set([1, 3]);
    const threes = new Set([5]);

    sortedChokais.forEach((question) => {
      const mondaiNumber = Math.floor(Number(question.mondai_number));
      const questionKey =
        question.mondai_number * 100 + question.question_number;

      if (question.answer === selectedOptions[questionKey]) {
        if (ones.has(mondaiNumber)) {
          score += 1;
        } else if (twos.has(mondaiNumber)) {
          score += 2;
        } else if (threes.has(mondaiNumber)) {
          score += 3;
        }
      }
    });

    // Special final question
    const finalQuestion = chokais
      .filter((chokai) => chokai.mondai_number === 5)
      .sort((a, b) => a.question_number - b.question_number)
      .pop();

    if (finalQuestion) {
      const finalQuestionKey =
        finalQuestion.mondai_number * 100 + finalQuestion.question_number + 1;
      if (Number(finalQuestion.note) === selectedOptions[finalQuestionKey]) {
        score += 3;
      }
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
        {mondaiComponents.map(({ Component, mondai_number }) => {
          let chokais = sortedChokais.filter(
            (chokai) => chokai.mondai_number === mondai_number
          );
          return (
            <Component
              key={mondai_number}
              chokais={chokais}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
              showHint={settingShowHint}
              showBookmark={settingShowBookmark}
              showAllAnswer={settingShowAllAnswer}
              showButtonScript={settingShowButtonScript}
            />
          );
        })}
      </div>
      <SettingChokaiForm
        score={score}
        totalScore={calculateTotalScore()}
        onShowHint={handleShowHint}
        onShowBookmark={handleShowBookmark}
        onShowAllAnswer={handleShowAllAnswer}
        onShowLastChosen={handleShowLastChosen}
        onShowButtonScript={handleShowButtonScript}
      />
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
