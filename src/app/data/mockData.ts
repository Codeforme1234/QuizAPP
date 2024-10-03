const quizQuestions = [
  {
    id: 1,
    text: "What is React?",
    options: ["Library", "Framework", "Language"],
    type: "Single Choice",
    time: 10,
  },
  {
    id: 2,
    text: "What is JSX?",
    options: ["JavaScript", "Syntax", "Both"],
    type: "Multiple Choice",
    time: 10,
  },
  {
    id: 3,
    text: "How Much U liked this assignment?",
    options: ["80%", "90%", "100%"],
    type: "Multiple Choice",
    time: 10,
  },
  {
    id: 4,
    text: "Am I selected for the next round?",
    options: ["Yes", "No", "Maybe"],
    type: "Multiple Choice",
    time: 10,
  },
];

const quizAnswers = [
  { id: 1, correct: [0] },
  { id: 2, correct: [2] },
  { id: 3, correct: [1] },
  { id: 4, correct: [0] },
];

const quizResult = {
  score: 0,
  totalQuestions: 0,
};

export { quizQuestions, quizAnswers, quizResult };
