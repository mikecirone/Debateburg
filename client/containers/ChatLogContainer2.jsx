var React = require('react');
var {connect} = require('react-redux');

import ChatLog from 'ChatLog';
import {fetchMessages, receiveRawMessage} from 'chatActions';
import ItemsActions from 'ItemsActions';

var chatActions = new ItemsActions('chat');

const mapStateToProps = (state) => {
  return {
    messages: state.chat2.data
  };
};

var ChatLogContainer2 = React.createClass({

  //TODO: consider moving this to mapDispatchToProps
  componentDidMount: function() {
    const { socket, dispatch } = this.props;
    dispatch(chatActions.fetchItems());
    socket.on('recv new chat item', item => {
        dispatch(chatActions.receiveRawItem(item));
      }
    );
  },

  render: function() {
    return <ChatLog messages={this.props.messages} />;
  }
});

export default connect(mapStateToProps)(ChatLogContainer2);
