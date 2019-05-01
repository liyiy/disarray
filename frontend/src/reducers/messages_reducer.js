import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from '../actions/message_actions';
import { merge } from 'lodash';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return merge({}, newState, action.payload.data);
    case RECEIVE_MESSAGE:
      return merge({}, newState, {[action.payload.data.id]: action.payload.data})
    default:
      return state;
  }
}

export default messagesReducer;