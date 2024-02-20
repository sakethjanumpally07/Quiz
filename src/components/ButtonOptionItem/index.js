import './index.css'

const ButtonOptionItem = props => {
  const {
    optionDetails,
    onClickOptionId,
    isSelected,
    isDisabled,
    isEnabledCorrectAnswer,
  } = props
  const {id, text, isCorrect} = optionDetails
  const getButtonClassName = () => {
    if (isSelected) {
      if (isCorrect === 'true') {
        return 'correct-selected-button'
      }
      return 'incorrect-selected-button'
    }
    if (isEnabledCorrectAnswer && isCorrect === 'true') {
      return 'correct-selected-button'
    }
    if (isDisabled) {
      return 'option-in-active'
    }
    return ''
  }

  const buttonClassName = getButtonClassName()

  const onClickOption = () => {
    onClickOptionId(id, isCorrect)
  }

  return (
    <li className="button-option-item">
      <button
        type="button"
        className={`${buttonClassName} button-option`}
        onClick={onClickOption}
        disabled={isDisabled}
      >
        {text}
      </button>
      {isEnabledCorrectAnswer && isCorrect === 'true' ? (
        <img
          className="check-circle"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
        />
      ) : (
        ''
      )}
      {isSelected && isCorrect === 'true' ? (
        <img
          className="check-circle"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
        />
      ) : (
        ''
      )}
      {isSelected && isCorrect === 'false' ? (
        <img
          className="check-circle"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
          alt="incorrect close circle"
        />
      ) : (
        ''
      )}
    </li>
  )
}

export default ButtonOptionItem
