import { combineReducers } from 'redux';
import user from './loginReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({ user, token });

export default rootReducer;
