import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from '../actions/server_actions';
// import { REMOVE_CHANNEL, RECEIVE_CHANNEL } from '../actions/channel_actions';
import { merge }  from 'lodash';

const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_SERVERS:
      const servers = {};
      action.payload.data.servers.forEach(server => {
          servers[server._id] = server;
      });
      return merge({}, newState, servers);
    // case REMOVE_CHANNEL:
    //   delete newState[action.payload.data.server].channels[action.payload.data._id]
    //   return merge({}, newState);
    case RECEIVE_SERVER:
      return merge({}, newState, {[action.payload.data._id]: action.payload.data});
    case REMOVE_SERVER:
      delete newState[action.payload.data.id];
      return newState;
    default:
      return state;
  }
};

export default serversReducer;