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
    activeChannel: PropTypes.string.isRequired
  },
  render: function() {
    const {handleSubmit, handleChange, value} = this.props;
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
      activeChannel: state.activeChannel
    };
  },
  //mapDispatchToProps
  (dispatch, props) => {
    return {
      handleSubmit: function(event) {
        event.preventDefault();
        dispatch(itemsActions.submitItemInput({
          text: jQuery(`#${chatStr}-input`).val(),
          channelID: props.activeChannel,
          user: 'mike',
          time: moment.utc().format('lll'),
          id: `${Date.now()}${uuid.v4()}`
        }, props.socket));
      },
      handleChange: function(event) {
        dispatch(itemsActions.changeItemInput(event.target.value));
      }
    };
  } //end mapDispatchToProps
)(ChatItemMakerContainer);
