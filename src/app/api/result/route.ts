// app/api/result/route.ts
import { NextRequest, NextResponse } from "next/server";
import { quizResult } from "@/app/data/mockData";  // Assuming quizResult contains the final result data

export async function POST(request: NextRequest) {
  try {
    // You can extract any needed data from the request body if necessary
    const result = { ...quizResult };

    // Send the result as a response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 }
    );
  }
}
