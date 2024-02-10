"use client"

// pages/index.tsx
import { useState, useEffect } from 'react'
import WelcomeScreen from '../components/WelcomeScreen'
import QuestionDisplay from '../components/QuestionDisplay'
import Options from '../components/Options'
import NextButton from '../components/NextButton'
import ResultsScreen from '../components/ResultsScreen'

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface SelectedOptions {
  [key: number]: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    question: 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
    correctAnswer: 'H2O',
  },
  {
    id: 4,
    question: 'Who wrote the famous play "Romeo and Juliet"?',
    options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
  },
  {
    id: 5,
    question: 'Who is the Prime Minister of India?',
    options: ['Adityanath Yogi', 'Rahul Gandhi', 'Narendra Modi', 'Amit Shah'],
    correctAnswer: 'Narendra Modi',
  },
  // Add more questions as needed
]

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  // const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [score, setScore] = useState<number>(0)
  const [showResults, setShowResults] = useState<boolean>(false)

  useEffect(() => {
    try {
      const savedOptions = JSON.parse(localStorage.getItem('quizSelectedOptions') || '{}');
      setSelectedOptions(savedOptions);
    } catch (error) {
      console.error('Error parsing saved options:', error);
      // Handle errors gracefully (e.g., reset state or use default values)
    }
  
    const savedQuestionIndex = parseInt(localStorage.getItem('quizCurrentQuestionIndex') || '0');
    if (!isNaN(savedQuestionIndex)) {
      setCurrentQuestionIndex(savedQuestionIndex);
    }
  }, []);

  

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    Object.fromEntries(questions.map(question => [question.id, '']))
  );

  const saveState = () => {
    localStorage.setItem('quizSelectedOptions', JSON.stringify(selectedOptions))
    localStorage.setItem('quizCurrentQuestionIndex', currentQuestionIndex.toString())
  }

  useEffect(() => {
    saveState()
  }, [selectedOptions, currentQuestionIndex])

  const handleOptionSelect = (option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option,
    })
  }

  const handleNextQuestion = () => {
    if (selectedOptions[currentQuestionIndex] === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptions({})
    setScore(0)
    setShowResults(false)
    localStorage.removeItem('quizSelectedOptions')
    localStorage.removeItem('quizCurrentQuestionIndex')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white px-4">
      {!showResults && (
        <>
          <WelcomeScreen />
          <QuestionDisplay question={questions[currentQuestionIndex].question} />
          <Options
            options={questions[currentQuestionIndex].options}
            selectedOption={selectedOptions[currentQuestionIndex]}
            onSelect={handleOptionSelect}
          />
          <NextButton onClick={handleNextQuestion} disabled={!selectedOptions[currentQuestionIndex]} />
        </>
      )}
      {showResults && (
        <ResultsScreen score={score} totalQuestions={questions.length} onRestart={handleRestartQuiz} />
      )}
    </div>
  )
}
