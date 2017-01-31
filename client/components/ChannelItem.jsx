import React, { PropTypes } from 'react';

var ChannelItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
  },
  render: function() {
    return(
      <li>
        {this.props.item.name}
      </li>
    );
  }
});

export default ChannelItem;
