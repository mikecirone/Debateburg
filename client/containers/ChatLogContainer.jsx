var React = require('react');
var {connect} = require('react-redux');

import ChatLog from 'ChatLog';
import {fetchMessages, receiveRawMessage} from 'chatActions';

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages
  };
};

var ChatLogContainer = React.createClass({

  //TODO: consider moving this to mapDispatchToProps
  componentDidMount: function() {
    const { socket, dispatch } = this.props;
    dispatch(fetchMessages());
    socket.on('recv new message', msg => {
        dispatch(receiveRawMessage(msg));
      }
    );
  },

  render: function() {
    return <ChatLog messages={this.props.messages} />;
  }
});

export default connect(mapStateToProps)(ChatLogContainer);
