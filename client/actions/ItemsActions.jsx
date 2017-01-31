var axios = require('axios');

import {actionTypeTemplates} from 'actionTypes';

export default function ItemsActions(itemType) {
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
  this.fetchItems = () => {
    return (dispatch, getState) => {
      dispatch(this.requestItems());

      var endpoint = `/${itemType}_items`;

      return axios.get(endpoint)
      .then( (res) => {
        dispatch(this.receiveItemsSuccess(res.data));
        //note: not sure how |this| is correct, given that function is
        //      called from store ... but, it works.
      })
      .catch( (err) => {
        dispatch(this.receiveItemsFailure());
        dispatch(showError(`Oops, the ${itemType} items could not be loaded.`));
      });

    };
  };
  this.receiveRawItem = (message) => {
    return {
      type: itemType + '_' + actionTypeTemplates.RECEIVE_ITEM,
      message
    };
  };
  this.resetItemInput = () => {
    return {
      type: itemType + '_' + actionTypeTemplates.RESET_ITEM_INPUT
    };
  };
  this.submitItemInput = (item, socket) => {
    return (dispatch, getState) => {
      socket.emit(`new ${itemType} item`, item);
      dispatch(this.resetItemInput());

      //TODO: figure out why return is here
      //TODO: add error handling, maybe
      return axios.post(`${itemType}_items`, {...item});
    };
  };
  this.changeItemInput = (text) => {
    return {
      type: itemType + '_' + actionTypeTemplates.CHANGE_ITEM_INPUT,
      text
    };
  };
}
