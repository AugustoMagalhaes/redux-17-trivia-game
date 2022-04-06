import { LOGIN_ACTION } from '../reducers/loginReducer';
import { TOKEN_ACTION } from '../reducers/tokenReducer';
// import { GET_ERRO }

export const loginAction = (value) => ({ type: LOGIN_ACTION, data: value });
export const tokenAction = (value) => ({ type: TOKEN_ACTION, data: value });
