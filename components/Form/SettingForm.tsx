import { useState } from 'react';
import { SettingFormProps } from '@/utils/types';
import {
  BarsArrowDownIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

function SettingForm({
  isChokai = false,
  score = 0,
  totalScore = 0,
  onShowHint,
  onShowAllAnswer,
  onShowLastChosen,
  onShowBookmark,
  onShowButtonScript,
}: SettingFormProps) {
  const { t } = useTranslation();

  const [minimize, setMinimize] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showAllAnswer, setShowAllAnswer] = useState(false);
  const [showLastChosen, setShowLastChosen] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showButtonScript, setShowButtonScript] = useState(false);

  function handleChangeShowHint(): void {
    setShowHint(!showHint);
    onShowHint(!showHint);
  }
  function handleChangeShowBookmark(): void {
    setShowBookmark(!showBookmark);
    onShowBookmark(!showBookmark);
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

  function handleMinimize(): void {
    setMinimize(!minimize);
  }

  function handleChangeShowButtonScript(): void {
    setShowButtonScript(!showButtonScript);
    if (onShowButtonScript) {
      onShowButtonScript(!showButtonScript);
    }
  }

  return (
    <div>
      <div
        className={`fixed bottom-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full hover:cursor-pointer ${
          minimize && ' bg-blue-200 bg-opacity-30 backdrop-blur-md'
        }`}
        onClick={handleMinimize}
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </div>
      <div className="fixed bottom-4 right-4 z-40">
        <div
          className={`w-full p-4 transition-all duration-300 ease-in-out overflow-hidden  bg-blue-200 bg-opacity-50 backdrop-blur-lg border ${
            minimize
              ? 'p-0 opacity-0 max-h-0 max-w-0'
              : 'p-2 opacity-100 max-h-screen max-w-screen-xl'
          }`}
        >
          {isChokai && (
            <div className="flex mb-2">
              <div className="flex items-center h-5">
                <input
                  aria-describedby="helper-checkbox-text"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  checked={showButtonScript}
                  onChange={handleChangeShowButtonScript}
                ></input>
              </div>
              <div className="ms-2 text-sm">
                <div className="flex flex-row items-center">
                  <label className="mr-2 font-medium text-gray-900">
                    {t('setting:showScript')}
                  </label>
                  <BarsArrowDownIcon className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-xs font-normal text-gray-500">
                  {t('setting:showScriptDetail')}
                </p>
              </div>
            </div>
          )}

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
                  {t('setting:showScript')}
                </label>
                <LightBulbIcon className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-xs font-normal text-gray-500">
                {t('setting:showScriptDetail')}
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
                checked={showBookmark}
                onChange={handleChangeShowBookmark}
              ></input>
            </div>
            <div className="ms-2 text-sm">
              <div className="flex flex-row items-center">
                <label className="mr-2 font-medium text-gray-900">
                  {t('setting:showBookmark')}
                </label>
                <BookmarkIcon className="w-4 h-4 text-blue-700" />
              </div>
              <p className="text-xs font-normal text-gray-500">
                {t('setting:showBookmarkDetail')}
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
                  {t('setting:showAllResult')}
                </label>
                <div className="border border-green-500 rounded-lg px-2">
                  ...
                </div>
              </div>
              <p className="text-xs font-normal text-gray-500">
                {t('setting:showAllResultDetail')}
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
                  {t('setting:showSelectedResult')}
                </label>
                <div className="bg-cyan-300 rounded-lg px-2">...</div>
              </div>
              <p className="text-xs font-normal text-gray-500">
                {t('setting:showSelectedResultDetail')}
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
                  {t('setting:finalScore')}
                  {`
              : ${showScore ? score : '---'}/${totalScore}
              `}
                </label>
              </div>
              <p className="text-xs font-normal text-gray-500">
                {t('setting:finalScoreDetail')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingForm;
