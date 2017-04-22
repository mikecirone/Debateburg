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
    const {socket, dispatch, activeChannelId,
           userId, username, value} = this.props;

      function handleSubmit(event) {
        event.preventDefault();
        dispatch(itemsActions.submitItemInput({
          text: jQuery(`#${chatStr}-input`).val(),
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
      <ItemMaker itemType={chatStr} value={value}
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
      username: state.user.username
    };
  },
  //mapDispatchToProps
  // (dispatch, props) => {
  //   return {
  //     handleSubmit: function(event) {
  //       event.preventDefault();
  //       dispatch(itemsActions.submitItemInput({
  //         text: jQuery(`#${chatStr}-input`).val(),
  //         channelID: props.activeChannelId,
  //         user: 'mike',
  //         time: moment.utc().format('lll'),
  //         id: `${Date.now()}${uuid.v4()}`
  //       }, props.socket));
  //     },
  //     handleChange: function(event) {
  //       dispatch(itemsActions.changeItemInput(event.target.value));
  //     }
  //   };
  // }
)(ChatItemMakerContainer);
