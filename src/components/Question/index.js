import {Component} from 'react'

import ButtonOptionItem from '../ButtonOptionItem'
import ImageOptionItem from '../ImageOptionItem'
import SelectItem from '../SelectItem'

import './index.css'

const optionsTypesList = {
  default: 'DEFAULT',
  image: 'IMAGE',
  singleSelect: 'SINGLE_SELECT',
}

class Question extends Component {
  state = {
    timerLimitInSeconds: 15,
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  decrementTimeLimitInSeconds = () => {
    const {timerLimitInSeconds} = this.state
    const {questionNumber, totalQuestions} = this.props
    const isTimerCompleted = timerLimitInSeconds === 1
    const isLastQuestion = questionNumber === totalQuestions

    if (isTimerCompleted) {
      if (isLastQuestion) {
        this.onClickSubmit()
      } else {
        this.onClickNextQuestion()
      }
    } else {
      this.setState(prevState => ({
        timerLimitInSeconds: prevState.timerLimitInSeconds - 1,
      }))
    }
  }

  startTimer = () => {
    this.intervalId = setInterval(this.decrementTimeLimitInSeconds, 1000)
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickSubmit = () => {
    const {goToResultsPage} = this.props
    this.clearTimerInterval()
    goToResultsPage()
  }

  onClickNextQuestion = () => {
    const {goToNextQuestion, questionNumber} = this.props
    this.clearTimerInterval()
    goToNextQuestion(questionNumber)
    this.setState(
      {
        timerLimitInSeconds: 15,
      },
      this.startTimer,
    )
  }

  onClickOptionId = (id, isCorrectOption) => {
    const {questionDetails, addAnsweredQuestions} = this.props
    this.clearTimerInterval()
    addAnsweredQuestions(questionDetails, id, isCorrectOption)
  }

  renderSelect = () => {
    const {questionDetails, userSelectedOptionId} = this.props
    const {options} = questionDetails

    return (
      <ul className="radio-options-list">
        {options.map(eachOption => (
          <SelectItem
            key={eachOption.id}
            optionDetails={eachOption}
            onClickOptionId={this.onClickOptionId}
            isSelected={eachOption.id === userSelectedOptionId}
            isDisabled={userSelectedOptionId !== ''}
            isEnabledCorrectAnswer={this.getEnabledCorrectAnswerStatus(
              eachOption.id,
              userSelectedOptionId,
              eachOption,
            )}
          />
        ))}
      </ul>
    )
  }

  renderImageOptions = () => {
    const {questionDetails, userSelectedOptionId} = this.props
    const {options} = questionDetails

    return (
      <ul className="image-options-list">
        {options.map(eachOption => (
          <ImageOptionItem
            key={eachOption.id}
            optionDetails={eachOption}
            onClickOptionId={this.onClickOptionId}
            isDisabled={userSelectedOptionId !== ''}
            isSelected={eachOption.id === userSelectedOptionId}
            isEnabledCorrectAnswer={this.getEnabledCorrectAnswerStatus(
              eachOption.id,
              userSelectedOptionId,
              eachOption,
            )}
          />
        ))}
      </ul>
    )
  }

  getEnabledCorrectAnswerStatus = (
    optionId,
    selectedOptionId,
    optionDetails,
  ) => {
    if (selectedOptionId && optionId !== selectedOptionId) {
      if (optionDetails.isCorrect === 'true') {
        return true
      }
      return false
    }
    return ''
  }

  renderButtonOptions = () => {
    const {questionDetails, userSelectedOptionId} = this.props
    const {options} = questionDetails

    return (
      <ul className="options-list">
        {options.map(eachOption => (
          <ButtonOptionItem
            key={eachOption.id}
            optionDetails={eachOption}
            onClickOptionId={this.onClickOptionId}
            isSelected={eachOption.id === userSelectedOptionId}
            isDisabled={userSelectedOptionId !== ''}
            isEnabledCorrectAnswer={this.getEnabledCorrectAnswerStatus(
              eachOption.id,
              userSelectedOptionId,
              eachOption,
            )}
          />
        ))}
      </ul>
    )
  }

  renderOptions = () => {
    const {questionDetails} = this.props
    const {optionsType} = questionDetails

    switch (optionsType) {
      case optionsTypesList.default:
        return this.renderButtonOptions()
      case optionsTypesList.image:
        return this.renderImageOptions()
      case optionsTypesList.singleSelect:
        return this.renderSelect()
      default:
        return null
    }
  }

  render() {
    const {timerLimitInSeconds} = this.state
    const {
      questionDetails,
      questionNumber,
      totalQuestions,
      userSelectedOptionId,
    } = this.props

    const {questionText} = questionDetails
    const isLastQuestion = questionNumber === totalQuestions
    const nextQuestionClassName = !userSelectedOptionId
      ? 'next-button-in-active'
      : ''

    return (
      <div className="question-container">
        <div className="question-details">
          <div className="serial-number-container">
            <p className="question-text">Question</p>
            <p className="question-number">
              {questionNumber}/{totalQuestions}
            </p>
          </div>
          <div className="timer-container">
            <p className="timer-text">{timerLimitInSeconds}</p>
          </div>
        </div>
        <div className="question-content">
          <p className="question">{questionText}</p>
          {this.renderOptions()}
        </div>
        <div className="next-question-button-container">
          {!isLastQuestion ? (
            <button
              type="button"
              className={`${nextQuestionClassName} next-question-button`}
              onClick={this.onClickNextQuestion}
              disabled={userSelectedOptionId === ''}
            >
              Next Question
            </button>
          ) : (
            <button
              type="button"
              className={`${nextQuestionClassName} next-question-button`}
              onClick={this.onClickSubmit}
              disabled={userSelectedOptionId === ''}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default Question
