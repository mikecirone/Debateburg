import React, { PropTypes } from 'react';
var {connect} = require('react-redux');
import jQuery from 'jQuery';
import moment from 'moment';
import uuid from 'node-uuid';

import ItemMaker from 'ItemMaker';
import ItemsActions from 'ItemsActions';

function createItemMakerContainer(itemType, itemInputCallback) {

  var itemsActions = new ItemsActions(itemType);

  var ItemMakerContainer = React.createClass({
    propTypes: {
      socket: PropTypes.object.isRequired
    },
    render: function() {
      const {handleSubmit, handleChange, value} = this.props;
      return (
        <ItemMaker itemType={itemType} value={value}
                   onSubmit={handleSubmit} onChange={handleChange} />
      );
    }
  });

  return connect(
    //mapStateToProps
    (state) => {
      return { value: state[itemType].itemMaker.text };
    },
    //mapDispatchToProps
    (dispatch, props) => {
      return {
        handleSubmit: function(event) {
          dispatch(itemsActions.submitItemInput(itemInputCallback(), props.socket));
        },
        handleChange: function(event) {
          dispatch(itemsActions.changeItemInput(event.target.value));
        }
      };
    } //end mapDispatchToProps
  )(ItemMakerContainer);
}

export default createItemMakerContainer;
