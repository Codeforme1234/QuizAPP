// app/api/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { quizAnswers, quizResult } from "@/app/data/mockData";


export async function POST(request: NextRequest) {
  try {
    const { quizId, questionId, selectedOption, timeTaken } =
      await request.json();

    // Find the question from the quiz
    const question = quizAnswers.find((q: any) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const isCorrect = question.correct.includes(selectedOption);

    // Update quizResult
    quizResult.totalQuestions++;
    if (isCorrect) {
      quizResult.score++;
    }
    
    console.log(quizResult);

    return NextResponse.json({ isCorrect, quizResult });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
