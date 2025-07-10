export default function Questions({questions}) {
    const answers = questions.map(question => question.answers);
    console.log(answers);
    return (
        <div className="questions">
            {questions.map((question, index) => (
                <div key={index} className="question">
                    <h2>{question.question}</h2>
                    <ul>

                        {question.answers.map((answer, index) => (
                            <li key={index}>{answer}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

}
