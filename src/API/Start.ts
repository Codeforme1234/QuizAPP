// pages/api/quiz/start.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Mock quiz data
const quizQuestions = [
  { id: 1, question: "What is React?", options: ["Library", "Framework", "Language"], correct: [0] },
  { id: 2, question: "What is JSX?", options: ["JavaScript", "Syntax", "Both"], correct: [2] },
  // Add more questions as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ quizId: 123, questions: quizQuestions });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
