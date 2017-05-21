var React = require('react');

import ChannelsLogContainer from 'ChannelsLogContainer';
import ChannelItemMakerContainer from 'ChannelItemMakerContainer';

import io from 'socket.io-client';
const socket = io('', { path: '/channels' });

var ChannelsContainer = React.createClass({
  render: function() {
    return (
      <div id="channels-container-react">
        <h3>Debate Archive</h3>
        <ChannelsLogContainer socket={socket} />
        {/* <ChannelItemMakerContainer socket={socket} /> */}
        {/* not for production but good for testing */}
      </div>
    );
  }
});

export default ChannelsContainer;
