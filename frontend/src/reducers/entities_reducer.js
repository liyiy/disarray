import { combineReducers } from 'redux';
import servers from './servers_reducer';
import channels from './channels_reducer';

const entitiesReducer = combineReducers({
  servers,
  channels
});

export default entitiesReducer;