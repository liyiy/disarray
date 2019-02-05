import * as MessageApiUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessages = payload => {
  return {
    type: RECEIVE_MESSAGES,
    payload
  };
};

export const receiveMessage = payload => {
  return {
    type: RECEIVE_MESSAGE,
    payload
  };
};

export const fetchMessages = modelId => dispatch => {
  return MessageApiUtil.fetchMessages(modelId)
    .then(messages => receiveMessages(messages))
};

export const createMessage = messageData => dispatch => {
  return MessageApiUtil.createMessage(messageData)
    .then(message => receiveMessage(message))
};

