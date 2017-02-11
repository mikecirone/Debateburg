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
    activeChannel: PropTypes.string.isRequired
  },

  //TODO: consider moving this to mapDispatchToProps
  componentDidMount: function() {
    const { socket, dispatch, activeChannel } = this.props;
    dispatch(itemsActions.fetchItems({channelID: activeChannel}));
    socket.on(`recv new item`, item => {
        dispatch(itemsActions.receiveRawItem(item));
      }
    );
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
