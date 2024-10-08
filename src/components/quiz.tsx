"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Answer {
  id: number;
  answer_text: string;
  tags: number[];
}

interface Question {
  id: number;
  question_text: string;
  question_order: number;
  answers: Answer[];
}

interface Quiz {
  id: number;
  quiz_name: string;
  questions: Question[];
}

export default function SkinQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function startQuiz() {
      try {
        const startResponse = await fetch(
          "https://saysskin.onrender.com/api/v1/quiz/user-quizzes/1/start_quiz/",
          {
            method: "POST",
          }
        );

        if (startResponse.ok) {
          const response = await fetch(
            "https://saysskin.onrender.com/api/v1/quiz/quizzes/"
          );
          const data = await response.json();
          if (data.length > 0) {
            setQuizQuestions(data[0].questions);
            setAnswers(new Array(data[0].questions.length).fill(""));
          }
        } else {
          console.error("Failed to start quiz:", startResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false);
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
      const finishResponse = await fetch(
        "https://saysskin.onrender.com/api/v1/quiz/user-quizzes/2/complete_quiz/",
        {
          method: "POST",
        }
      );

      if (finishResponse.ok) {
        console.log("Quiz completed!", answers);
        router.push("/skincare-routine");
      } else {
        console.error("Failed to complete quiz:", finishResponse.statusText);
      }
    } catch (error) {
      console.error("Error completing quiz:", error);
    }
  };

  const currentQuestion = quizQuestions[currentStep] || {
    question_text: "",
    answers: [],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D1C6F3] via-[#E9BCAC] to-[#BEA8F1] flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D1C6F3] via-[#E9BCAC] to-[#BEA8F1] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Personalized Skin Care Quiz
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Discover your perfect skincare routine in just a few steps
          </p>
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
              variant={
                answers[currentStep] === answer.answer_text
                  ? "default"
                  : "secondary"
              }
              className={`w-full max-w-md text-left justify-start px-6 py-4 text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105 ${
                answers[currentStep] === answer.answer_text
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "bg-white text-gray-800 border border-purple-200 hover:border-purple-300"
              } ${
                index === 0
                  ? "md:w-3/4"
                  : index === 1
                  ? "md:w-4/5"
                  : index === 2
                  ? "md:w-11/12"
                  : "md:w-full"
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
