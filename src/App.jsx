import StartingPage from "./StartingPage";
import Questions from "./Questions";
import { useState } from "react";


// Project: react-quiz-app backlog:
//
// * tag the correct answer with a className
// * change the button after chekcing the answers
// * add a score counter
//


export default function App() {

  const [questions, setQuestions] = useState(null);

  function checkAnswers() {
      

      questions.forEach(question => {
          const selectedAnswer = document.querySelector(`input[name="${question.question}"]:checked`);

          console.log(selectedAnswer.parentElement.className);
          selectedAnswer.value === question.correctAnswer ? selectedAnswer.parentElement.className = 'correct' : selectedAnswer.parentElement.className = 'incorrect';

            setQuestions(prevQuestions =>
              prevQuestions.map(q =>
                q.question === question.question ? 
                  { ...q, chosenAnswer: selectedAnswer.value
                   } : q
              )
            )

      });
  }

function getQuestions() {
  // This function would typically fetch questions from an API or a local source.
  fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
  .then (res => res.json())
  .then (data => {
    
    // const className = clsx({
    //   'answer': true,
    //   'correct': questions.chosenAnswer && questions.correctAnswer === questions.chosenAnswer,
    //   'incorrect': questions.chosenAnswer && questions.correctAnswer !== questions.chosenAnswer,
    // })
    
    console.log(data.results);
    // Here you would typically set the state with the fetched questions.
    setQuestions(data.results.map((question, index) => ({
      question: question.question,
      correctAnswer: question.correct_answer,
      chosenAnswer: 'false', // Initialize chosenAnswer to empty string
      key: index,
      answerClassName: 'answer',
      answers: question.incorrect_answers.concat(question.correct_answer).sort(() => Math.random() - 0.5), // Shuffle answers
    })))
    console.log(questions)
  })
}



  return (
    <>
      {questions ? <Questions questions={questions} checkAnswers={checkAnswers} /> : <StartingPage startQuize={getQuestions}/>}
    </>
  )
}