import axios from "axios";

export const createChannel = data => {
  return axios.post('api/channels', data);
};

export const fetchChannel = channelId => {
  return axios.get(`api/channels/${channelId}`);
};

<<<<<<< HEAD
export const fetchChannels = serverId => {
  return axios.get(`api/channels/${serverId}`);
=======
export const fetchChannels = (serverId)=> { 
  return axios.get(`api/channels/server/${serverId}`);
>>>>>>> dab89334b01082dc4c8b0fcc67b8119d5973c69c
};

export const deleteChannel = channelId => {
  return axios.delete(`api/channels/${channelId}`);
};