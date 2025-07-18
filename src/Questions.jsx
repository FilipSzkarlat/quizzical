import {decode} from 'html-entities';


export default function Questions({questions, checkAnswers}) 
{
    const answers = questions.map(question => question.answers);
    console.log(questions)


    return (
        <div className="questions">
            {questions.map((question, index) => (
                <div key={index} className="question">
                    <h2>{decode(question.question)}</h2>
                    <div className="answers">
                        {question.answers.map((answer, index) => (
                            <label key={index} className="answer">
                                {decode(answer)}
                                <input type='radio' name={question.question} value={decode(answer)} key={index} hidden/>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={checkAnswers}>Check answers</button>
        </div>
    );

}
