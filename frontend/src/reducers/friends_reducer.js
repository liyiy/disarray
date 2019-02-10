import { RECEIVE_FRIENDS, RECEIVE_FRIEND, REMOVE_FRIEND } from '../actions/friend_actions';
import { merge } from 'lodash';

const friendsReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_FRIENDS:
      const friends = {};
      action.payload.data.friends.forEach(friend => {
        friends[friend._id] = friend;
      });
      return merge({}, newState, friends);
    case RECEIVE_FRIEND:
      return merge({}, newState, action.payload.data);
    case REMOVE_FRIEND:
      delete newState[action.payload.data.id];
      return newState;
    default:
      return newState;
  }
};

export default friendsReducer;

