import { combineReducers } from 'redux';
import player from './loginReducer';
import token from './tokenReducer';
import timer from './timerReducer';

const rootReducer = combineReducers({ player, token, timer });

export default rootReducer;
