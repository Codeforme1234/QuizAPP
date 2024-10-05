import React from "react";
import rightArrow from "../../../public/images/arrow-sm-right-svgrepo-com.svg";
import Image from "next/image";

interface ButtonProps {
  text: string;
  className?: string;
}

const Btn = ({ text, className }: ButtonProps) => {
  return (
    <div
      className={`bg-[#FF3B3F] relative flex rounded-[50px] font-black text-2xl shadow-md items-center justify-center cursor-pointer transition-transform duration-200 ease-in-out  hover:bg-[#f71216] hover:scale-105 ${className}`}
    >
      <div>{text}</div>
      {text === "Next" && (
        <Image
          className=" absolute right-5"
          src={rightArrow}
          alt="right-arrow"
          width={30}
          height={30}
        />
      )}
    </div>
  );
};

export default Btn;
