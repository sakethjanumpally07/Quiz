import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const CongratsCard = props => {
  const {score, totalQuestions} = props
  const percentage = (score / totalQuestions) * 100

  return (
    <>
      <Header />
      <div className="congrats-card-container">
        <img
          className="trophy-image"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
          alt="won"
        />
        <h1 className="congrats-text">Congrats!</h1>
        <h1 className="header-text">{percentage}% Correctly Answered</h1>
        <p className="description-text">Quiz completed successfully.</p>
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

export default CongratsCard
