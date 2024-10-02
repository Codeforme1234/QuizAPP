"use client"
import React, { useState } from "react";
import { upperDesignItems } from "@/public/images";
import Image from "next/image";
import Btn from "../Components/UI/Btn";
import ArrowGauge from "./ProgressBar";

const page = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <div className="relative bg-[#AF9CF3] bg-blend-multiply h-screen w-screen font-[var(--font-nunito)]">
      {/* <div className="absolute top-0 z-1">
        <Image src={upperDesignItems} alt="upperDesignItems" height={2000} width={2000} />
      </div> */}
      <div className="h-[20vh] bg-[#AF9CF3] w-full"></div>
      <div className="bg-white relative rounded-t-[40px] md:rounded-[40px] shadow-lg h-[80vh] md:h-[70vh] w-full md:w-[60vw] mx-auto flex flex-col items-center">
        {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-[150px] bg-white flex items-center justify-center aspect-square rounded-full">
            <div className="h-[130px] flex bg-[#F3F4FA] items-center justify-center aspect-square rounded-full">
              <div className="h-[110px] flex bg-white items-center justify-center aspect-square rounded-full">
                <div className="text-[76px] text-black italic  font-black">
                  4
                </div>
                <div className="text-[24px] text-gray-500 mt-8 font-bold">
                  /5
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <ArrowGauge percentage={45} />
        
      </div>
    </div>
  );
};

export default page;
