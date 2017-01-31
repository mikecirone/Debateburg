import { combineReducers } from 'redux';

import {actionTypeTemplates} from 'actionTypes';

export default function ItemsReducer(itemType) {
  this.dataReducer = (state = [], action) => {
    switch(action.type) {
      case itemType + '_' + actionTypeTemplates.RECEIVE_ITEM:
        return [
            ...state,
            action.item
          ];
      case itemType + '_' + actionTypeTemplates.FETCH_ITEMS_SUCCESS:
        return [...action.data.items];
      default:
        return state;
    }
  };
  this.itemMakerReducer = (state = {
    text: ''
  }, action) => {
    switch(action.type) {
      case itemType + '_' + actionTypeTemplates.RESET_ITEM_INPUT:
        return {text: ''};
      case itemType + '_' + actionTypeTemplates.CHANGE_ITEM_INPUT:
        return {text: action.text};
      default:
        return state;
    }
  };
  this.reducer = combineReducers({
    data: this.dataReducer,
    itemMaker: this.itemMakerReducer
  });
}
