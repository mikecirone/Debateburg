import React, { PropTypes } from 'react';
var {Link} = require('react-router');
var {connect} = require('react-redux');

import {setActiveChannel} from 'activeChannelActions';

var ChannelItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
  },
  render: function() {
    const {handleClick} = this.props;
    return(
      <li>
        <Link onClick={handleClick} to="/chat">{this.props.item.name}</Link>
      </li>
    );
  }
});

export default connect(
  null,
  (dispatch, props) => {
    return {
      handleClick: (event) => {
        dispatch(setActiveChannel(props.item.id));
      }
    };
  }
)(ChannelItem);
