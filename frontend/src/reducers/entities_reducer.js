import { combineReducers } from 'redux';
import servers from './servers_reducer';
import channels from './channels_reducer';
import messages from './messages_reducer';
import users from './users_reducer';

const entitiesReducer = combineReducers({
  servers,
  channels,
  messages,
  users
});

export default entitiesReducer;