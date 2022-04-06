const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },

  ranking: [
    { name: '', score: 0, picture: '' },
  ],
};

export const LOGIN_ACTION = 'LOGIN_ACTION';

const player = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
  case LOGIN_ACTION:
    return { ...state, ...data };
  default: return state;
  }
};

export default player;
