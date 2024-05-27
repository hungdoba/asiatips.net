import NumberBox from './NumberBox';
import AudioPlayer from './AudioPlayer';
import { useEffect, useState } from 'react';
import { QuestionChokaiComponentProps } from '@/utils/types';

// Import icons
import {
  BookmarkIcon as BookmarkIconSolid,
  LightBulbIcon as LightBulbIconSolid,
} from '@heroicons/react/24/solid';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  BookmarkIcon as BookmarkIconOutline,
  LightBulbIcon as LightBulbIconOutline,
} from '@heroicons/react/24/outline';

const Question5ChokaiComponent: React.FC<QuestionChokaiComponentProps> = ({
  chokai,
  onOptionSelect,
  selectedOptions = {},
  initialShowAnswer = false,
  showHint = false,
  showBookmark = false,
  showAllAnswer = false,
  showButtonScript = false,
}) => {
  const [selectedOptionsState, setSelectedOptionsState] = useState<{
    [key: number]: number;
  }>({});
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showExplain, setShowExplain] = useState<boolean>(false);
  const [showScript, setShowScript] = useState<boolean>(false);
  let answer1 = chokai.answer;
  let answer2 = Number(chokai.note);

  useEffect(() => {
    setShowAnswer(initialShowAnswer);
  }, [initialShowAnswer]);

  useEffect(() => {
    setSelectedOptionsState({
      [chokai.mondai_number * 100 + chokai.question_number]:
        selectedOptions[chokai.mondai_number * 100 + chokai.question_number] ??
        0,
      [chokai.mondai_number * 100 + chokai.question_number + 1]:
        selectedOptions[
          chokai.mondai_number * 100 + chokai.question_number + 1
        ] ?? 0,
    });
  }, [selectedOptions, chokai.mondai_number, chokai.question_number]);

  const getOptionClasses = (optionNumber: number, isSubQuestion?: boolean) => {
    const questionIndex =
      chokai.mondai_number * 100 +
      chokai.question_number +
      (isSubQuestion ? 1 : 0);
    const selectedOption = selectedOptionsState[questionIndex];
    const isSelected = selectedOption === optionNumber;
    const isCorrectAnswer =
      (isSubQuestion ? answer2 : answer1) === optionNumber;

    const backgroundClass = isSelected
      ? showHint && showAnswer
        ? isCorrectAnswer
          ? 'bg-cyan-300'
          : 'bg-red-300'
        : 'bg-cyan-300'
      : 'hover:bg-cyan-100';

    const borderClass =
      showAllAnswer && isCorrectAnswer
        ? 'border-green-500'
        : showHint && showAnswer && isCorrectAnswer
        ? 'border-green-500'
        : 'border-transparent';

    return `flex mb-2 px-2 rounded-lg hover:cursor-pointer border ${backgroundClass} ${borderClass}`;
  };

  const handleOptionClick = (optionNumber: number, isSubQuestion?: boolean) => {
    const questionKey =
      chokai.mondai_number * 100 +
      chokai.question_number +
      (isSubQuestion ? 1 : 0);
    const updatedOption =
      selectedOptionsState[questionKey] === optionNumber ? 0 : optionNumber;
    setSelectedOptionsState((prev) => ({
      ...prev,
      [questionKey]: updatedOption,
    }));
    onOptionSelect(
      chokai.mondai_number,
      chokai.question_number + (isSubQuestion ? 1 : 0),
      updatedOption
    );
  };

  const toggleState =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => () =>
      setter((prev) => !prev);

  function handleShowScript(): void {
    setShowScript(!showScript);
  }

  return (
    <div className="mb-4">
      <p className="mb-4 ml-2">{`${chokai.question_number}番、まず話を聞いてください。それから、二つの質問を聞いて、それぞれ問題用紙の(1)から(4)の中から、最もよいものを一つ選んでください。`}</p>
      <div className="flex flex-row mb-2">
        <NumberBox number={chokai.question_number} />
        <h3 className="mr-2">番</h3>
        <AudioPlayer
          src={`https://res.cloudinary.com/dxrsjkj8m/video/upload/v1716523175/asiatips/audio/${chokai.year}-${chokai.month}-${chokai.mondai_number}-${chokai.question_number}.mp3`}
        />
        {showBookmark && (
          <div onClick={toggleState(setBookmark)}>
            {bookmark ? (
              <BookmarkIconSolid className="w-5 h-5 ml-2 text-blue-600 cursor-pointer" />
            ) : (
              <BookmarkIconOutline className="w-5 h-5 ml-2 text-blue-600 cursor-pointer" />
            )}
          </div>
        )}

        {showButtonScript && (
          <div
            onClick={handleShowScript}
            className="cursor-pointer text-yellow-500 ml-2"
          >
            {showScript ? (
              <BarsArrowUpIcon className="w-5 h-5" />
            ) : (
              <BarsArrowDownIcon className="w-5 h-5" />
            )}
          </div>
        )}

        {showHint && (
          <div
            onClick={toggleState(setShowAnswer)}
            className="cursor-pointer text-yellow-500 ml-2"
          >
            {showAnswer ? (
              <LightBulbIconSolid className="w-5 h-5" />
            ) : (
              <LightBulbIconOutline className="w-5 h-5" />
            )}
          </div>
        )}
      </div>
      <div
        className={`w-full mb-4 border transition-all duration-300 ease-in-out overflow-hidden rounded-lg whitespace-pre-line ${
          showScript && chokai.script
            ? 'border-green-400 p-2 opacity-100 max-h-screen'
            : 'border-transparent p-0 opacity-0 max-h-0'
        }`}
      >
        {chokai.script}
      </div>

      <h3 className="mb-4 ml-2">質問１</h3>
      <QuestionSection
        questionNumber={1}
        options={[
          chokai.option_1,
          chokai.option_2,
          chokai.option_3,
          chokai.option_4,
        ]}
        getOptionClasses={getOptionClasses}
        handleOptionClick={handleOptionClick}
        showExplain={showExplain}
        showAnswer={showAnswer}
        showExplainIcon={toggleState(setShowExplain)}
        script={chokai.script}
        answer={answer1 ?? 0}
      />

      <h3 className="mb-4 ml-2">質問２</h3>
      <QuestionSection
        questionNumber={2}
        options={[
          chokai.option_1,
          chokai.option_2,
          chokai.option_3,
          chokai.option_4,
        ]}
        getOptionClasses={(optionNumber) =>
          getOptionClasses(optionNumber, true)
        }
        handleOptionClick={(optionNumber) =>
          handleOptionClick(optionNumber, true)
        }
        showExplain={showExplain}
        showAnswer={showAnswer}
        showExplainIcon={toggleState(setShowExplain)}
        script={chokai.script}
        answer={answer2 ?? 0}
      />
    </div>
  );
};

interface QuestionSectionProps {
  questionNumber: number;
  options: (string | null)[];
  getOptionClasses: (optionNumber: number) => string;
  handleOptionClick: (optionNumber: number) => void;
  showExplain: boolean;
  showAnswer: boolean;
  showExplainIcon: () => void;
  script: string;
  answer: number;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  questionNumber,
  options,
  getOptionClasses,
  handleOptionClick,
  showExplain,
  showAnswer,
  showExplainIcon,
  script,
  answer,
}) => (
  <div className="mx-2">
    <div className="flex flex-wrap justify-between">
      {options.map(
        (option, index) =>
          option && (
            <div
              key={index}
              className="flex flex-row mr-4"
              onClick={() => handleOptionClick(index + 1)}
            >
              <div className={getOptionClasses(index + 1)}>
                <div className="mr-4">{index + 1}</div>
                <div>{option}</div>
              </div>
            </div>
          )
      )}
    </div>
  </div>
);

export default Question5ChokaiComponent;
