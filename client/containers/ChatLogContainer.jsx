var React = require('react');
var {connect} = require('react-redux');

import ChatLog from 'ChatLog';

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages
  };
};

var ChatLogContainer = React.createClass({

  componentDidMount: function() {
    const { socket, dispatch } = this.props;
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
  },

  render: function() {
    return <ChatLog messages={this.props.messages} />;
  }
});

export default connect(mapStateToProps)(ChatLogContainer);
