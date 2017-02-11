
import * as actionTypes from 'actionTypes';

export var setActiveChannel = (id) => {
  return {
    type: actionTypes.SET_ACTIVE_CHANNEL,
    id
  };
};
