var React = require('react');

import { Field, SubmissionError } from 'redux-form'

import ErrorModalContainer from 'ErrorModalContainer';

export const renderTextInput = field => {
	const { input, label, type, meta: { touched, error }, invalid } = field
	return (
    <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
      <label>{label}</label>
      <input type={type} className="form-control" {...input} />
      <div id={`${input.name}-text-help`} className="text-help">
        {touched ? error : ''}
      </div>
    </div>
	);
}

//stateless functional component,
//but needs to be React class to work with unit testing
var Register = React.createClass({

  render: function() {

    const {isFetching, errorIsActive, errorMessage} = this.props;
    const { fields: {email, password}, handleSubmit} = this.props;
          //form props hooked up / made available by redux-form,
          //via reduxForm() in RegisterContainer,
          //which acts like connect()

    return (
      <div>
        <h3>Register</h3>
        <p id="loading-text" className={!isFetching && 'invisible'}>Loading...</p>

        <form onSubmit={handleSubmit}>

          <Field name="email" component={renderTextInput} type="text" label="Email"/>

          <Field name="password" component={renderTextInput} type="password" label="Password"/>

					<Field name="passwordConfirm" component={renderTextInput} type="password" label="Confirm Password"/>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        {errorIsActive && <ErrorModalContainer message={errorMessage} />}
      </div>
    );
  }
});

export default Register;
