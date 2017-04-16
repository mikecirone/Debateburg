//https://github.com/reactjs/redux/issues/297

import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
var axios = require('axios');

// Keeps track of action
function connectSubmitForm (Form, submitAction) {
    return React.createClass({
        contextTypes: {
            //redux Store
            store: PropTypes.object.isRequired
        },

        getInitialState () {
            return {}
        },

        onSubmit (...args) {
            const { context: { store: { dispatch } } } = this
            const { submitAction: submit }
                = bindActionCreators({ submitAction }, dispatch)
            // this.setState({ submitted: true })
            submit(...args)
                .then(() => this.setState({ submitted: true }))
                .catch(error => this.setState({ error: error.message }))
        },

        render () {
            const {
                onSubmit,
                props,
                state: { submitted, error }
            } = this
            return (<Form {...props} onSubmit={onSubmit} submitted={submitted}
                          error={error} />)
        }
    })
}

import {redirectSubmitted} from 'redirect';

class Register extends React.Component {

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit (event) {
        event.preventDefault()
        const { email, password } = this.state
        this.props.onSubmit(email, password)
    }

    render () {
        const { props: { isLoading, error } } = this
        return (
            <div>
                <h3>Register</h3>
                <form onChange={::this.onFieldChanged} onSubmit={::this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="text" name="email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="text" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
                {error ? <p>{ error }</p> : null}
                {/*{errorIsActive && <ErrorModalContainer message={errorMessage} />}*/}
            </div>
        )
    }
}

var RedirectRegister = redirectSubmitted('/home')(Register);

import * as actionTypes from 'actionTypes';
export var receiveRegisterSuccess = (data) => {
    return {
        type: actionTypes.FETCH_REGISTER_SUCCESS,
        data: {
            authToken: data.authToken,
            email: data.email
        }
    };
};

var fetchRegister = (email, password) => {
    return (dispatch, getState) => {

        return axios.post('/users', {
            email, password
        }).then( (res) => {
            dispatch(receiveRegisterSuccess({
                authToken: res.headers['x-auth'],
                email: res.data.email
            }));
        });
    }
}

// import {fetchRegister} from 'registerActions';

export default connectSubmitForm(RedirectRegister, fetchRegister)