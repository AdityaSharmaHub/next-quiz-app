// components/QuestionDisplay.tsx
import React from 'react'

interface Props {
  question: string;
}

const QuestionDisplay: React.FC<Props> = ({ question }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold">Q. {question}</h2>
    </div>
  )
}

export default QuestionDisplay
