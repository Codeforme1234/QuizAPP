import React from "react";
import { rightArrow } from "@/Public/Images/index";
import Image from "next/image";

interface ButtonProps {
  text: string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const Btn = ({ text, className, isLoading, onClick }: ButtonProps) => {
  return (
    <div
      className={`bg-[#FF3B3F] relative flex rounded-[50px] font-black text-2xl shadow-md items-center justify-center cursor-pointer transition-transform duration-200 ease-in-out hover:bg-[#f71216] hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      ) : (
        <>
          <div>{text}</div>
          {text === "Next" && (
            <Image
              className="absolute right-5"
              src={rightArrow}
              alt="right-arrow"
              width={30}
              height={30}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Btn;
