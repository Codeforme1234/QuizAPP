"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Btn from "../../Components/UI/Btn";
import SemiCircleGauge from "../../Components/UI/CircularGauge";
import upperDesignItems from "../../../public/images/upperDesignItems.svg";
import Image from "next/image";

const ResultPage = () => {
  const [resultData, setResultData] = useState({
    score: 0,
    totalQuestions: 0,
    percentage: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/result`, { method: "POST" });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Oops! We haven't received a JSON response");
        }

        const data = await res.json();
        console.log(data);
        setResultData(data);
      } catch (error) {
        console.error("Failed to fetch result:", error);
      }
    };

    fetchResult();
  }, []);

  const handleStartAgain = () => {
    router.push("/");
  };

  return (
    <div className="bg-[#AF9CF3] overflow-hidden h-[100dvh] w-full font-[var(--font-nunito)]">
      <div className="h-[20%] absolute flex items-center justify-center bg-[#AF9CF3] w-full">
        <Image
          src={upperDesignItems}
          alt="upperDesignItems"
          height={25}
          width={25}
          className="w-full absolute top-0 md:w-[60vw]"
        />
      </div>
      <div className="h-[20%] bg-[#AF9CF3] w-full"></div>

      <div className="bg-white relative rounded-t-[40px] md:rounded-[40px] shadow-lg h-[80%] md:h-[70%] w-full md:w-[60vw] mx-auto flex flex-col justify-between items-center">
        <div className="flex flex-col items-center">
          <div className="text-[30px] my-7 text-xl font-medium">
            Your Result
          </div>
          <SemiCircleGauge percentage={resultData.percentage} />
        </div>

        <div className="w-[80%] md:space-x-3 bg-white flex max-md:flex-col max-md:space-y-3 items-center justify-center">
          <div className="flex h-[70px] w-full bg-[#bff5d9] items-center justify-start px-4 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            {/* Display correct answers */}
            <div className="text-black font-bold mr-2">{resultData.score}</div>
            <div className="text-gray-500 font-semibold">Correct</div>
          </div>
          <div className="flex h-[70px] w-full bg-[#facccd] items-center justify-start px-4 rounded-lg">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            {/* Display incorrect answers */}
            <div className="text-black font-bold mr-2">
              {resultData.totalQuestions - resultData.score}
            </div>
            <div className="text-gray-500 font-semibold">Incorrect</div>
          </div>
        </div>

        <div
          className="flex justify-center py-3 w-full"
          onClick={handleStartAgain}
        >
          <Btn text="Start Again" className="w-[50%] h-[50px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
