import { SettingFormProps } from '@/utils/types';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function SettingForm({ onShowHint }: SettingFormProps) {
  const [showHint, setShowHint] = useState(false);

  function handleChangeShowHint(): void {
    setShowHint(!showHint);
    onShowHint(!showHint);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex">
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
    </div>
  );
}

export default SettingForm;
