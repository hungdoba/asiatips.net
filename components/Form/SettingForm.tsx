import { useState } from 'react';
import { SettingFormProps } from '@/utils/types';
import { LightBulbIcon } from '@heroicons/react/24/outline';

function SettingForm({
  score = 0,
  onShowHint,
  onShowAllAnswer,
  onShowLastChosen,
}: SettingFormProps) {
  const [showHint, setShowHint] = useState(false);
  const [showAllAnswer, setShowAllAnswer] = useState(false);
  const [showLastChosen, setShowLastChosen] = useState(false);
  const [showScore, setShowScore] = useState(false);

  function handleChangeShowHint(): void {
    setShowHint(!showHint);
    onShowHint(!showHint);
  }

  function handleChangeShowAllAnswer(): void {
    setShowAllAnswer(!showAllAnswer);
    onShowAllAnswer(!showAllAnswer);
  }

  function handleChangeShowLastChosen(): void {
    setShowLastChosen(!showLastChosen);
    onShowLastChosen(!showLastChosen);
  }

  function handleChangeShowScore(): void {
    setShowScore(!showScore);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex mb-2">
        <div className="flex items-center h-5">
          <input
            aria-describedby="helper-checkbox-text"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            checked={showHint}
            onChange={handleChangeShowHint}
          ></input>
        </div>
        <div className="ms-2 text-sm">
          <div className="flex flex-row items-center">
            <label className="mr-2 font-medium text-gray-900">
              Hiển thị hint
            </label>
            <LightBulbIcon className="w-4 h-4 text-yellow-600" />
          </div>
          <p className="text-xs font-normal text-gray-500">
            Click vào button đó để hiển thị đáp án
          </p>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex items-center h-5">
          <input
            aria-describedby="helper-checkbox-text"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            checked={showAllAnswer}
            onChange={handleChangeShowAllAnswer}
          ></input>
        </div>
        <div className="ms-2 text-sm">
          <div className="flex flex-row items-center">
            <label className="mr-2 font-medium text-gray-900">
              Hiển thị toàn bộ đáp án
            </label>
            <div className="border border-green-500 rounded-lg px-2">...</div>
          </div>
          <p className="text-xs font-normal text-gray-500">
            Toàn bộ đáp án sẽ được hiển thị
          </p>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex items-center h-5">
          <input
            aria-describedby="helper-checkbox-text"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            checked={showLastChosen}
            onChange={handleChangeShowLastChosen}
          ></input>
        </div>
        <div className="ms-2 text-sm">
          <div className="flex flex-row items-center">
            <label className="mr-2 font-medium text-gray-900">
              Hiển thị đáp án đã lựa chọn
            </label>
            <div className="bg-cyan-300 rounded-lg px-2">...</div>
          </div>
          <p className="text-xs font-normal text-gray-500">
            Các lựa chọn trước đây sẽ được hiển thị lại
          </p>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex items-center h-5">
          <input
            aria-describedby="helper-checkbox-text"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            checked={showScore}
            onChange={handleChangeShowScore}
          ></input>
        </div>
        <div className="ms-2 text-sm">
          <div className="flex flex-row items-center">
            <label className="mr-2 font-medium text-gray-900">
              {`
              Tổng điểm: ${showScore ? score : '---'}/180
              `}
            </label>
            <div>{`${
              showScore ? (score > 80 ? '(đậu)' : '(trượt)') : '(---)'
            }`}</div>
          </div>
          <p className="text-xs font-normal text-gray-500">
            Ẩn và hiển thị tổng điểm
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingForm;
