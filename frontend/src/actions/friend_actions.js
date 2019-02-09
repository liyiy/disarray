import * as FriendApiUtil from '../util/friend_api_util';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';
export const RECEIVE_FRIEND_REQUEST = 'RECEIVE_FRIEND_REQUEST';
export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

export const receiveFriends = payload => {
  return {
    type: RECEIVE_FRIENDS,
    payload
  };
};

export const receiveFriend = payload => {
  return {
    type: RECEIVE_FRIENDS,
    payload
  };
};

export const removeFriend = payload => {
  return {
    type: REMOVE_FRIEND,
    payload
  };
};

// export const receiveFriendRequest = payload => {
//   return {
//     type: RECEIVE_FRIEND_REQUEST,
//     payload
//   };
// };

// export const acceptFriendRequest = payload => {
//   return {
//     type: ACCEPT_FRIEND_REQUEST,
//     payload
//   };
// };

export const fetchFriends = () => dispatch => {
  return FriendApiUtil.fetchFriends()
    .then(response => dispatch(receiveFriends(response)));
};

export const receiveFriendRequest = (friendData) => {
  return FriendApiUtil.receiveFriendRequest(friendData)
    .then(response => dispatch(receiveFriend(response)));
};

export const sendFriendRequest = (friendData) => {
  return FriendApiUtil.sendFriendRequest(friendData)
    .then(response => dispatch(receiveFriend(response)));
};

export const acceptFriendRequest = (data) => {
  return FriendApiUtil.acceptFriendRequest(data)
    .then(response => dispatch(receiveFriend(response)));
};

export const deleteFriend = (data) => {
  return FriendApiUtil.deleteFriend(data)
    .then(response => dispatch(removeFriend(response)));
};

