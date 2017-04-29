var React = require('react');
var {connect} = require('react-redux');

import ChannelsContainer from 'ChannelsContainer';

var Home = React.createClass({
  render: function() {
    var {} = this.props;
    return (
      <div>
        <h2>Home</h2>
        <ChannelsContainer />
      </div>
    );
  }
});

export default Home;
