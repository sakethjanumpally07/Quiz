import React from 'react'

const QuizGameContext = React.createContext({
  score: 0,
  totalQuestions: 0,
  unAnsweredQuestionsList: [],
  setScore: () => {},
  setTotalQuestions: () => {},
  setUnAnsweredQuestionsList: () => {},
})

export default QuizGameContext
