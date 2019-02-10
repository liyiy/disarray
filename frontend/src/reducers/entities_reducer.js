import { combineReducers } from 'redux';
import servers from './servers_reducer';
import channels from './channels_reducer';
import messages from './messages_reducer';
import users from './users_reducer';
import friends from './friends_reducer';

const entitiesReducer = combineReducers({
  servers,
  channels,
  messages,
  users,
  friends
});

export default entitiesReducer;