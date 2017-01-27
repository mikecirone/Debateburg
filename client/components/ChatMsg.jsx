var React, {PropTypes} = require('react');

export default ChatMsg = React.createClass({
  propTypes: {
    msg: PropTypes.string.isRequired
  },
  render: function() {
    <li>
      {this.props.msg}
    </li>
  }
});
