import { useEffect, useState } from 'react';
import { renderJLPTContent } from '@/utils/render';
import {
  LightBulbIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { QuestionComponentProps } from '@/utils/types';
import NumberBox from './NumberBox';

function QuestionComponent({
  question,
  onOptionSelect,
  selectedOptions = {},
  initialShowAnswer = false,
  showHint = false,
  showAllAnswer = false,
}: QuestionComponentProps) {
  const [selectedOption, setSelectedOption] = useState<
    number | null | undefined
  >(null);
  const [showExplain, setShowExplain] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    setShowAnswer(initialShowAnswer);
  }, [initialShowAnswer]);

  useEffect(() => {
    setSelectedOption(selectedOptions[question.question_number] ?? null);
  }, [selectedOptions]);

  const handleOptionClick = (optionNumber: number) => {
    if (selectedOption === optionNumber) {
      optionNumber = 0;
    }
    setSelectedOption(optionNumber);
    onOptionSelect(question.question_number, optionNumber);
  };

  const optionClasses = (optionNumber: number) =>
    `flex  mb-2 px-2 rounded-lg hover:cursor-pointer border 
    ${
      selectedOption === optionNumber
        ? showHint && showAnswer && question.answer !== optionNumber
          ? 'bg-red-300'
          : 'bg-cyan-300'
        : 'hover:bg-cyan-100'
    } 
    ${
      showAllAnswer && question.answer === optionNumber
        ? ' border-green-500'
        : showHint && showAnswer && question.answer === optionNumber
        ? ' border-green-500'
        : ' border-transparent'
    }`;

  const explainClasses = (optionNumber: number) =>
    `flex h-6 w-6 text-green-500 ml-2 cursor-pointer rounded-xl hover:bg-green-200 ${
      showAnswer && question.explaination && question.answer === optionNumber
        ? 'block'
        : 'hidden'
    } ${showExplain && ' bg-green-200'}`;

  function handleShowExpain(): void {
    setShowExplain(!showExplain);
  }

  function handleShowAnswer(): void {
    setShowAnswer(!showAnswer);
  }

  return (
    <div className="mb-4">
      <div className="flex flex-row mb-2">
        <NumberBox number={question.question_number} />
        <h3>{renderJLPTContent(question.question_content)}</h3>
        <LightBulbIcon
          className={`w-5 h-5 text-yellow-500 cursor-pointer rounded-xl hover:bg-yellow-200 ${
            showAnswer && 'bg-yellow-200'
          } ${showHint ? ' block' : ' hidden'}`}
          onClick={handleShowAnswer}
        />
      </div>
      <div className="mx-2">
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-row mr-4">
            <div
              className={optionClasses(1)}
              onClick={() => handleOptionClick(1)}
            >
              <div className="mr-4">1</div>
              <div>{renderJLPTContent(question.option_1)}</div>
            </div>
            <QuestionMarkCircleIcon
              className={explainClasses(1)}
              onClick={handleShowExpain}
            />
          </div>
          <div className="flex flex-row mr-4">
            <div
              className={optionClasses(2)}
              onClick={() => handleOptionClick(2)}
            >
              <div className="mr-4">2</div>
              <div>{renderJLPTContent(question.option_2)}</div>
            </div>
            <QuestionMarkCircleIcon
              className={explainClasses(2)}
              onClick={handleShowExpain}
            />
          </div>
          <div className="flex flex-row mr-4">
            <div
              className={optionClasses(3)}
              onClick={() => handleOptionClick(3)}
            >
              <div className="mr-4">3</div>
              <div>{renderJLPTContent(question.option_3)}</div>
            </div>
            <QuestionMarkCircleIcon
              className={explainClasses(3)}
              onClick={handleShowExpain}
            />
          </div>
          <div className="flex flex-row mr-4">
            <div
              className={optionClasses(4)}
              onClick={() => handleOptionClick(4)}
            >
              <div className="mr-4">4</div>
              <div>{renderJLPTContent(question.option_4)}</div>
            </div>
            <QuestionMarkCircleIcon
              className={explainClasses(4)}
              onClick={handleShowExpain}
            />
          </div>
        </div>
        <div
          className={`border transition-all duration-300 ease-in-out overflow-hidden rounded-lg ${
            showExplain && question.explaination
              ? 'border-green-400 p-2 opacity-100 max-h-screen'
              : 'border-transparent p-0 opacity-0 max-h-0'
          }`}
        >
          {question.explaination}
        </div>
      </div>
    </div>
  );
}

export default QuestionComponent;