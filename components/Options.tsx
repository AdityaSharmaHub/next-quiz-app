// components/Options.tsx
import React from 'react'

interface Props {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const Options: React.FC<Props> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex flex-col w-[300px] space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          className={`p-3 rounded-md border ${
            selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
          }`}
          onClick={() => onSelect(option)}
        >
          {index+1}. {option}
        </button>
      ))}
    </div>
  )
}

export default Options
