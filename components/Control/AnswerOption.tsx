import { useState } from 'react';
import { jlpt_question } from '@prisma/client';
import { renderJLPTContent } from '@/utils/render';

interface AnswerOptionProps {
  question: jlpt_question;
  onOptionSelect: (question_number: number, optionNumber: number) => void;
}

function AnswerOption({ question, onOptionSelect }: AnswerOptionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (optionNumber: number) => {
    setSelectedOption(optionNumber);
    onOptionSelect(question.question_number, optionNumber);
  };

  const optionClasses = (optionNumber: number) =>
    `flex mr-4 mb-2 px-2 rounded-lg hover:cursor-pointer ${
      selectedOption === optionNumber ? 'bg-cyan-300' : 'hover:bg-cyan-100'
    }`;

  return (
    <div className="flex flex-wrap justify-between mx-2">
      <div className={optionClasses(1)} onClick={() => handleOptionClick(1)}>
        <div className="mr-4">1</div>
        <div>{renderJLPTContent(question.option_1)}</div>
      </div>
      <div className={optionClasses(2)} onClick={() => handleOptionClick(2)}>
        <div className="mr-4">2</div>
        <div>{renderJLPTContent(question.option_2)}</div>
      </div>
      <div className={optionClasses(3)} onClick={() => handleOptionClick(3)}>
        <div className="mr-4">3</div>
        <div>{renderJLPTContent(question.option_3)}</div>
      </div>
      <div className={optionClasses(4)} onClick={() => handleOptionClick(4)}>
        <div className="mr-4">4</div>
        <div>{renderJLPTContent(question.option_4)}</div>
      </div>
    </div>
  );
}

export default AnswerOption;
