var React = require('react');

import Proposal from 'Proposal';

var ProposalContainer = React.createClass({

  handleSubmit: function() {
    const {challengee, challenger, socket} = this.props;
    socket.emit('challenge', {challengee, challenger});
  },

  render: function() {
    const {challengee, onClose} = this.props;
    return (<Proposal onSubmit={this.handleSubmit} onClose={onClose}
      challengee={challengee} />);
  }
});

export default ProposalContainer;
