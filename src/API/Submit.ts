// pages/api/quiz/submit.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { quizId, questionId, selectedOptions, timeTaken } = req.body;
    // You can add logic here to verify answers and track score
    return res.status(200).json({ message: 'Answer submitted successfully' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
