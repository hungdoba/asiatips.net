import { ChokaiComponentProps } from '@/utils/types';
import QuestionChokaiComponent from './QuestionChokaiComponent';
import Question5ChokaiComponent from './Question5ChokaiComponent';

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

const MondaiChokaiComponent: React.FC<ChokaiComponentProps> = ({
  chokais,
  onOptionSelect,
  selectedOptions,
  showHint = true,
  showBookmark = true,
  showAllAnswer = false,
  showButtonScript = false,
}) => {
  if (chokais.length === 0) {
    return <p>No questions available for this mondai.</p>;
  }
  const mondai_number = chokais[0].mondai_number;

  function handleOptionClick(
    mondaiNumber: number,
    questionNumber: number,
    optionNumber: number
  ): void {
    onOptionSelect(mondaiNumber, questionNumber, optionNumber);
  }

  return (
    <div className="flex flex-col mb-8 md:mt-8">
      <h2 className="mb-4">{getHeaderText(mondai_number)}</h2>
      {mondai_number === 5 && (
        <p className="ml-2">
          {` 1番、${
            chokais.length > 2 ? '2番、' : ''
          }問題用紙に何も印刷されていません。まず話を聞いてください。それから、質問とせんたくしを聞いて、(1)から (4)の中から、最もよいものを一つ選んでください。 `}
        </p>
      )}
      ;
      <div>
        {chokais.map((chokai, index) =>
          chokai.mondai_number === 5 &&
          chokai.question_number === chokais.length ? (
            <Question5ChokaiComponent
              key={index}
              chokai={chokai}
              onOptionSelect={handleOptionClick}
              selectedOptions={selectedOptions}
              initialShowAnswer={false}
              showHint={showHint}
              showBookmark={showBookmark}
              showAllAnswer={showAllAnswer}
              showButtonScript={showButtonScript}
            />
          ) : (
            <QuestionChokaiComponent
              key={index}
              chokai={chokai}
              onOptionSelect={handleOptionClick}
              selectedOptions={selectedOptions}
              initialShowAnswer={false}
              showHint={showHint}
              showBookmark={showBookmark}
              showAllAnswer={showAllAnswer}
              showButtonScript={showButtonScript}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MondaiChokaiComponent;
