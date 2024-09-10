'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface Answer {
  id: number
  answer_text: string
  tags: number[]
}

interface Question {
  id: number
  question_text: string
  question_order: number
  answers: Answer[]
}

interface Quiz {
  id: number
  quiz_name: string
  questions: Question[]
}

export default function SkinQuiz() {
  const [currentStep, setCurrentStep] = useState(0) // Track current step
  const [answers, setAnswers] = useState<string[]>([]) // Store answers for each question
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]) // Store quiz questions

  // Fetch quiz data from API
  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/quiz/quizzes/');
        const data = await response.json();
        if (data.length > 0) {
          setQuizQuestions(data[0].questions); // Assuming you want the first quiz
          setAnswers(new Array(data[0].questions.length).fill('')); // Initialize answers
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }
    fetchQuizData();
  }, [])

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentStep] = answer // Save the selected answer
    setAnswers(updatedAnswers)
  }

  const nextQuestion = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Quiz completed!", answers)
    }
  }

  const previousQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = quizQuestions[currentStep] || { question_text: '', answers: [] }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white text-xl font-bold mb-6">
            {currentStep + 1}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {currentQuestion.question_text}
          </h2>
        </div>

        {/* Display options */}
        <div className="space-y-4 flex flex-col items-center">
          {currentQuestion.answers.map((answer, index) => (
            <Button
              key={answer.id}
              variant={answers[currentStep] === answer.answer_text ? "default" : "secondary"} // Highlight selected option
              className={`w-full max-w-md text-left justify-start px-6 py-4 text-sm md:text-base ${
                index === 0 ? 'md:w-3/4' :
                index === 1 ? 'md:w-4/5' :
                index === 2 ? 'md:w-11/12' : 'md:w-full'
              }`}
              onClick={() => handleAnswer(answer.answer_text)}
            >
              {answer.answer_text}
            </Button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {/* Go Back Button */}
          {currentStep > 0 && (
            <Button variant="secondary" onClick={previousQuestion}>
              Go Back
            </Button>
          )}

          {/* Next Button */}
          {currentStep < quizQuestions.length - 1 ? (
            <Button variant="secondary" onClick={nextQuestion}>
              Next
            </Button>
          ) : (
            <Button variant="default" onClick={() => console.log("Quiz completed!", answers)}>
              Finish Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
