import React, { ChangeEventHandler } from 'react';

const Dropdown: React.FC<{
  options: string[];
  selectedValue: string;
  handleSelect: ChangeEventHandler<HTMLSelectElement>;
}> = ({ options, selectedValue, handleSelect }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <select
        onChange={handleSelect}
        value={selectedValue || ''}
        className="w-full  border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
