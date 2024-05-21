import { useEffect, useState } from 'react';
import { jlpt_question } from '@prisma/client';
import { renderJLPTContent } from '@/utils/render';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface AnswerOptionProps {
  question: jlpt_question;
  onOptionSelect: (question_number: number, optionNumber: number) => void;
  selectedOptions?: { [key: number]: number };
  showAnswer?: boolean | null;
}

function AnswerOption({
  question,
  onOptionSelect,
  selectedOptions = {},
  showAnswer = true,
}: AnswerOptionProps) {
  const [selectedOption, setSelectedOption] = useState<
    number | null | undefined
  >(null);
  const [showExplain, setShowExplain] = useState<boolean>(false);

  useEffect(() => {
    if (
      selectedOptions &&
      selectedOptions[question.question_number] != undefined
    ) {
      setSelectedOption(selectedOptions[question.question_number]);
    }
  }, [selectedOptions]);

  const handleOptionClick = (optionNumber: number) => {
    if (selectedOption === optionNumber) {
      optionNumber = 0;
    }
    setSelectedOption(optionNumber);
    onOptionSelect(question.question_number, optionNumber);
  };

  const optionClasses = (optionNumber: number) =>
    `flex  mb-2 px-2 rounded-lg hover:cursor-pointer border ${
      selectedOption === optionNumber
        ? showAnswer && question.answer !== optionNumber
          ? 'bg-red-300'
          : 'bg-cyan-300'
        : 'hover:bg-cyan-100'
    } ${
      showAnswer && question.answer === optionNumber
        ? ' border-green-500'
        : 'border-transparent'
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

  return (
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
  );
}

export default AnswerOption;
