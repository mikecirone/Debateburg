import React, { PropTypes } from 'react';
var {connect} = require('react-redux');
import jQuery from 'jQuery';
import moment from 'moment';
import uuid from 'node-uuid';

import ItemMaker from 'ItemMaker';
import ItemsActions from 'ItemsActions';

const channelStr = 'channels';
var itemsActions = new ItemsActions(channelStr);

var ChannelItemMakerContainer = React.createClass({
  propTypes: {
    socket: PropTypes.object.isRequired
  },
  render: function() {
    const {handleSubmit, handleChange, value} = this.props;
    return (
      <ItemMaker itemType={channelStr} value={value}
                 onSubmit={handleSubmit} onChange={handleChange} />
    );
  }
});

export default connect(
  //mapStateToProps
  (state) => {
    return { value: state.channels.itemMaker.text };
  },
  //mapDispatchToProps
  (dispatch, props) => {
    return {
      handleSubmit: function(event) {
        event.preventDefault();
        dispatch(itemsActions.submitItemInput({
          name: jQuery(`#${channelStr}-input`).val(),
          createdAt: moment.utc().format('lll'),
          id: `${Date.now()}${uuid.v4()}`
        }, props.socket));
      },
      handleChange: function(event) {
        dispatch(itemsActions.changeItemInput(event.target.value));
      }
    };
  } //end mapDispatchToProps
)(ChannelItemMakerContainer);
