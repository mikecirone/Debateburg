var {connect} = require('react-redux');
import { reduxForm } from 'redux-form';

import {fetchRegister} from 'registerActions';
import Register from 'Register';

const mapStateToProps = function(state) {
  return {
    ...state.register,
    ...state.error
    // //error: state.error //old method where error.isActive, error.message existed
    //                      //redux-form did not like this nesting, so just made
    //                      //errorIsActive and errorMessage vars
  };
};

const mapDispatchToProps = function(dispatch, props) {
  return {
    onSubmit: function(values) {
      dispatch(fetchRegister(values.email, values.password));
    }
  };
};

function validate(values) {
  const errors = {};


  var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!values.email || !emailRegEx.test(values.email))
    errors.email = 'Enter a valid email';

  var badPassRegEx = /[^A-Za-z0-9]/;
  if(!values.password || values.password.length < 8 || badPassRegEx.test(values.password))
    errors.password = 'Enter a valid password ( >= 8 alphanumeric characters )';

  if(values.passwordConfirm !== values.password)
    errors.passwordConfirm = 'Passwords do not match';

  return errors;
}


//allows for overriding properties, used for testing
//   (e.g.-detecting that onSubmit is not called when data is invalid)
//---------------------------------------
var RegisterContainer = reduxForm({
    form: 'RegisterForm',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
  })(Register);
const mergeProps = (stateProps, dispatchProps, ownProps) =>
                      Object.assign({}, stateProps, dispatchProps, ownProps)
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RegisterContainer);


//redux-form v6 way: must do reduxForm() and! connect() --> https://github.com/erikras/redux-form/issues/1050
//----------------------------------------
// var RegisterContainer = reduxForm({
//     form: 'RegisterForm',
//     fields: ['email', 'password', 'passwordConfirm'],
//     validate
//   })(Register);
// export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);


//redux-form v5 way
//---------------------------------------------
// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
// export default reduxForm({
//     form: 'RegisterForm',
//     fields: ['email', 'password'],
//     validate
//   },
//   mapStateToProps,
//   mapDispatchToProps
// )(Register);

// Oldest way: before redux-form
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Register);
