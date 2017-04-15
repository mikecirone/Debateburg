var React = require('react');

import ChannelsLogContainer from 'ChannelsLogContainer';
import ChannelItemMakerContainer from 'ChannelItemMakerContainer';

import io from 'socket.io-client';
const socket = io('', { path: '/channels' });

var ChannelsContainer = React.createClass({
  render: function() {
    return (
      <div>
        <ChannelsLogContainer socket={socket} />
        <ChannelItemMakerContainer socket={socket} />
      </div>
    );
  }
});

export default ChannelsContainer;
