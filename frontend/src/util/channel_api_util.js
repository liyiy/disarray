import axios from "axios";

export const createChannel = data => {
  return axios.post('api/channels', data);
};

export const fetchChannel = channelId => {
  return axios.get(`api/channels/${channelId}`);
};

export const fetchChannels = (serverId)=> { 
  return axios.get(`api/channels/server/${serverId}`);
};

export const deleteChannel = data => {
  return axios.delete(`api/channels/${data._id}`, { data: data });
};