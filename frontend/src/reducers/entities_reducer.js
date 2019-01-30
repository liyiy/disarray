import { combineReducers } from 'redux';
import servers from './servers_reducer';
import channels from './channels_reducer';
import messages from './messages_reducer';

const entitiesReducer = combineReducers({
  servers,
  channels,
  messages
});

export default entitiesReducer;