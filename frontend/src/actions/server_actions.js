import * as ServerApiUtil from '../util/server_api_util';

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";

export const receiveServers = payload => {
  return {
    type: RECEIVE_SERVERS,
    payload
  };
};

export const receiveServer = payload => {
  return {
    type: RECEIVE_SERVER,
    payload
  };
};

export const removeServer = payload => {
  return {
    type: REMOVE_POST,
    payload
  };
};

export const fetchServers = () => dispatch => {
  return ServerApiUtil.fetchUserServers()
    .then(response => dispatch(receiveServers(response)));
};

export const fetchServer = serverId => dispatch => {
  return ServerApiUtil.fetchServer(serverId)
    .then(response => dispatch(receiveServer(response)));
};

export const createServer = serverData => dispatch => {
  return ServerApiUtil.createServer(serverData)
    .then(response => dispatch(receiveServer(response)));
};

export const deleteServer = serverId => dispatch => {
  return ServerApiUtil.deleteServer(serverId)
    .then(response => dispatch(removeServer));
};