import axios from 'axios';

export const fetchMessages = modelId => {
  return axios.get(`/api/messages/${modelId}`)
};

export const createMessage = messageData => {
  return axios.post('/api/messages', messageData)
};