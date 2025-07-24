import StartingPage from "./StartingPage";
import Questions from "./Questions";
import { useState } from "react";
import { decode } from 'html-entities';


// Project: react-quiz-app backlog:
//
// 
//


export default function App() {

  const [questions, setQuestions] = useState(null);
  console.log(questions)
  function checkAnswers() {
      questions.forEach((question) => {
        const selectedAnswer = document.querySelector(`input[name="${question.id}"]:checked`);

        // If no answer is selected, return early
        if (!selectedAnswer) {
          alert(`Please select an answer for the question: ${question.question}`);
          return;
        }

          // Check if the selected answer is correct and update the className accordingly
        selectedAnswer.value === question.correctAnswer ? 
        selectedAnswer.parentElement.className = 'correct' : 
        selectedAnswer.parentElement.className = 'incorrect';
        // If the chosen answer is incorrect, mark also the correct one
        document.querySelector(`input[value="${question.correctAnswer}"]`).parentElement.className = 'correct';

          setQuestions(prevQuestions =>
            prevQuestions.map(q =>
              q.question === question.question ? 
                { ...q, chosenAnswer: selectedAnswer.value} : q
            )
          )
      });
  }

  function playAgain() {
      setQuestions(null); // Reset questions to empty array before fetching new ones
  }

 function getQuestions() {
  // This function would typically fetch questions from an API or a local source.
  fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
  .then (res => res.json())
  .then (data => {
    // Here you would typically set the state with the fetched questions.
    setQuestions(data.results.map((question, index) => ({
      id: `question-${index}`, // Add a safe ID
      question: decode(question.question), // Decode HTML entities
      correctAnswer: decode(question.correct_answer),
      chosenAnswer: false, // Initialize chosenAnswer to empty string
      key: index,
      answerClassName: 'answer',
      answers: question.incorrect_answers.map(decode).concat(decode(question.correct_answer)).sort(() => Math.random() - 0.5), // Shuffle answers
    })))
  })
  .catch(error => console.error('Error fetching questions:', error));
}



  return (
    <>
      {questions ? <Questions playAgain={playAgain} questions={questions} checkAnswers={checkAnswers} /> : <StartingPage startQuize={getQuestions}/>}
    </>
  )
}