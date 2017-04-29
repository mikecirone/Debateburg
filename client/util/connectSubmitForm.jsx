//https://github.com/reactjs/redux/issues/297

import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'

// Keeps track of action
function connectSubmitForm (Form, submitAction, errorMsg) {
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
            this.setState({ isLoading: true })
            submit(...args)
                .then(() => {
                  this.setState({ submitted: true, isLoading: false })
                })
                .catch(() => {
                    this.setState({ error: errorMsg, isLoading: false })
                })
        },

        handleCloseError() {
            this.setState({ error: null });
        },

        render () {
            const {
                onSubmit,
                props,
                state: { submitted, error, isLoading }
            } = this
            return (<Form {...props} onSubmit={onSubmit} submitted={submitted}
                          error={error} onCloseError={this.handleCloseError}
                           isLoading={isLoading} />)
        }
    })
}

export default connectSubmitForm;
