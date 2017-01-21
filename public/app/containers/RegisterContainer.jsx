var {connect} = require('react-redux');

import * as registerActions from 'registerActions';
import Register from 'Register';

const mapStateToProps = function(state) {
  return {
    ...state.register,
    error: state.error
  };
};

const mapDispatchToProps = function(dispatch, props) {
  return {
    onRegister: function() {
      dispatch(registerActions.fetchRegister());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
