//https://github.com/reactjs/redux/issues/297

var React = require('react');
import { hashHistory } from 'react-router';

// redirect to path if predicate returns true
export function redirect (path, predicate) {
    return (Component) => {
      return React.createClass({

        componentWillReceiveProps: function(nextProps) {
            if (predicate(nextProps))
                hashHistory.push(path);
        },
        render: function() {
            return <Component {...this.props} />;
        }
      });
    }
}

//redirect to path if submitted
export function redirectSubmitted (path) {
    return redirect(path, ({ submitted }) => submitted);
                          //destructure |submitted| off param object
                          //and return its value
}
