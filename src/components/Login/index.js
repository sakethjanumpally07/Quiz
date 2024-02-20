import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userNameInput: '',
    passwordInput: '',
    showSubmitError: false,
    showPassword: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userNameInput, passwordInput} = this.state
    const userDetails = {username: userNameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderShowPasswordCheckboxField = () => {
    const {showPassword} = this.state
    return (
      <div className="checkbox-input-container">
        <input
          type="checkbox"
          id="checkbox"
          onChange={this.onChangeShowPassword}
          checked={showPassword}
          className="checkbox-input"
        />
        <label className="show-password-label" htmlFor="checkbox">
          Show Password
        </label>
      </div>
    )
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="passwordInput">
          PASSWORD
        </label>
        <input
          type={passwordType}
          id="passwordInput"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          className="input-field"
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="usernameInput">
          USERNAME
        </label>
        <input
          type="text"
          id="usernameInput"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
          className="input-field"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/do4qwwms8/image/upload/v1704271623/Ellipse_1_hqdbp8.png"
            alt="login website logo"
            className="login-website-logo"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          {this.renderShowPasswordCheckboxField()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
