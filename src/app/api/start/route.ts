import { NextRequest, NextResponse } from "next/server";
import { quizQuestions } from "@/app/data/mockData";



export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const quizId = url.searchParams.get("quizId");
  const index = parseInt(url.searchParams.get("index") || "0", 10);

  if (index < 0 || index >= quizQuestions.length) {
    return NextResponse.json({ error: "Invalid question index" }, { status: 400 });
  }

  const question = {
    ...quizQuestions[index],
    correct: undefined // Remove correct answer from client-side data
  };

  return NextResponse.json({
    quizId: quizId || Math.random().toString(36).substr(2, 9),
    question,
    totalQuestions: quizQuestions.length,
  });
}
