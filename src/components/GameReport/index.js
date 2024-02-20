import UnAnsweredQuestionsList from '../UnAnsweredQuestionsList'
import Header from '../Header'

import QuizGameContext from '../../context/QuizGameContext'

import './index.css'

const GameReport = () => (
  <QuizGameContext.Consumer>
    {quizGameValues => {
      const {score, totalQuestions, unAnsweredQuestionsList} = quizGameValues
      const unansweredQuestions = unAnsweredQuestionsList.length
      const incorrectAnswers = totalQuestions - (score + unansweredQuestions)

      return (
        <>
          <Header />
          <div className="report-container">
            <div className="stats-container">
              <div className="marks-container">
                <p className="marks">
                  {score} <span className="slash">/</span>
                  <span className="overall-marks">{totalQuestions}</span>
                </p>
              </div>
              <div className="results-in-words">
                <div className="answers-container">
                  <img
                    className="check-image"
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                    alt="correct answer icon"
                  />
                  <p className="answer-text">{score} Correct answers</p>
                </div>
                <div className="answers-container">
                  <img
                    className="check-image"
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                    alt="incorrect answer icon"
                  />
                  <p className="answer-text">
                    {incorrectAnswers} Incorrect answers
                  </p>
                </div>
                <div className="answers-container">
                  <img
                    className="check-image"
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                    alt="unattempted icon"
                  />
                  <p className="answer-text">
                    {unansweredQuestions} Unattempted
                  </p>
                </div>
              </div>
            </div>
            <div className="incorrect-answers-container">
              {unAnsweredQuestionsList.length > 0 ? (
                <>
                  <h1 className="answers-list-text">Unattempted Questions</h1>
                  <div className="answers-list-container">
                    {unAnsweredQuestionsList.map(eachQuestion => (
                      <UnAnsweredQuestionsList
                        key={eachQuestion.id}
                        questionDetails={eachQuestion}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <h1 className="no-answers-list-text">
                  Attempted all the questions
                </h1>
              )}
            </div>
          </div>
        </>
      )
    }}
  </QuizGameContext.Consumer>
)

export default GameReport
