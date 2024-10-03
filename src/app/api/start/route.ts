import { NextRequest, NextResponse } from "next/server";

const quizQuestions = [
  {
    id: 1,
    text: "What is React?",
    options: ["Library", "Framework", "Language"],
    correct: [0],
  },
  {
    id: 2,
    text: "What is JSX?",
    options: ["JavaScript", "Syntax", "Both"],
    correct: [2],
  },
  {
    id: 3,
    text: "How Much U liked this assignment?",
    options: ["80%", "90%", "100%"],
    correct: [0],
  },
  {
    id: 4,
    text: "Am I selected for the next round?",
    options: ["Yes", "No", "Maybe"],
    correct: [0],
  },
  // Add more questions
];

export async function GET(request: NextRequest) {
  const quizId = Math.random().toString(36).substr(2, 9); // Generate a random quizId
  return NextResponse.json({
    quizId,
    question: quizQuestions[0],
    totalQuestions: quizQuestions.length,
  });
}
