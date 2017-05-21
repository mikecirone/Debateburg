import React, { PropTypes } from 'react';
var {connect} = require('react-redux');

var ChatItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
  },
  render: function() {

    const {conUserId} = this.props;
    const isItemCon = (conUserId===this.props.item._user);

    var itemContainerClassStr
        = isItemCon ? "item-container con" : "item-container pro";

    var vBarClassStr
         = isItemCon ? "v-bar con" : "v-bar pro";

    var username = (this.props.item.username) ? this.props.item.username : //real-time chat messages
                                          this.props.item._user.username;  //chat messages retrieved from db

    return(

      <div className={itemContainerClassStr}>
        <div className="item">
          <table>
            <tbody>
              <tr>
                <td className={vBarClassStr}>
                </td>
                <td className="content">
                  <p>
                      {this.props.item.text}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
  }
});

export default connect((state) => {
  return {
    conUserId: state.debate.sides.con._id
  };
})(ChatItem);
