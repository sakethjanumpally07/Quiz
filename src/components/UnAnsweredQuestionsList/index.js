import SelectItem from '../SelectItem'
import ImageOptionItem from '../ImageOptionItem'
import ButtonOptionItem from '../ButtonOptionItem'

import './index.css'

const optionsTypesList = {
  default: 'DEFAULT',
  image: 'IMAGE',
  singleSelect: 'SINGLE_SELECT',
}

const UnAnsweredQuestionsList = props => {
  const {questionDetails} = props
  const {questionText, optionsType, options} = questionDetails
  const isDisabled = true

  const renderSelect = () => (
    <ul className="radio-options-list">
      {options.map(eachOption => (
        <SelectItem
          key={eachOption.id}
          optionDetails={eachOption}
          isDisabled={isDisabled}
          isEnabledCorrectAnswer
        />
      ))}
    </ul>
  )

  const renderImageOptions = () => (
    <ul className="image-options-list">
      {options.map(eachOption => (
        <ImageOptionItem
          key={eachOption.id}
          optionDetails={eachOption}
          isDisabled={isDisabled}
          isEnabledCorrectAnswer
        />
      ))}
    </ul>
  )

  const renderButtonOptions = () => (
    <ul className="options-list">
      {options.map(eachOption => (
        <ButtonOptionItem
          key={eachOption.id}
          optionDetails={eachOption}
          isDisabled={isDisabled}
          isEnabledCorrectAnswer
        />
      ))}
    </ul>
  )

  const renderOptions = () => {
    switch (optionsType) {
      case optionsTypesList.default:
        return renderButtonOptions()
      case optionsTypesList.image:
        return renderImageOptions()
      case optionsTypesList.singleSelect:
        return renderSelect()
      default:
        return null
    }
  }

  return (
    <div className="answer-list-item-container">
      <div className="question-content">
        <p className="question">{questionText}</p>
        {renderOptions()}
      </div>
    </div>
  )
}

export default UnAnsweredQuestionsList
