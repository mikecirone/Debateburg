var React = require('react');
var axios = require('axios');
var moment = require('moment');
var uuid = require('node-uuid');
import { hashHistory } from 'react-router';
var {connect} = require('react-redux');

import Proposal from 'Proposal';
import {setActiveChannel} from 'activeChannelActions';

var ProposalContainer = React.createClass({

  getInitialState: function() {
    return { resolution: '' };
  },

  componentDidMount: function() {
    const { props: {socket, onClose, dispatch, challengee} } = this;
    var thisRef = this;
    socket.on("recv accept challenge", function() {
      var channelId = `${Date.now()}${uuid.v4()}`;
      axios.post('channels_items', {
        name: thisRef.state.resolution,
        createdAt: moment.utc().format('lll'),
        id: channelId
      })
      .then(()=> {
        var channelData = { id: channelId, name: thisRef.state.resolution };
        dispatch(setActiveChannel(channelData));
        var obj = { challengee };
        Object.assign(obj, channelData);
        socket.emit('invite to channel', obj);
        hashHistory.push('/debate');
      });
      //TODO: add error-handling
    });
    socket.on("recv reject challenge", function() {
      onClose();
      //TODO: add error dialog that reports challenge rejection to user
    });
  },
  componentWillUnmount: function() {
    const {socket} = this.props;
    socket.removeListener("recv accept challenge");
    socket.removeListener("recv reject challenge");
  },

  handleSubmit: function(resolution) {
    this.setState({resolution});
    const {challengee, challenger, socket} = this.props;
    socket.emit('challenge', {challengee, challenger, resolution});
  },

  render: function() {
    const {challengee, onClose} = this.props;
    return (<Proposal onSubmit={this.handleSubmit} onClose={onClose}
      challengee={challengee} resolutionInputRef={this.resolutionInputRef} />);
  }
});

export default connect()(ProposalContainer);
