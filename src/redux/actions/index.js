import { LOGIN_ACTION, SCORE_ACTION } from '../reducers/loginReducer';
import { TOKEN_ACTION } from '../reducers/tokenReducer';
import { TIMER_ACTION, COUNT_ACTION } from '../reducers/timerReducer';

export const loginAction = (value) => ({ type: LOGIN_ACTION, data: value });
export const scoreAction = (value) => ({ type: SCORE_ACTION, data: value });
export const countAction = (value) => ({ type: COUNT_ACTION, data: value });
export const tokenAction = (value) => ({ type: TOKEN_ACTION, data: value });
export const timerAction = (value) => ({ type: TIMER_ACTION, data: value });
