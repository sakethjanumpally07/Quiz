import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Question from '../Question'
import Header from '../Header'
import QuizGameContext from '../../context/QuizGameContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class QuizGame extends Component {
  state = {
    questionsData: [],
    totalQuestions: 0,
    answeredQuestionsList: [],
    unAnsweredQuestionsList: [],
    activeQuestionId: '',
    score: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAssessmentData()
  }

  getAssessmentData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const questionsApiUrl = 'https://apis.ccbp.in/assess/questions'
    const response = await fetch(questionsApiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const {questions, total} = fetchedData
      const updatedQuestionsData = questions.map(eachQuestion => ({
        id: eachQuestion.id,
        questionText: eachQuestion.question_text,
        optionsType: eachQuestion.options_type,
        options: eachQuestion.options.map(eachOption => {
          const optionDetails = {
            id: eachOption.id,
            text: eachOption.text,
            isCorrect: eachOption.is_correct,
          }
          if (!eachOption.image_url) {
            return optionDetails
          }
          optionDetails.imageUrl = eachOption.image_url
          return optionDetails
        }),
      }))
      this.setState({
        questionsData: updatedQuestionsData,
        totalQuestions: total,
        activeQuestionId: updatedQuestionsData[0].id,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  setActiveQuestionId = questionNumber => {
    const {questionsData} = this.state
    const questionId = questionsData[questionNumber - 1].id
    this.setState({activeQuestionId: questionId})
  }

  goToResultsPage = () => {
    const {history} = this.props
    this.updateUnAnsweredQuestionsList()
    history.replace('/game-results')
  }

  evaluateAnswers = () => {
    const {answeredQuestionsList, questionsData} = this.state
    let score = 0
    answeredQuestionsList.forEach(eachAnsweredQuestion => {
      const {questionId, optionId} = eachAnsweredQuestion
      const questionDetails = questionsData.find(
        eachQuestion => eachQuestion.id === questionId,
      )
      const correctOptionDetails = questionDetails.options.find(
        eachOption => eachOption.isCorrect === 'true',
      )
      if (correctOptionDetails.id === optionId) {
        score += 1
      }
    })
    return score
  }

  goToNextQuestion = questionNumber => {
    const {totalQuestions} = this.state
    const nextQuestionNumber = questionNumber + 1
    if (nextQuestionNumber <= totalQuestions) {
      this.setActiveQuestionId(nextQuestionNumber)
    }
  }

  getSelectedOptionId = () => {
    const {activeQuestionId, answeredQuestionsList, questionsData} = this.state
    const activeQuestionDetails = questionsData.find(
      eachQuestion => eachQuestion.id === activeQuestionId,
    )
    const answeredQuestion = answeredQuestionsList.find(
      eachQuestion => eachQuestion.questionId === activeQuestionDetails.id,
    )

    if (answeredQuestion) {
      return answeredQuestion.optionId
    }
    return ''
  }

  isQuestionAnswered = questionId => {
    const {answeredQuestionsList} = this.state
    const isAnswered = answeredQuestionsList.find(
      eachQuestion => eachQuestion.questionId === questionId,
    )
    if (isAnswered) {
      return false
    }
    return true
  }

  addAnsweredQuestions = (question, optionId, isCorrectOption) => {
    const {activeQuestionId} = this.state
    const newAnsweredQuestion = {
      questionId: activeQuestionId,
      questionDetails: question,
      optionId,
      isCorrectOption,
    }
    this.setState(prevState => ({
      answeredQuestionsList: [
        ...prevState.answeredQuestionsList,
        newAnsweredQuestion,
      ],
    }))
  }

  updateUnAnsweredQuestionsList = () => {
    const {setScore, setTotalQuestions, setUnAnsweredQuestionsList} =
      this.context

    const {totalQuestions, questionsData} = this.state

    const updatedUnAnsweredQuestionsList = questionsData.filter(eachQuestion =>
      this.isQuestionAnswered(eachQuestion.id),
    )

    const totalScore = this.evaluateAnswers()

    setScore(totalScore)
    setTotalQuestions(totalQuestions)
    setUnAnsweredQuestionsList(updatedUnAnsweredQuestionsList)

    this.setState({
      unAnsweredQuestionsList: updatedUnAnsweredQuestionsList,
      score: totalScore,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0ea5e9" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
      <p className="failure-view-description">
        Our servers are busy please try again
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getAssessmentData}
      >
        Retry
      </button>
    </div>
  )

  renderAssessmentView = () => {
    const {questionsData, activeQuestionId, totalQuestions} = this.state

    const activeQuestionDetails = questionsData.find(
      eachQuestion => eachQuestion.id === activeQuestionId,
    )
    const questionIndex = questionsData.findIndex(
      eachQuestion => eachQuestion.id === activeQuestionId,
    )
    const activeQuestionNumber = questionIndex + 1
    const getUserSelectedOptionId = this.getSelectedOptionId()

    return (
      <>
        <Question
          questionDetails={activeQuestionDetails}
          questionNumber={activeQuestionNumber}
          addAnsweredQuestions={this.addAnsweredQuestions}
          userSelectedOptionId={getUserSelectedOptionId}
          goToNextQuestion={this.goToNextQuestion}
          goToResultsPage={this.goToResultsPage}
          totalQuestions={totalQuestions}
        />
      </>
    )
  }

  renderGame = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAssessmentView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="app-container">
          <div className="app-responsive-container">{this.renderGame()}</div>
        </div>
      </>
    )
  }
}

QuizGame.contextType = QuizGameContext

export default QuizGame
