//https://github.com/reactjs/redux/issues/297

import React from 'react';

import connectSubmitForm from 'connectSubmitForm';
import ErrorModal from 'ErrorModal';
import {fetchRegister} from 'registerActions';
import {redirectSubmitted} from 'redirect';

var Register = React.createClass({

    onFieldChanged: function(event) {
        this.setState({[event.target.name]: event.target.value});
    },

    onSubmit: function(event) {
        event.preventDefault();
        const { email, username, password } = this.state;
        this.props.onSubmit(email, username, password);
    },

    render: function() {
        const { props: { isLoading, error, onCloseError } } = this;
        return (

          <div className="fullscreen">
            <div className="dialog access">
              <h3>Register</h3>
              <form onChange={::this.onFieldChanged} onSubmit={::this.onSubmit}>
                <h4>Email:</h4>
                <input type="text" name="email" />
                <h4>Username:</h4>
                <input type="text" name="username" />
                <h4>Password:</h4>
                <input type="text" name="password" />
                <div className="btns-container">
                  <button type="submit" disabled={isLoading}>
                    Register
                  </button>
                </div>
              </form>
              {error &&
                <ErrorModal title="Error" message={error} handleClose={onCloseError} />}
            </div>
          </div>
          
        )
    }
});

var RedirectRegister = redirectSubmitted('/lobby')(Register);

export default connectSubmitForm(RedirectRegister, fetchRegister, "Oops, that email or username is already taken.");
