import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { quizId } = req.body;
    // For now, we simulate a score calculation
    const totalScore = 60; // Mock score
    return res.status(200).json({ score: totalScore });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
