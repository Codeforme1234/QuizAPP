// app/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { logo } from "./public/Images/index";
import Btn from "./Components/UI/Btn";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/start");
      const data = await res.json();
      console.log(data);
      router.push(`/quiz?quizId=${data.quizId}`);
    } catch (error) {
      console.error("Error starting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-5 mainpage items-center h-[100dvh] justify-between flex-col md:h-screen w-screen">
      <div className="flex flex-row space-x-1 items-center justify-center">
        <div>
          <Image src={logo} alt="logo" height={25} width={25} />
        </div>
        <div className="text-2xl font-extrabold">upraised</div>
      </div>
      <div>
        <div className="w-[216px] h-[205px] bg-white rounded-full flex items-center justify-center text-2xl font-black text-[#FF3B3C] drop-shadow-lg">
          {" "}
          QUIZ
        </div>
      </div>
      <div onClick={startQuiz}>
        <Btn
          text="Start Quiz"
          className="text-white w-[315px] h-[60px]"
          isLoading={isLoading}
          onClick={startQuiz}
        />
      </div>
    </div>
  );
}
