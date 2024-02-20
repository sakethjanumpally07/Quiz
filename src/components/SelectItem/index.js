import './index.css'

const SelectItem = props => {
  const {
    optionDetails,
    onClickOptionId,
    isSelected,
    isDisabled,
    isEnabledCorrectAnswer,
  } = props
  const {id, text, isCorrect} = optionDetails

  const getSelectClassName = () => {
    if (isSelected) {
      if (isCorrect === 'true') {
        return 'correct-selected-radio-button'
      }
      return 'incorrect-selected-radio-button'
    }
    if (isEnabledCorrectAnswer && isCorrect === 'true') {
      return 'correct-selected-radio-button'
    }
    if (isDisabled) {
      return 'option-in-active'
    }
    return ''
  }

  const radioButtonClassName = getSelectClassName()

  const handleRadioChange = () => {
    onClickOptionId(id, isCorrect)
  }

  return (
    <li className="radio-button-option-item">
      <input
        type="radio"
        id={id}
        className={`${radioButtonClassName} radio-button`}
        name={text}
        value={id}
        onChange={handleRadioChange}
        disabled={isDisabled}
      />
      <label htmlFor={id} className={`${radioButtonClassName} radio-label`}>
        {text}
      </label>
      {isEnabledCorrectAnswer && isCorrect === 'true' ? (
        <img
          className="radio-check-circle"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
        />
      ) : (
        ''
      )}
      {isSelected && isCorrect === 'true' ? (
        <img
          className="radio-check-circle"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
        />
      ) : (
        ''
      )}
      {isSelected && isCorrect === 'false' ? (
        <img
          className="radio-check-circle"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
          alt="incorrect close circle"
        />
      ) : (
        ''
      )}
    </li>
  )
}

export default SelectItem
