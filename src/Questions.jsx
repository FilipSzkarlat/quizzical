
export default function Questions({questions, checkAnswers}) 
{
    console.log(questions)


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
            <button onClick={checkAnswers}>Check answers</button>
        </div>
    );

}
