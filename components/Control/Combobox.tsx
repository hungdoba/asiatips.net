import React, { ChangeEventHandler, useState } from 'react';

interface ComboboxProps {
  options?: string[];
  value: string;
  onChange: any;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const [hideOptions, setHideOptions] = useState(true);
  const handleChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedValue = e.currentTarget.textContent || '';
    setHideOptions(true);
    onChange(selectedValue);
  };

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      <button
        onClick={() => setHideOptions(!hideOptions)}
        className="w-full border border-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
        type="button"
      >
        <span>{value}</span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={`${
          hideOptions && 'hidden'
        } w-full z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow`}
      >
        <ul
          className="text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          {options &&
            options.map((option, index) => {
              if (option === value) {
                return null;
              }
              return (
                <li
                  onClick={handleChange}
                  className="border border-blue-200 rounded-lg cursor-pointer text-sm px-5 py-2.5 flex items-center justify-center"
                  key={index}
                >
                  {option}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Combobox;
