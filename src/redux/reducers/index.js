import { combineReducers } from 'redux';
import user from './loginReducer';
import token from './tokenReducer';
import timer from './timerReducer';

const rootReducer = combineReducers({ user, token, timer });

export default rootReducer;
