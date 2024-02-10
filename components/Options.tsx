// components/Options.tsx
import React from 'react'

interface Props {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const Options: React.FC<Props> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex flex-col w-full max-w-[350px] space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          className={`p-3 rounded-md border-2 text-black text-left border-gray-400 ${
            selectedOption === option ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-black'
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
