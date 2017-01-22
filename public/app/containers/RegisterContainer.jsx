var {connect} = require('react-redux');
import { reduxForm } from 'redux-form';

import {fetchRegister} from 'registerActions';
import Register from 'Register';

const mapStateToProps = function(state) {
  return {
    ...state.register,
    ...state.error
    //error: state.error //old method where error.isActive, error.message existed
                         //redux-form did not like this nesting, so just made
                         //errorIsActive and errorMessage vars
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

  if(!values.email)
    errors.email = 'Enter a valid email';

  if(!values.password)
    errors.password = 'Enter a valid password';

  return errors;
}

//redux-form v6 way: must do reduxForm() and! connect() --> https://github.com/erikras/redux-form/issues/1050
//----------------------------------------
var RegisterContainer = reduxForm({
    form: 'RegisterForm',
    fields: ['email', 'password'],
    validate
  })(Register);
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);


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
