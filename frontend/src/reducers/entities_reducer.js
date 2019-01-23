import { combineReducers } from 'redux';
import servers from './servers_reducer';

const entitiesReducer = combineReducers({
  servers
})

export default entitiesReducer;