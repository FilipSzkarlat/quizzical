import StartingPage from "./StartingPage";
import Questions from "./Questions";
import { useState, useEffect } from "react";



export default function App() {
  const [questions, setQuestions] = useState(null);


function getQuestions() {
  // This function would typically fetch questions from an API or a local source.
  fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
  .then (res => res.json())
  .then (data => {
    console.log(data.results);
    // Here you would typically set the state with the fetched questions.
    setQuestions(data.results.map((question, index) => ({
      question: question.question,
      key: index,
      correctAnswer: question.correct_answer,
      answers: question.incorrect_answers.concat(question.correct_answer).sort(() => Math.random() - 0.5), // Shuffle answers
    })))
  })
}



  return (
    <>
      {questions ? <Questions questions={questions} /> : <StartingPage startQuize={getQuestions}/>}
    </>
  )
}