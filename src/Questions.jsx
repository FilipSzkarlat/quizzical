
export default function Questions({questions, checkAnswers, playAgain}) 
{

    return (
        <div className="questions">
            {questions.map((question, index) => (
                <div key={index} className="question">
                    <h2>{question.question}</h2>
                    <div className="answers">
                        {question.answers.map((answer, index) => (
                            <label key={index} className={question.answerClassName}>
                                {answer}
                                <input type='radio' name={question.id} value={(answer)} key={index} hidden/>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            {questions.every(question => question.chosenAnswer) ? 
            <div className="result">
                <h2>You scored {questions.filter(q => q.chosenAnswer === q.correctAnswer).length} out of {questions.length} correct answers</h2>
                <button onClick={playAgain}>Play again</button>
            </div>:
            <button onClick={checkAnswers}>Check answers</button>}
        </div>
    );

}
