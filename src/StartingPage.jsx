export default function StartingPage(props) {
    return (
        <div className="starting-page">
            <h1>Quizzical</h1>
            <p>Welcome to the Quizzical app!</p>
            <button onClick={props.startQuize}>Start quiz</button>
        </div>
    )
}

