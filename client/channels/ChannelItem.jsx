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
        <Link onClick={handleClick} to="/debate">{this.props.item.resolution}</Link>
      </li>
    );
  }
});

export default connect(
  null,
  (dispatch, props) => {
    return {
      handleClick: (event) => {
        dispatch(setActiveChannel({
          id: props.item.id,
          resolution: props.item.resolution,
          isDebate: false
        }));
      }
    };
  }
)(ChannelItem);
