import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from '../actions/server_actions';
import { merge }  from 'lodash';

const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_SERVERS:
    debugger
      return merge({}, newState, action.payload.data);
    case RECEIVE_SERVER:
      return merge({}, newState, action.payload.data);
    case REMOVE_SERVER:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default serversReducer;