import React, { PropTypes } from 'react';
var {Link} = require('react-router');
var {connect} = require('react-redux');

import {setActiveChannel} from 'activeChannelActions';

var ChannelItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {isOpen: false};
  },
  toggle: function() {
    this.setState({isOpen: !this.state.isOpen})
  },
  render: function() {
    const { item: {sides: {pro, con} } } = this.props;
    const {isOpen} = this.state;

    var resolution = this.props.item.resolution;
    if(!isOpen) {
      resolution = resolution.substring(0, 30);
      resolution += "...";
    }

    if(!isOpen) {
      return(
        <table className="item">
          <tbody>
            <tr>
              <td className="expander-container">
                <a onClick={()=>this.toggle()}>[+]</a>
              </td>
              <td className="content">
                <p className="resolution">
                  {resolution}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="item open">
          <tbody>
            <tr>
              <td className="expander-container">
                <a onClick={()=>this.toggle()}>[-]</a>
              </td>
              <td className="content">
                <table>
                  <tbody>
                    <tr>
                    <td colSpan="2">
                      <p className="resolution">
                        {resolution}
                      </p>
                    </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="v-bar pro"></div>
                      </td>
                      <td className="side">
                        <p>PRO | {pro.username}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="v-bar con"></div>
                      </td>
                      <td className="side">
                        <p>CON | {con.username}</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <a href="#">Go to Debate</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

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
