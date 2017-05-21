import React, { PropTypes } from 'react';
var {connect} = require('react-redux');
import jQuery from 'jQuery';
import moment from 'moment';
import uuid from 'node-uuid';

import ItemMaker from 'ItemMaker';
import ItemsActions from 'ItemsActions';

var chatStr = 'chat';
var itemsActions = new ItemsActions(chatStr);

var ChatItemMakerContainer = React.createClass({
  propTypes: {
    socket: PropTypes.object.isRequired,
    activeChannelId: PropTypes.string.isRequired
  },
  render: function() {
    const {socket, dispatch, activeChannelId, isUserActive,
           userId, username, value} = this.props;

      function handleSubmit(value) {
        dispatch(itemsActions.submitItemInput({
          text: value,
          channelID: activeChannelId,
          _user: userId,
          username: username,
          time: moment.utc().format('lll'),
          id: `${Date.now()}${uuid.v4()}`
        }, socket));
      };

      function handleChange(event) {
        dispatch(itemsActions.changeItemInput(event.target.value));
      }

    return (
      <ItemMaker itemType={chatStr} value={value} disabled={!isUserActive}
                 onSubmit={handleSubmit} onChange={handleChange} />
    );
  }
});

export default connect(
  //mapStateToProps
  (state) => {
    return {
      value: state.chat.itemMaker.text,
      userId: state.user._id,
      username: state.user.username,
      isUserActive: state.debate.isUserActive
    };
  },
)(ChatItemMakerContainer);
