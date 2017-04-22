import React, { PropTypes } from 'react';
var {connect} = require('react-redux');

import ItemLog from 'ItemLog';
import ItemsActions from 'ItemsActions';
import ChatItem from 'ChatItem';

var chatStr = 'chat';
var itemsActions = new ItemsActions(chatStr);

var ChatLogContainer = React.createClass({
  propTypes: {
    socket: PropTypes.object.isRequired,
    activeChannelId: PropTypes.string.isRequired
  },

  //TODO: consider moving this to mapDispatchToProps
  componentDidMount: function() {
    const { socket, dispatch, activeChannelId } = this.props;
    dispatch(itemsActions.fetchItems({channelID: activeChannelId}));
    socket.on(`recv new item`, item => {
        dispatch(itemsActions.receiveRawItem(item));
      }
    );
  },

  //resolves this bug:
  //  - go to channel, type a message, go back to channels list page,
  //    go back to a channel, type a message -> 2 messages appear
  componentWillUnmount: function() {
    const { socket } = this.props;
    socket.removeListener('recv new item');
  },

  render: function() {
    return <ItemLog itemType={chatStr} ItemReactClass={ChatItem}
                                        items={this.props.items} />;
  }
});

export default connect((state) => {
  return {
    items: state.chat.data
  };
})(ChatLogContainer);
