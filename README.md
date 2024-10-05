# Quiz Web App

This is a Quiz Web App designed to evaluate users in various skill sets. It allows users to answer a set of questions and provides them with a score at the end. The app is built using React and Next.js, with APIs created using Next.js backend for fetching quiz data and submitting responses. Docker is used for containerizing the application.

You can find the live version of the app [here](https://upraised.codeforme.tech/).

## Features

- **Home Screen**: Start the quiz and fetch questions from the API.
- **Question Screen**: Navigate through questions, submit responses, and track the time taken for each question.
- **Report Screen**: Displays the user's total score, correct answers, and incorrect answers, with an option to restart the quiz.
- **Responsive UI**: The app works seamlessly across different devices.
- **API Interaction**: REST APIs for starting the quiz, submitting responses, and retrieving scores.
- **Containerized with Docker**: The application can be deployed in a Docker container for consistency and ease of deployment.

## Tech Stack

- **Frontend**: React with Next.js
- **Backend**: Next.js API routes (for mock API)
- **Styling**: CSS and Tailwind CSS
- **API Mocking**: Implemented via Next.js API routes
- **Deployment**: Deployed on Vercel
- **Containerization**: Docker

## Some Screenshots

#Desktop View

![Home Screen](./public/readme/D1.png)
![Question Screen](./public/readme/D2.png)
![Report Screen](./public/readme/D3.png)

#Mobile View

![Home Screen](./public/readme/P1.png)
![Question Screen](./public/readme/P2.png)
![Report Screen](./public/readme/P3.png)

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (v14+)
- Docker (optional, for containerization)
- Git

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/Codeforme1234/QuizAPP
   cd quizAPP
   ```
