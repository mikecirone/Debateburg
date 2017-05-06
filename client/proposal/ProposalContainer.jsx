var React = require('react');

import Proposal from 'Proposal';

var ProposalContainer = React.createClass({

  handleSubmit: function() {
    const {challengee, challenger, socket} = this.props;
    socket.emit('challenge', {challengee, challenger});
  },

  render: function() {
    const {challengee} = this.props;
    return <Proposal handleSubmit={this.handleSubmit} challengee={challengee} />;
  }
});

export default ProposalContainer;
