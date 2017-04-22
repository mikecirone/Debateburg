//https://github.com/reactjs/redux/issues/297

var React = require('react');
import { hashHistory } from 'react-router';

// redirect to path if predicate returns true
export function redirect (path, predicate) {
    return Component =>
        class Composed extends React.Component {

            componentWillReceiveProps (nextProps) {
                if (predicate(nextProps))
                    hashHistory.push(path);
            }

            render () {
                return <Component {...this.props} />
            }
        }
}

//redirect to path if submitted
export function redirectSubmitted (path) {
    return redirect(path, ({ submitted }) => submitted)
                          //destructure |submitted| off param object
                          //and return its value
}
