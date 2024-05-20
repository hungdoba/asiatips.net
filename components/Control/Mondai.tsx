import NumberBox from './NumberBox';
import AnswerOption from './AnswerOption';
import { MondaiProps } from '@/utils/types';

export default function Mondai({ questions, onOptionSelect }: MondaiProps) {
  if (questions.length === 0) {
    return <p>No questions available for this mondai.</p>;
  }

  const mondai = Number(questions[0].mondai_number);

  const getHeaderText = (mondai: number) => {
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
      default:
        return '問題 未定義';
    }
  };

  const headerText = getHeaderText(mondai);

  const handleOptionSelect = (
    question_number: number,
    optionNumber: number
  ) => {
    onOptionSelect(question_number, optionNumber);
  };

  return (
    <div className="flex flex-col mb-8 md:mt-8">
      <h2 className="mb-4">{headerText}</h2>
      <div>
        {questions.map((question) => (
          <div key={question.question_number} className="mb-4">
            <div className="flex flex-row mb-2">
              <NumberBox number={question.question_number} />
              <h3>{question.question_content}</h3>
            </div>
            <AnswerOption
              question={question}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
