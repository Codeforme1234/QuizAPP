// pages/api/quiz/finish.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { quizId } = req.body;
    // Calculate score here based on user's answers
    const totalScore = 60; // Example score calculation
    return res.status(200).json({ score: totalScore });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
