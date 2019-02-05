import * as ChannelApiUtil from '../util/channel_api_util';
import { RECEIVE_SERVER, receiveServer } from './server_actions';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const receiveChannels = payload => {
  return {
    type: RECEIVE_CHANNELS,
    payload
  };
};

export const receiveChannel = payload => {
  return {
    type: RECEIVE_CHANNEL,
    payload
  };
};

export const removeChannel = payload => {
  return {
    type: REMOVE_CHANNEL,
    payload
  };
};

export const fetchChannels = (serverId) => dispatch => {
  return ChannelApiUtil.fetchChannels(serverId)
    .then(response => dispatch(receiveChannels(response)));
};

export const fetchChannel = channelId => dispatch => {
  return ChannelApiUtil.fetchChannel(channelId)
    .then(response => dispatch(receiveChannel(response)));
};

export const createChannel = channelData => dispatch => {
  return ChannelApiUtil.createChannel(channelData)
    .then(response => dispatch(receiveChannel(response)));
};

export const deleteChannel = channel => dispatch => {
  return ChannelApiUtil.deleteChannel(channel._id)
    .then(response => dispatch(removeChannel(response)))
};