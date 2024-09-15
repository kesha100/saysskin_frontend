'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

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
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const router = useRouter()

  useEffect(() => {
    async function startQuiz() {
      try {
        const startResponse = await fetch('http://127.0.0.1:8000/api/v1/quiz/user-quizzes/1/start_quiz/', {
          method: 'POST',
        });

        if (startResponse.ok) {
          const response = await fetch('http://127.0.0.1:8000/api/v1/quiz/quizzes/');
          const data = await response.json();
          if (data.length > 0) {
            setQuizQuestions(data[0].questions);
            setAnswers(new Array(data[0].questions.length).fill(''));
          }
        } else {
          console.error("Failed to start quiz:", startResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    startQuiz();
  }, []);

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = answer;
    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishQuiz = async () => {
    try {
      const finishResponse = await fetch('http://127.0.0.1:8000/api/v1/quiz/user-quizzes/2/complete_quiz/', {
        method: 'POST',
      });

      if (finishResponse.ok) {
        console.log("Quiz completed!", answers);
        router.push('/product-recommendation');
      } else {
        console.error("Failed to complete quiz:", finishResponse.statusText);
      }
    } catch (error) {
      console.error("Error completing quiz:", error);
    }
  };

  const currentQuestion = quizQuestions[currentStep] || { question_text: '', answers: [] };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold mb-6 shadow-md">
            {currentStep + 1}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {currentQuestion.question_text}
          </h2>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          {currentQuestion.answers.map((answer, index) => (
            <Button
              key={answer.id}
              variant={answers[currentStep] === answer.answer_text ? "default" : "secondary"}
              className={`w-full max-w-md text-left justify-start px-6 py-4 text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105 ${
                answers[currentStep] === answer.answer_text 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-800 border border-purple-200 hover:border-purple-300'
              } ${
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

        <div className="flex justify-center space-x-4 mt-6">
          {currentStep > 0 && (
            <Button 
              variant="outline" 
              onClick={previousQuestion}
              className="bg-white text-purple-600 border border-purple-300 hover:bg-purple-50 transition-colors duration-300"
            >
              Go Back
            </Button>
          )}

          {currentStep < quizQuestions.length - 1 ? (
            <Button 
              variant="default" 
              onClick={nextQuestion}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-colors duration-300"
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={finishQuiz}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-colors duration-300"
            >
              Finish Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}