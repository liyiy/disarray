import { RECEIVE_SERVERS, RECEIVE_SERVER } from '../actions/server_actions';
import { merge }  from 'lodash';

const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_SERVERS:
      merge({}, newState, action.payload)
      return newState;
    case RECEIVE_SERVER:
      merge({}, newState, action.payload)
      return newState;
    default:
      return state;
  }
}

export default serversReducer;