"use client";
import React, { useState, useEffect } from "react";
import Btn from "../Components/UI/Btn";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [question, setQuestion] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");
  const router = useRouter();

  // Function to fetch the current question based on index
  const fetchQuestion = async (index: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/start?quizId=${quizId}&index=${index}`);
      if (!res.ok) throw new Error("Failed to fetch question");
      const data = await res.json();
      setQuestion(data.question);
      setTotalQuestions(data.totalQuestions);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the initial question and also when currentQuestionIndex changes
  useEffect(() => {
    if (quizId) {
      fetchQuestion(currentQuestionIndex);
    } else {
      console.error("No quizId available");
    }
  }, [quizId, currentQuestionIndex]);

  // Modify the submitAnswer function
  const submitAnswer = async () => {
    if (selectedOption === null) return;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          questionId: question.id,
          selectedOption,
          timeTaken: 10, // Replace with actual time
        }),
      });

      if (!res.ok) throw new Error("Failed to submit answer");

      const data = await res.json();
      setScore((prevScore) => prevScore + (data.isCorrect ? 1 : 0));

      // Move to the next question or show result if quiz is finished
      if (currentQuestionIndex < totalQuestions - 1) {
        setSelectedOption(null); // Reset selected option
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Update question index
        fetchQuestion(currentQuestionIndex + 1); // Fetch the next question
      } else {
        // If last question, show result
        router.push(
          `/result?score=${
            score + (data.isCorrect ? 1 : 0)
          }&total=${totalQuestions}`
        );
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!question) return <div>No question available</div>;

  return (
    <div className="relative bg-[#AF9CF3] bg-blend-multiply h-screen w-screen font-[var(--font-nunito)]">
      <div className="h-[20vh] bg-[#AF9CF3] w-full"></div>
      <div className="bg-white relative rounded-t-[40px] md:rounded-[40px] shadow-lg h-[80vh] md:h-[70vh] w-full md:w-[60vw] mx-auto flex flex-col items-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-[150px] bg-white flex items-center justify-center aspect-square rounded-full">
            <div className="h-[130px] flex bg-[#F3F4FA] items-center justify-center aspect-square rounded-full">
              <div className="h-[110px] flex bg-white items-center justify-center aspect-square rounded-full">
                <div className="text-[76px] text-black italic font-black">
                  {currentQuestionIndex + 1}
                </div>
                <div className="text-[24px] text-gray-500 mt-8 font-bold">
                  /{totalQuestions}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-between h-full px-4 pt-[100px]">
          <div className="text-[24px] ps-3 text-xl font-semibold">
            {question.text}
          </div>
          <div className="flex flex-col h-[70%] space-y-4 p-3 thin-scrollbar overflow-auto mt-7">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                className="flex items-center text-[18px] min-h-[6rem] font-semibold py-3 px-6 bg-[#F3F4FA] rounded-lg text-left hover:bg-[#E0E1E7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#AF9CF3]"
                onClick={() => setSelectedOption(index)}
              >
                <span
                  className={`w-4 h-4 rounded-full mr-4 border-2 border-[#AF9CF3] ${
                    selectedOption === index ? "bg-[#AF9CF3]" : "bg-transparent"
                  } transition-colors duration-300`}
                ></span>
                {option}
              </button>
            ))}
          </div>
          <div
            className="flex justify-center py-3 w-full"
            onClick={submitAnswer}
          >
            <Btn
              text={
                currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"
              }
              className="w-[50%] h-[50px] text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
