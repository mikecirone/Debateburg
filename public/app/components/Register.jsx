var React = require('react');
//needed, not sure why

import ErrorModalContainer from 'ErrorModalContainer';

//stateless functional component,
//but needs to be React class to work with unit testing
var Register = React.createClass({
  render: function() {
    const {isFetching, authToken, handleRegister, errorIsActive, errorMessage} = this.props;
    const { fields: {email, password}, handleSubmit} = this.props;
          //form props hooked up / made available by redux-form,
          //via reduxForm() in RegisterContainer,
          //which acts like connect()
    return (
      <div>
        <h3>Register</h3>
        <p id="loading-text" className={!isFetching && 'invisible'}>Loading...</p>

        <form onSubmit={handleSubmit(this.props.handleRegister)}>

          <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
            <label>Email</label>
            <input type="text" className="form-control" {...email} />
            <div className="text-help">
              {email.touched ? email.error : ''}
            </div>
          </div>

          <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
            <label>Password</label>
            <input type="text" className="form-control" {...password} />
            <div className="text-help">
              {password.touched ? password.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        {errorIsActive && <ErrorModalContainer message={errorMessage} />}
      </div>
    );
  }
})

export default Register;

// var React = require('react');
//
// var Register = React.createClass({
//   render: function() {
//     var {isFetching, authToken, onRegister} = this.props;
//
//     return (
//       <div>
//         <p>Register</p>
//         <p className={!isFetching ? 'invisible' : ''}>Loading...</p>
//         <button className="button" onClick={onRegister}>
//           Go
//         </button>
//       </div>
//     );
//   }
// });
//
// export default Register;
