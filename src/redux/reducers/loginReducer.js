const INITIAL_STATE = {
  email: '',
  password: '',
  token: '',
};

export const GET_EMAIL = 'GET_EMAIL';
export const GET_PASSWORD = 'GET_PASSWORD';

const loginReducer = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
  case GET_EMAIL:
  case GET_PASSWORD:

    return { ...state, ...data };
  default: return state;
  }
};

export default loginReducer;
