import StartingPage from "./StartingPage";
import Questions from "./Questions";
import clsx from "clsx";
import { useState } from "react";


// Project: react-quiz-app backlog:
//
// * prepare function to check answers
//


export default function App() {
  const [questions, setQuestions] = useState(null);

  function checkAnswers() {
      questions.forEach(question => {
          const selectedAnswer = document.querySelector(`input[name="${question.question}"]:checked`);

            setQuestions(prevQuestions =>
              prevQuestions.map(q =>
                q.question === question.question ? 
                  { ...q, chosenAnswer: selectedAnswer.value === question.correctAnswer } : q
              )
            )

      });
      console.log("Checking answers...");
  }

function getQuestions() {
  // This function would typically fetch questions from an API or a local source.
  fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
  .then (res => res.json())
  .then (data => {
    console.log(data.results);
    // Here you would typically set the state with the fetched questions.
    setQuestions(data.results.map((question, index) => ({
      question: question.question,
      correctAnswer: question.correct_answer,
      chosenAnswer: false, // Initialize chosenAnswer to false
      key: index,
      answers: question.incorrect_answers.concat(question.correct_answer).sort(() => Math.random() - 0.5), // Shuffle answers
    })))
  })
}



  return (
    <>
      {questions ? <Questions questions={questions} checkAnswers={checkAnswers} /> : <StartingPage startQuize={getQuestions}/>}
    </>
  )
}