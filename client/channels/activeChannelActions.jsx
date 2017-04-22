
import * as actionTypes from 'actionTypes';

export var setActiveChannel = (data) => {
  return {
    type: actionTypes.SET_ACTIVE_CHANNEL,
    data: { id: data.id, name: data.name }
  };
};
