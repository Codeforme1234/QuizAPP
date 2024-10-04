// app/api/result/route.ts
import { NextRequest, NextResponse } from "next/server";
import { quizResult } from "@/app/data/mockData";  // Assuming quizResult contains the final result data

export async function POST(request: NextRequest) {
  try {
    // Send the result as a response
    return NextResponse.json({
      score: quizResult.score,
      totalQuestions: quizResult.totalQuestions,
      percentage: (quizResult.score / quizResult.totalQuestions) * 100,
    });
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 }
    );
  }
}
