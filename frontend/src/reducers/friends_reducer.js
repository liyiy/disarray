import { RECEIVE_FRIENDS, RECEIVE_FRIEND, REMOVE_FRIEND } from '../actions/friend_actions';
import { merge } from 'lodash';

const friendsReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_FRIENDS:
      return merge({}, newState, action.payload.data.friends);
    default:
      return newState;
  }
};

export default friendsReducer;

