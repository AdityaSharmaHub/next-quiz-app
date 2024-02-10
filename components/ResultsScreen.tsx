// components/ResultsScreen.tsx
import React from 'react'

interface Props {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<Props> = ({ score, totalQuestions, onRestart }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2)

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-lg mb-2">You scored {score} out of {totalQuestions} questions.</p>
      <p className="text-lg">Percentage: {percentage}%</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  )
}

export default ResultsScreen
