import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUsers = payload => {
  return {
    type: RECEIVE_USERS,
    payload
  };
};

export const fetchUsers = () => dispatch => {
  return UserApiUtil.fetchUsers()
    .then(res => dispatch(receiveUsers(res)));
};


