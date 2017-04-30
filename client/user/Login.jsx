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
      <div>
        <h3>Login</h3>
        <form onChange={::this.onFieldChanged} onSubmit={::this.onSubmit}>
          <div className="form-group">
            <label>Username or Email</label>
            <input className="form-control" type="text" name="usernameOrEmail" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="text" name="password" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            Login
          </button>
        </form>
        {error && <ErrorModal title="Error" message={error} handleClose={onCloseError} />}
      </div>
    )
  }
}

var RedirectLogin = redirectSubmitted('/lobby')(Login);

export default connectSubmitForm(RedirectLogin, fetchLogin, "Oops, email, username or password is wrong.")
