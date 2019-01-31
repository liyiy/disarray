import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from '../actions/channel_actions';
import { merge } from 'lodash';

const channelsReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_CHANNELS:
      let channels = {};
      action.payload.data.forEach(channel => {
        channels[channel._id] = channel;
      });
      newState = {};
      return merge({}, newState, channels);
    case RECEIVE_CHANNEL:
      return merge({}, newState, {[action.payload.data._id]: action.payload.data});
    case REMOVE_CHANNEL:
    debugger
      delete newState[action.payload.data.id];
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
