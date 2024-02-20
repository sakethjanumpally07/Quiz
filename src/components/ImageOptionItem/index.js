import './index.css'

const ImageOptionItem = props => {
  const {
    optionDetails,
    isSelected,
    isDisabled,
    isEnabledCorrectAnswer,
    onClickOptionId,
  } = props
  const {imageUrl, id, text, isCorrect} = optionDetails

  const getImageClassName = () => {
    if (isSelected) {
      if (isCorrect === 'true') {
        return 'correct-selected-image'
      }
      return 'incorrect-selected-image'
    }
    if (isEnabledCorrectAnswer && isCorrect === 'true') {
      return 'correct-selected-image'
    }
    if (isDisabled) {
      return 'option-in-active'
    }
    return ''
  }

  const imageClassName = getImageClassName()

  const onClickOption = () => {
    onClickOptionId(id, isCorrect)
  }

  return (
    <li className="image-item">
      <button
        type="button"
        className="image-button"
        onClick={onClickOption}
        disabled={isDisabled}
      >
        <img src={imageUrl} alt={text} className={`${imageClassName} image`} />
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

export default ImageOptionItem
