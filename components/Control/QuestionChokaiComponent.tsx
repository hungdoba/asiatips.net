import React, { useEffect, useState } from 'react';
import NumberBox from './NumberBox';
import AudioPlayer from './AudioPlayer';
import { QuestionChokaiComponentProps } from '@/utils/types';

// Import icons
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { LightBulbIcon as LightBulbIconSolid } from '@heroicons/react/24/solid';
import { LightBulbIcon as LightBulbIconOutline } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon as QuestionMarkCircleIconSolid } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon as QuestionMarkCircleIconOutline } from '@heroicons/react/24/outline';

const QuestionChokaiComponent: React.FC<QuestionChokaiComponentProps> = ({
  chokai,
  onOptionSelect,
  selectedOptions = {},
  initialShowAnswer = false,
  showHint = false,
  showBookmark = false,
  showAllAnswer = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    number | null | undefined
  >(null);
  const [showExplain, setShowExplain] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);

  useEffect(() => {
    setShowAnswer(initialShowAnswer);
  }, [initialShowAnswer]);

  useEffect(() => {
    setSelectedOption(selectedOptions[chokai.question_number] ?? null);
  }, [selectedOptions]);

  const optionClasses = (optionNumber: number) =>
    `flex  mb-2 px-2 rounded-lg hover:cursor-pointer border 
    ${
      selectedOption === optionNumber
        ? showHint && showAnswer && chokai.answer !== optionNumber
          ? 'bg-red-300'
          : 'bg-cyan-300'
        : 'hover:bg-cyan-100'
    } 
    ${
      showAllAnswer && chokai.answer === optionNumber
        ? ' border-green-500'
        : showHint && showAnswer && chokai.answer === optionNumber
        ? ' border-green-500'
        : ' border-transparent'
    }`;

  const handleOptionClick = (optionNumber: number) => {
    if (selectedOption === optionNumber) {
      optionNumber = 0;
    }
    setSelectedOption(optionNumber);
    onOptionSelect(chokai.mondai_number, chokai.question_number, optionNumber);
  };

  function handleShowExpain(): void {
    setShowExplain(!showExplain);
  }

  function handleShowAnswer(): void {
    setShowAnswer(!showAnswer);
  }

  function handleBookmark(): void {
    setBookmark(!bookmark);
  }

  return (
    <div className="mb-4">
      <div className="flex flex-row mb-2">
        <NumberBox number={chokai.question_number} />
        <h3 className="mr-2">番</h3>
        <AudioPlayer
          src={`https://res.cloudinary.com/dxrsjkj8m/video/upload/v1716523175/asiatips/audio/${chokai.year}-${chokai.month}-${chokai.mondai_number}-${chokai.question_number}.mp3`}
        />
        {showBookmark && (
          <div>
            {bookmark ? (
              <BookmarkIconSolid
                className="w-5 h-5 ml-2 text-blue-600 cursor-pointer"
                onClick={handleBookmark}
              />
            ) : (
              <BookmarkIconOutline
                className="w-5 h-5 ml-2 text-blue-600 cursor-pointer"
                onClick={handleBookmark}
              />
            )}
          </div>
        )}

        {showHint && (
          <div
            onClick={handleShowAnswer}
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
      <div className="mx-2">
        <div className="flex flex-wrap justify-between">
          <div
            className="flex flex-row mr-4"
            onClick={() => handleOptionClick(1)}
          >
            <div className={optionClasses(1)}>
              <div className="mr-4">1</div>
              <div>{chokai.option_1}</div>
            </div>
            {showAnswer && chokai.script && chokai.answer === 1 && (
              <div
                onClick={handleShowExpain}
                className="flex h-6 w-6 text-green-500 ml-2 cursor-pointer rounded-xl"
              >
                {showExplain ? (
                  <QuestionMarkCircleIconSolid />
                ) : (
                  <QuestionMarkCircleIconOutline />
                )}
              </div>
            )}
          </div>
          <div
            className="flex flex-row mr-4"
            onClick={() => handleOptionClick(2)}
          >
            <div className={optionClasses(2)}>
              <div className="mr-4">2</div>
              <div>{chokai.option_2}</div>
            </div>
            {showAnswer && chokai.script && chokai.answer === 2 && (
              <div
                onClick={handleShowExpain}
                className="flex h-6 w-6 text-green-500 ml-2 cursor-pointer rounded-xl"
              >
                {showExplain ? (
                  <QuestionMarkCircleIconSolid />
                ) : (
                  <QuestionMarkCircleIconOutline />
                )}
              </div>
            )}
          </div>
          <div
            className="flex flex-row mr-4"
            onClick={() => handleOptionClick(3)}
          >
            <div className={optionClasses(3)}>
              <div className="mr-4">3</div>
              <div>{chokai.option_3}</div>
            </div>
            {showAnswer && chokai.script && chokai.answer === 3 && (
              <div
                onClick={handleShowExpain}
                className="flex h-6 w-6 text-green-500 ml-2 cursor-pointer rounded-xl"
              >
                {showExplain ? (
                  <QuestionMarkCircleIconSolid />
                ) : (
                  <QuestionMarkCircleIconOutline />
                )}
              </div>
            )}
          </div>
          {chokai.mondai_number != 4 && (
            <div
              className="flex flex-row mr-4"
              onClick={() => handleOptionClick(4)}
            >
              <div className={optionClasses(4)}>
                <div className="mr-4">4</div>
                <div>{chokai.option_4}</div>
              </div>
              {showAnswer && chokai.script && chokai.answer === 4 && (
                <div
                  onClick={handleShowExpain}
                  className="flex h-6 w-6 text-green-500 ml-2 cursor-pointer rounded-xl"
                >
                  {showExplain ? (
                    <QuestionMarkCircleIconSolid />
                  ) : (
                    <QuestionMarkCircleIconOutline />
                  )}
                </div>
              )}
            </div>
          )}
          <div
            className={`w-full mb-4 border transition-all duration-300 ease-in-out overflow-hidden rounded-lg whitespace-pre-line ${
              showExplain && chokai.script
                ? 'border-green-400 p-2 opacity-100 max-h-screen'
                : 'border-transparent p-0 opacity-0 max-h-0'
            }`}
          >
            {chokai.script}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionChokaiComponent;
