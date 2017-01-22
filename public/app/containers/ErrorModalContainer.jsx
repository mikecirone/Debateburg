var React = require('react');
var {connect} = require('react-redux');

import * as errorActions from 'errorActions';
import ErrorModal from 'ErrorModal';

var ErrorModalContainer = React.createClass({
  getDefaultProps: function () {
    return {
      title: 'Error'
    };
  },
  propTypes: {
      title: React.PropTypes.string,
      message: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <ErrorModal {...this.props} />
    );
  }
});

const mapStateToProps = function(state) {
  return {
    message: state.error.errorMessage
  };
};

const mapDispatchToProps = function(dispatch, props) {
  return {
    handleClose: function() {
      dispatch(errorActions.closeErrorModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModalContainer);
