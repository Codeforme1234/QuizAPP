"use client"
import React, { useState } from "react";
import { upperDesignItems } from "@/public/images";
import Image from "next/image";
import Btn from "../Components/UI/Btn";

const page = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <div className="relative bg-[#AF9CF3] bg-blend-multiply h-screen w-screen font-[var(--font-nunito)]">
      {/* <div className="absolute top-0 z-1">
        <Image src={upperDesignItems} alt="upperDesignItems" height={2000} width={2000} />
      </div> */}
      <div className="h-[20vh] bg-[#AF9CF3] w-full"></div>
      <div className="bg-white relative rounded-t-[40px] md:rounded-[40px] shadow-lg h-[80vh] md:h-[70vh] w-full md:w-[60vw] mx-auto flex flex-col items-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
        </div>
        <div className=" w-full flex flex-col justify-between h-full px-4 pt-[100px]">
          <div className="text-[24px] ps-3 text-xl font-semibold ">
            How do you judge what should be added in the next version of the
            app?
          </div>
          <div className="flex flex-col h-[70%] space-y-4 p-3 thin-scrollbar overflow-auto mt-7">
            {['option 1', 'option 2', 'option 3', 'option 4', 'option 5'].map((option, index) => (
              <button
                key={index}
                className="flex items-center text-[18px] min-h-[6rem] font-semibold py-3 px-6 bg-[#F3F4FA] rounded-lg text-left hover:bg-[#E0E1E7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#AF9CF3]"
                onClick={() => setSelectedOption(index)}
              >
                <span className={`w-4 h-4 rounded-full mr-4 border-2 border-[#AF9CF3] ${selectedOption === index ? 'bg-[#AF9CF3]' : 'bg-transparent'} transition-colors duration-300`}></span>
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-center py-3 w-full"> <Btn text="Next" className="w-[50%] h-[50px] text-white" /></div>
        </div>
      </div>
    </div>
  );
};

export default page;
