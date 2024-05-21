import React from 'react';
import NumberBox from './NumberBox';
import AnswerOption from './AnswerOption';
import { MondaiComponentProps } from '@/utils/types';
import { renderJLPTContent } from '@/utils/render';
import { LightBulbIcon } from '@heroicons/react/24/outline';

const getHeaderText = (
  mondai: number,
  questions: { question_number: number }[]
): string => {
  switch (mondai) {
    case 1:
      return '問題１　＿＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。';
    case 2:
      return '問題２（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。';
    case 3:
      return '問題３　＿＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。';
    case 4:
      return '問題４　次の言葉の近い方として最もよいものを、１・２・３・４から一つ選びなさい。';
    case 5:
      return '問題５　次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。';
    case 6:
      return '問題６　次の文の＿★＿に入る最もよいものを、１・２・３・４から一つ選びなさい。';
    case 7:
      return `問題７　次の文章を読んで、${questions[0].question_number}から${
        questions[questions.length - 1].question_number
      } の中に入る最もよいものを、１・２・３・４から一つ選びなさい。`;
    case 8.1:
      return '問題８　次の（１）～（４）の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。';
    case 9.1:
      return '問題９　次の（１）～（３）の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。';
    case 10:
      return '問題１０　次の（１）～（３）の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。';
    case 11:
      return '問題１１　AとBの両方を読んで、後の問いに対する答えとして、最もよいものを、１・２・３・４から一つ選びなさい。';
    case 12:
      return '問題１２　次の（１）～（３）の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。';
    case 13:
      return '問題１３　次の（１）～（３）の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。';
    default:
      return '問題 未定義';
  }
};

const MondaiComponent: React.FC<MondaiComponentProps> = ({
  mondais,
  questions,
  onOptionSelect,
  selectedOptions,
}) => {
  if (questions.length === 0) {
    return <p>No questions available for this mondai.</p>;
  }

  const mondai = Number(questions[0].mondai_number);
  const mondaiIndexs = Array.from({ length: mondais.length }, (_, i) => i);
  const headerText = getHeaderText(mondai, questions);

  const handleOptionSelect = (questionNumber: number, optionNumber: number) => {
    onOptionSelect(questionNumber, optionNumber);
  };

  return (
    <div className="flex flex-col mb-8 md:mt-8">
      <h2 className="mb-4">{headerText}</h2>
      {mondai < 7 ? (
        <div>
          {questions.map((question) => (
            <div key={question.question_number} className="mb-4">
              <div className="flex flex-row mb-2">
                <NumberBox number={question.question_number} />
                <h3>{renderJLPTContent(question.question_content)}</h3>
                <LightBulbIcon className="w-5 h-5 text-yellow-500 cursor-pointer rounded-xl hover:bg-yellow-200" />
              </div>
              <AnswerOption
                selectedOptions={selectedOptions}
                question={question}
                onOptionSelect={handleOptionSelect}
              />
            </div>
          ))}
        </div>
      ) : (
        mondaiIndexs.map((i) => (
          <div key={i}>
            {mondaiIndexs.length > 1 && <h3 className="mb-4">({i + 1})</h3>}
            {mondai === 11 && (
              <div className="flex flex-col">
                <h3 className="mb-4">（A）</h3>
                <div className="mb-4">
                  {mondais.map((mondai) => mondai.mondai_content)}
                </div>
                <h3 className="mb-4">（B）</h3>
                <div className="mb-4">
                  {mondais.map((mondai) => mondai.note)}
                </div>
              </div>
            )}
            <div className="mb-4">{mondais[i].mondai_content}</div>
            {questions
              .filter(
                (question) =>
                  question.mondai_number === mondais[i].mondai_number
              )
              .map((qs) => (
                <div key={qs.question_number} className="mb-4">
                  <div className="flex flex-row mb-2">
                    <NumberBox number={qs.question_number} />
                    <h3>{qs.question_content}</h3>
                  </div>
                  <AnswerOption
                    selectedOptions={selectedOptions}
                    question={qs}
                    onOptionSelect={handleOptionSelect}
                  />
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MondaiComponent;
