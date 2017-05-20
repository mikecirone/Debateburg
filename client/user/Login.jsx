import React from 'react';

import connectSubmitForm from 'connectSubmitForm';
import ErrorModal from 'ErrorModal';
import {fetchLogin} from 'loginActions';
import {redirectSubmitted} from 'redirect';

class Login extends React.Component {

  onFieldChanged (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit (event) {
    event.preventDefault()
    const { usernameOrEmail, password } = this.state
    this.props.onSubmit(usernameOrEmail, password)
  }

  render () {
    const { props: { isLoading, error, onCloseError } } = this
    return (

      <div className="fullscreen">
        <div className="dialog access">
          <h3>Login</h3>
          <form onChange={::this.onFieldChanged} onSubmit={::this.onSubmit}>
            <h4>Username or Email:</h4>
            <input type="text" name="usernameOrEmail" />
            <h4>Password:</h4>
            <input type="text" name="password" />
            <div className="btns-container">
              <button type="submit" disabled={isLoading}>
                Login
              </button>
            </div>
          </form>
          {error &&
            <ErrorModal title="Error" message={error} handleClose={onCloseError} />}
        </div>
      </div>

    )
  }
}

var RedirectLogin = redirectSubmitted('/lobby')(Login);

export default connectSubmitForm(RedirectLogin, fetchLogin, "Oops, email, username or password is wrong.")
