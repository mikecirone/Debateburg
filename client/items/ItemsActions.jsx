var axios = require('axios');

import {actionTypeTemplates} from 'actionTypes';

export default function ItemsActions(itemType, itemFilter) {
  this.requestItems = () => {
    return {
      type: itemType + '_' + actionTypeTemplates.FETCH_ITEMS_REQUEST
    };
  };
  this.receiveItemsSuccess = (data) => {
    return {
      type: itemType + '_' + actionTypeTemplates.FETCH_ITEMS_SUCCESS,
      data
    };
  };
  this.receiveItemsFailure = () => {
    return {
      type: itemType + '_' + actionTypeTemplates.FETCH_ITEMS_FAILURE
    };
  };
  this.fetchItems = (itemFilter) => {
    return (dispatch, getState) => {
      dispatch(this.requestItems());

      return axios.get(`/${itemType}_items`, { params: itemFilter})
      .then( (res) => {
        console.log(res);
        dispatch(this.receiveItemsSuccess(res.data));
        //note: not sure how |this| is correct, given that function is
        //      called from store ... but, it works.
      })
      .catch( (err) => {
        dispatch(this.receiveItemsFailure());
        //TODO: recover below fxality
        // dispatch(showError(`Oops, the ${itemType} items could not be loaded.`));
      });

    };
  };
  this.receiveRawItem = (item) => {
    return {
      type: itemType + '_' + actionTypeTemplates.RECEIVE_ITEM,
      item
    };
  };
  this.resetItemInput = () => {
    return {
      type: itemType + '_' + actionTypeTemplates.RESET_ITEM_INPUT
    };
  };
  this.submitItemInput = (item, socket) => {
    return (dispatch, getState) => {
      socket.emit(`new item`, item);
      dispatch(this.resetItemInput());

      //TODO: figure out why return is here
      //TODO: add error handling, maybe
      return axios.post(`${itemType}_items`, item);
    };
  };
  this.changeItemInput = (text) => {
    return {
      type: itemType + '_' + actionTypeTemplates.CHANGE_ITEM_INPUT,
      text
    };
  };
}
