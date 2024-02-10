// components/NextButton.tsx
import React from 'react'

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const NextButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <button
      className={`px-4 py-2 mt-10 bg-blue-500 text-white rounded-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      Next Question
    </button>
  )
}

export default NextButton
