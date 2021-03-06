import axios from "axios";

export const createServer = data => {
  return axios.post('api/servers', data);
};

export const fetchServer = serverId => {
  return axios.get(`api/servers/${serverId}`);
};

export const fetchUserServers = () => {
  return axios.get(`api/servers/`);
};

export const joinServer = data => {
  return axios.patch('api/servers/join', data);
};

export const deleteServer = serverId => {
  return axios.delete(`api/servers/${serverId}`);
};