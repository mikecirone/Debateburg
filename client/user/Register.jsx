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
            <div>
                <h3>Register</h3>
                <form onChange={this.onFieldChanged} onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="text" name="email" />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" type="text" name="username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="text" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        Register
                    </button>
                </form>
                {error && <ErrorModal title="Error" message={error} handleClose={onCloseError} />}
            </div>
        )
    }
});

var RedirectRegister = redirectSubmitted('/lobby')(Register);

export default connectSubmitForm(RedirectRegister, fetchRegister, "Oops, that email or username is already taken.");
