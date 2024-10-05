const quizQuestions = [
  {
    id: 1,
    text: "Which company logo is this?",
    media: {
      type: "image",
      url: "https://media.licdn.com/dms/image/v2/C560BAQE7dGoqrGE4nA/company-logo_200_200/company-logo_200_200/0/1658724901649/upraised_logo?e=1735776000&v=beta&t=MDRnffERtvhbarAp4nYM9kg3WygF1nsKmB9hkGUKIt0",
    },
    options: ["Upraised", "Upwork", "Upread"],
    type: "Single Choice",
    time: 10,
  },
  {
    id: 2,
    text: "Tech stack used in this assignment?",
    media: {
      type: "gif",
      url: "https://i.gifer.com/23PP.gif",
    },
    options: ["TailwindCSS", "NextJs", "TypeScript", "Framer-motion"],
    type: "Multiple Choice",
    time: 10,
  },
  {
    id: 3,
    text: "How much did you like this assignment?",
    media: {
      type: "gif",
      url: "https://media1.tenor.com/m/0jC_8IMenacAAAAC/bumble-christmas.gif",
    },
    options: ["Much", "Very much", "Too much"],
    type: "Single Choice",
    time: 10,
  },
  {
    id: 4,
    text: "I am selected for the next round?",
    media: {
      type: "image",
      url: "https://static.wikia.nocookie.net/obfcbt-wiki/images/7/7b/Verbalase_to_the_quarter_rounds.png/revision/latest/scale-to-width-down/1200?cb=20201227030332",
    },
    options: ["Yes", "If not you, then who?"],
    type: "Single Choice",
    time: 10,
  },
];

const quizAnswers = [
  { id: 1, correct: [0] },
  { id: 2, correct: [0, 1, 2] },
  { id: 3, correct: [2] },
  { id: 4, correct: [1] },
];

const quizResult = {
  score: 3,
  totalQuestions: 4,
};

export { quizQuestions, quizAnswers, quizResult };
