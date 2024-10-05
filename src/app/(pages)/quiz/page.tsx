"use client";
import React, { useState, useEffect } from "react";
import Btn from "../../Components/UI/Btn";
import { useRouter, useSearchParams } from "next/navigation";
import upperDesignItems from "../../../public/images/upperDesignItems.svg";
import Image from "next/image";
import ProgressCircle from "../../Components/UI/ProgressCircle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CountdownBar from "../../Components/UI/CountDownCircle";
import { Suspense } from "react";

const Page = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
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

  // Toggle multiple options if question type is "multiple"
  const toggleOption = (index: number) => {
    setSelectedOptions((prev) => {
      if (question.type === "Multiple Choice") {
        // Toggle the option for multiple-choice questions
        return prev.includes(index)
          ? prev.filter((i) => i !== index) // Unselect if already selected
          : [...prev, index]; // Add to selection
      } else {
        // For single-choice questions, only one option can be selected
        return [index];
      }
    });
  };

  // Submit the answer
  const submitAnswer = async () => {
    if (selectedOptions.length === 0) return;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          questionId: question.id,
          selectedOptions, // This can be multiple for multi-choice questions
          timeTaken: 10, // Replace with actual time
        }),
      });

      if (!res.ok) throw new Error("Failed to submit answer");

      const data = await res.json();
      setScore((prevScore) => prevScore + (data.isCorrect ? 1 : 0));

      // Move to the next question or show result if quiz is finished
      if (currentQuestionIndex < totalQuestions - 1) {
        setSelectedOptions([]); // Reset selected options
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

          {/* Render Media (Image, Video, or GIF) */}
          <div className="my-2 flex w-full justify-center">
            {renderMedia(question.media)}
          </div>

          <div className="flex relative flex-col h-[70%] space-y-4 pt-2 px-3 pb-3 thin-scrollbar mt-2">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                className={`flex items-center text-[18px] min-h-[4rem] font-semibold py-3 px-6 bg-[#F3F4FA] rounded-lg text-left hover:bg-[#E0E1E7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#AF9CF3] ${
                  selectedOptions.includes(index) ? "bg-[#AF9CF3]" : ""
                }`}
                onClick={() => toggleOption(index)}
              >
                <span
                  className={`w-4 h-4 ${
                    question.type === "multiple" ? "rounded" : "rounded-full"
                  } mr-4 border-2 border-[#AF9CF3] ${
                    selectedOptions.includes(index)
                      ? "bg-[#AF9CF3]"
                      : "bg-transparent"
                  } transition-colors duration-300`}
                ></span>
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
        <div className=" z-0 flex w-full h-[92%] my-1 flex-col justify-between overflow-hidden rounded-lg  pt-[60px]">
          <div className=" overflow-auto w-full thin-scrollbar">
            <Suspense fallback={<div>Loading question...</div>}>
              {renderContent()}
            </Suspense>
          </div>
          {/* <CountdownBar duration={question?.time} /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
