import NumberBox from './NumberBox';
import AnswerOption from './AnswerOption';
import { MondaiQuestionsProps } from '@/utils/types';

export default function MondaiQuestions({
  mondais,
  questions,
  onOptionSelect,
}: MondaiQuestionsProps) {
  if (questions.length === 0) {
    return <p>No questions available for this mondai.</p>;
  }

  const mondai = Number(questions[0].mondai_number);
  const mondai_indexs = Array.from({ length: mondais.length }, (_, i) => i);

  const getHeaderText = (mondai: number) => {
    switch (mondai) {
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
      {mondai_indexs.map((i) => (
        <div key={i}>
          {mondai_indexs.length > 1 && <h3 className="mb-4">({i + 1})</h3>}
          {mondai == 11 && (
            <div className="flex flex-col">
              <h3 className="mb-4">（A）</h3>
              <div className="mb-4">
                {mondais.map((mondai) => mondai.mondai_content)}
              </div>
              <h3 className="mb-4">（B）</h3>
              <div className="mb-4">{mondais.map((mondai) => mondai.note)}</div>
            </div>
          )}
          <div className="mb-4">{mondais[i].mondai_content}</div>
          {questions
            .filter(
              (question) => question.mondai_number === mondais[i].mondai_number
            )
            .map((qs) => (
              <div key={qs.question_number} className="mb-4">
                <div className="flex flex-row mb-2">
                  <NumberBox number={qs.question_number} />
                  <h3>{qs.question_content}</h3>
                </div>
                <AnswerOption
                  question={qs}
                  onOptionSelect={handleOptionSelect}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
