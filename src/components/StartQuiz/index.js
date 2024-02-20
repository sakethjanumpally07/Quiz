import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const StartQuiz = () => (
  <>
    <Header />
    <div className="start-quiz-container">
      <img
        className="start-the-quiz-image"
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
        alt="start quiz game"
      />
      <h1 className="start-quiz-heading">
        How Many Of These Questions Do You Actually Know?
      </h1>
      <p className="start-quiz-description">
        Test yourself with these easy quiz questions and answers
      </p>
      <Link to="/quiz-game">
        <button className="start-quiz-button" type="button">
          Start Quiz
        </button>
      </Link>
      <div className="warning-container">
        <img
          className="warning-image"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
          alt="warning icon"
        />
        <p className="warning-text">
          All the progress will be lost, if you reload during the quiz
        </p>
      </div>
    </div>
  </>
)

export default StartQuiz
