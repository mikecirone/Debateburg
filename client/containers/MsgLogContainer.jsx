var React = require('react');
var {connect} = require('react-redux');

import ChatLog from 'ChatLog';
// import {fetchMessages, receiveRawMessage} from 'chatActions';
import {fetch, receiveRawMessage} from 'chatActions';

import actionsFactory from 'actionsFactory';

const mapStateToProps = (state) => {
  return {
    // messages: state.chat.messages
    messages: state[type].messages
  };
};

var MsgLogContainer = React.createClass({

  //TODO: consider moving this to mapDispatchToProps
  componentDidMount: function() {
    const { socket, dispatch } = this.props;
    dispatch(fetch[type + 's']());
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
