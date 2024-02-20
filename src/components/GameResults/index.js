import CongratsCard from '../CongratsCard'
import FailureCard from '../FailureCard'

import QuizGameContext from '../../context/QuizGameContext'

const GameResults = () => (
  <QuizGameContext.Consumer>
    {quizGameValues => {
      const {score, totalQuestions} = quizGameValues
      const percentage = (score / totalQuestions) * 100

      if (percentage >= 60) {
        return <CongratsCard score={score} totalQuestions={totalQuestions} />
      }
      return <FailureCard score={score} totalQuestions={totalQuestions} />
    }}
  </QuizGameContext.Consumer>
)

export default GameResults
