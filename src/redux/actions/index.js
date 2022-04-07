import { LOGIN_ACTION } from '../reducers/loginReducer';
import { TOKEN_ACTION } from '../reducers/tokenReducer';
import { TIMER_ACTION } from '../reducers/timerReducer';

export const loginAction = (value) => ({ type: LOGIN_ACTION, data: value });
export const tokenAction = (value) => ({ type: TOKEN_ACTION, data: value });
export const timerAction = (value) => ({ type: TIMER_ACTION, data: value });
