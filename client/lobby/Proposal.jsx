var React = require('react');

import {PRO, CON} from 'constants';

var Proposal = React.createClass({

    getInitialState: function() {
      return {
        resolution: '',
        side: PRO
      }
    },

    handleResolutionChange: function(event) {
      this.setState({resolution: event.target.value})
    },

    handleRadioChange: function(event) {
      this.setState({side: event.target.value})
    },

    handleSubmit: function() {
      this.props.onSubmit(this.state.resolution, this.state.side)
    },

    render: function() {
      const {challengee: {username}, resolutionInputRef,
             onClose, onSubmit} = this.props;
      const {side} = this.state;
      return (

        <div className="fullscreen">
          <div className="dialog proposal">
            <form onSubmit={this.handleSubmit}>
              <h4>Please enter your proposed debate resolution:</h4>
              <textarea rows="2" value={this.state.resolution}
                onChange={this.handleResolutionChange} />
              <div>
                <h4 className="inline">Choose a side: </h4>
                <input type="radio" value={PRO}
                  checked={ (side===PRO) ? true : false }
                  onChange={this.handleRadioChange} />
                PRO
                <input type="radio" value={CON}
                  checked={ (side===CON) ? true : false }
                  onChange={this.handleRadioChange} />
                CON
              </div>
              <div className="btns-container">
                <button type="submit">
                  Challenge {username}
                </button>
              </div>
            </form>
          </div>
        </div>

      );
    }
})

export default Proposal;
