// app/result/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { upperDesignItems } from "@/public/images";
import Image from "next/image";
import Btn from "../Components/UI/Btn";
import SemiCircleGauge from "../Components/UI/CircularGauge";

const page = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await fetch(`/api/result`, { method: "POST" });
      console.log(res);
      const data = await res.json();
      console.log(data);
      setScore(data.score);
    };
    fetchResult();
  }, []);

  return (
    <div className="relative bg-[#AF9CF3] bg-blend-multiply h-full w-full font-[var(--font-nunito)]">
      {/* <div className="absolute top-0 z-1">
        <Image src={upperDesignItems} alt="upperDesignItems" height={2000} width={2000} />
      </div> */}
      <div className="h-[20vh] bg-[#AF9CF3] w-full"></div>
      <div className="bg-white relative rounded-t-[40px] md:rounded-[40px] shadow-lg h-[80vh] md:h-[70vh] w-full md:w-[60vw] mx-auto flex flex-col items-center">
        <div className="text-[30px] my-7 text-xl font-medium ">Your Result</div>
        <SemiCircleGauge percentage={20} />
        <div className="w-[50%] z-0 bg-white space-y-4">
          <div className="flex h-[70px] bg-[#bff5d9] items-center justify-start px-4 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <div className="text-black font-bold mr-2">3</div>
            <div className="text-gray-500 font-semibold">Correct</div>
          </div>
          <div className="flex h-[70px] bg-[#facccd] items-center justify-start px-4 rounded-lg">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            <div className="text-black font-bold mr-2">2</div>
            <div className="text-gray-500 font-semibold">Incorrect</div>
          </div>
        </div>
        <div className="flex justify-center py-3 w-full">
          {" "}
          <Btn text="Start Again" className="w-[50%] h-[50px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default page;
