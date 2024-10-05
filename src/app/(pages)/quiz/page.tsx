"use client";
import React, { useState, useEffect, Suspense } from "react";
import Btn from "../../Components/UI/Btn";
import { useRouter, useSearchParams } from "next/navigation";
import { upperDesignItems } from "../../../Public/Images/index";
import Image from "next/image";
import ProgressCircle from "../../Components/UI/ProgressCircle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Create a separate client-side component to use `useSearchParams()`
const QuizPageClient = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");
  const router = useRouter();

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

  useEffect(() => {
    if (quizId) {
      fetchQuestion(currentQuestionIndex);
    } else {
      console.error("No quizId available");
    }
  }, [quizId, currentQuestionIndex]);

  const toggleOption = (index: number) => {
    setSelectedOptions((prev) => {
      if (question.type === "Multiple Choice") {
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index];
      } else {
        return [index];
      }
    });
  };

  const submitAnswer = async () => {
    if (selectedOptions.length === 0) return;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          questionId: question.id,
          selectedOptions,
          timeTaken: 10,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit answer");

      const data = await res.json();
      setScore((prevScore) => prevScore + (data.isCorrect ? 1 : 0));

      if (currentQuestionIndex < totalQuestions - 1) {
        setSelectedOptions([]);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        fetchQuestion(currentQuestionIndex + 1);
      } else {
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

  const renderMedia = (media: { type: string; url: string }) => {
    if (!media) return null;

    switch (media.type) {
      case "image":
        return (
          <Image
            src={media.url}
            alt="Question Media"
            width={100}
            height={100}
            className="w-[70%] md:w-[10%] rounded-xl shadow-lg"
          />
        );
      case "video":
        return (
          <video
            src={media.url}
            controls
            autoPlay
            className="w-[70%] md:w-[50%] rounded-xl shadow-lg"
          />
        );
      case "gif":
        return (
          <Image
            src={media.url}
            alt="Question GIF"
            width={100}
            height={100}
            className="w-[70%] md:w-[30%] rounded-xl shadow-lg"
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="text-[24px] w-full font-nunito font-semibold ps-5 text-2xl">
            <Skeleton width="80%" height={30} />
          </div>

          <div className="flex relative flex-col h-[70%] space-y-4 px-3 pb-3 thin-scrollbar overflow-auto mt-7">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} height={96} className="rounded-lg" />
            ))}
          </div>
          <div className="flex justify-center py-3 w-full">
            <Skeleton width="50%" height={50} className="rounded-lg" />
          </div>
        </>
      );
    }

    if (!question) return <div>No question available</div>;

    return (
      <>
        <div className="bg-white z-0 rounded-lg">
          <div className="text-[24px] bg-white z-0 w-full font-nunito font-semibold ps-5 text-2xl">
            {question.text}{" "}
            <span className="text-[#AF9CF3] text-[20px]">
              ({question.type})
            </span>
          </div>

          <div className="my-2 flex w-full justify-center">
            {renderMedia(question.media)}
          </div>

          <div className="flex relative flex-col h-[70%] space-y-4 pt-2 px-3 pb-3 thin-scrollbar mt-2">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                className={`flex items-center text-[18px] min-h-[4rem] font-semibold py-3 px-6 bg-[#F3F4FA] rounded-lg text-left hover:bg-[#E0E1E7] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  selectedOptions.includes(index) ? "border-2 border-green-500" : ""
                }`}
                onClick={() => toggleOption(index)}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center mr-4 border-2 ${
                    selectedOptions.includes(index)
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-[#AF9CF3] bg-transparent"
                  } transition-colors duration-300 ${
                    question.type === "Multiple Choice" ? "rounded" : "rounded-full"
                  }`}
                >
                  {selectedOptions.includes(index) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center py-3 w-full" onClick={submitAnswer}>
          <Btn
            text={
              currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"
            }
            className="w-[50%] h-[50px] text-white"
          />
        </div>
      </>
    );
  };

  return (
    <div className="relative bg-[#AF9CF3] bg-blend-multiply h-[100dvh] w-screen font-[var(--font-nunito)]">
      <div className="h-[20%] flex items-center justify-center bg-[#AF9CF3] w-full">
        <Image
          src={upperDesignItems}
          alt="upperDesignItems"
          height={25}
          width={25}
          className="w-full absolute top-0 md:w-[60vw]"
        />
      </div>
      <div className="bg-white relative rounded-t-[40px] md:rounded-[40px] shadow-lg h-[80%] md:h-[70%] w-full md:w-[60vw] mx-auto flex flex-col items-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-[100px] bg-white z-4 flex items-center justify-center aspect-square rounded-full">
            <ProgressCircle
              current={currentQuestionIndex + 1}
              total={totalQuestions}
            />
          </div>
        </div>
        <div className="z-0 flex w-full h-[92%] my-1 flex-col justify-between overflow-hidden rounded-lg pt-[60px]">
          <div className="overflow-auto w-full thin-scrollbar">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the page component in a Suspense boundary
const Page = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <QuizPageClient />
    </Suspense>
  );
};

export default Page;
