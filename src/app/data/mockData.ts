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
    text: "This Assignment is done in?",
    media: {
      type: "gif",
      url: "https://i.gifer.com/23PP.gif",
    },
    options: ["ReactJS", "NextJs", "vanillaJs"],
    type: "Single Choice",
    time: 10,
  },
  {
    id: 3, 
    text: "How much did you like this assignment?",
    media: {
      type: "gif",
      url: "https://media1.tenor.com/m/0jC_8IMenacAAAAC/bumble-christmas.gif",
    },
    options: ["much", "very much", "too much"],
    type: "Single Choice",
    time: 10,
  },
];

const quizAnswers = [
  { id: 1, correct: [0] },
  { id: 2, correct: [0, 1] },
  { id: 3, correct: [3] },
  { id: 4, correct: [0] },
];

const quizResult = {
  score: 0,
  totalQuestions: 0,
};

export { quizQuestions, quizAnswers, quizResult };
