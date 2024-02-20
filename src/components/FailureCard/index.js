import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const FailureCard = props => {
  const {score, totalQuestions} = props
  const percentage = (score / totalQuestions) * 100

  return (
    <>
      <Header />
      <div className="failure-card-container">
        <img
          className="fail-image"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
          alt="lose"
        />
        <h1 className="lose-text">You lose!</h1>
        <h1 className="header-text">{percentage}% Correctly Answered</h1>
        <p className="sub-description-text">
          You attempted {score} out of {totalQuestions} questions as correct.
        </p>
        <div className="button-containers">
          <Link to="/game-report">
            <button type="button" className="report-button">
              Report
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default FailureCard
