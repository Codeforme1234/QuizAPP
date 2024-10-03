"use client";
import React, { useState, useEffect } from "react";
import Btn from "../Components/UI/Btn";
import CircularGauge from "../Components/UI/CircularGauge";

const ResultPage = () => {
  const [resultData, setResultData] = useState({ score: 0, totalQuestions: 0 });

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

  return (
    <div className=" bg-[#AF9CF3] overflow-hidden  h-[93vh] md:h-screen  w-full font-[var(--font-nunito)]">
      <div className="h-[20%]  bg-[#AF9CF3] w-full"></div>
      <div className="bg-white relative rounded-t-[40px] md:rounded-[40px] shadow-lg h-[80%] md:h-[70%] w-full md:w-[60vw] mx-auto flex flex-col items-center">
        <div className="text-[30px] my-7 text-xl font-medium ">Your Result</div>
        <CircularGauge
          percentage={(resultData.score / resultData.totalQuestions) * 100}
        />
        <div className="w-[50%] z-0 bg-white space-y-4">
          <div className="flex h-[70px] bg-[#bff5d9] items-center justify-start px-4 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <div className="text-black font-bold mr-2">{resultData.score}</div>
            <div className="text-gray-500 font-semibold">Correct</div>
          </div>
          <div className="flex h-[70px] bg-[#facccd] items-center justify-start px-4 rounded-lg">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            <div className="text-black font-bold mr-2">
              {resultData.totalQuestions - resultData.score}
            </div>
            <div className="text-gray-500 font-semibold">Incorrect</div>
          </div>
        </div>

        <div className="flex justify-center py-3 w-full">
          <Btn text="Start Again" className="w-[50%] h-[50px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
