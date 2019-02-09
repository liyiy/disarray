import axios from 'axios';

export const fetchFriends = () => {
  return axios.get('api/users/friend');
}
export const sendFriendRequest = data => {
  return axios.patch('api/users/friends', data);
};

export const receiveFriendRequest = data => {
  return axios.patch('api/users/friends', data);
};

export const acceptFriendRequest = data => {
  return axios.patch('api/users/friends', data);
};

export const deleteFriend = data => {
  return axios.patch('api/users/friends', data);
};
