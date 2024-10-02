import Image from "next/image";
import { logo } from "@/public/images/index";
import Btn from "./Components/UI/Btn";
import { useRouter } from "next/navigation";
export default function Home() {
  return (
    <div className="flex p-5 mainpage items-center justify-between flex-col h-screen w-screen">
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
      <div>
        <Btn text="Start Quiz" className="text-white w-[315px] h-[60px]" />
      </div>
    </div>
  );
}
