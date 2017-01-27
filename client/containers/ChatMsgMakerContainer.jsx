var React, {PropTypes} = require('react');
var {connect} = require('react-redux');

import ChatMsgMaker from 'ChatMsgMaker';

var ChatMsgMakerContainer = React.createClass({

  propTypes: {
    socket: PropTypes.object.isRequired
  },

  render: function() {
    return (
      <ChatMsgMaker  />
    );
  }
});

const mapStateToProps = function(state) {
  return {

  };
};

const mapDispatchToProps = function(dispatch, props) {
  return {
    handleSubmit: function(event) {
      // var msg = {
      //   text: event.target.value.trim(),
      //   channelID: "debatehall1"
      //   // channelID: props.activeChannel
      // };
      props.socket.emit('new message', 'bar');
    }
  };
};

export default connect(null, mapDispatchToProps)(ChatMsgMakerContainer);
