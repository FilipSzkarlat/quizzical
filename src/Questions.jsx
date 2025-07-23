
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
            <button onClick={playAgain}>Play again</button> :
            <button onClick={checkAnswers}>Check answers</button>}
        </div>
    );

}
