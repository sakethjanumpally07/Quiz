import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import StartQuiz from './components/StartQuiz'
import QuizGame from './components/QuizGame'
import GameResults from './components/GameResults'
import GameReport from './components/GameReport'
import NotFound from './components/NotFound'
import QuizGameContext from './context/QuizGameContext'

import './App.css'

class App extends Component {
  state = {
    score: 0,
    totalQuestions: 0,
    unAnsweredQuestionsList: [],
  }

  setScore = score => {
    this.setState({score})
  }

  setTotalQuestions = total => {
    this.setState({totalQuestions: total})
  }

  setUnAnsweredQuestionsList = updatedUnAnsweredQuestionsList => {
    this.setState({unAnsweredQuestionsList: updatedUnAnsweredQuestionsList})
  }

  render() {
    const {score, totalQuestions, unAnsweredQuestionsList} = this.state

    return (
      <QuizGameContext.Provider
        value={{
          score,
          totalQuestions,
          unAnsweredQuestionsList,
          setScore: this.setScore,
          setTotalQuestions: this.setTotalQuestions,
          setUnAnsweredQuestionsList: this.setUnAnsweredQuestionsList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={StartQuiz} />
          <ProtectedRoute exact path="/quiz-game" component={QuizGame} />
          <ProtectedRoute exact path="/game-results" component={GameResults} />
          <ProtectedRoute exact path="/game-report" component={GameReport} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </QuizGameContext.Provider>
    )
  }
}

export default App
