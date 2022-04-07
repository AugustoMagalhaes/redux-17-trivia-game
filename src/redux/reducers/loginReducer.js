const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    hashGravatar: '',
  },

  ranking: [
    { name: '', score: 0, picture: '' },
  ],
};

export const LOGIN_ACTION = 'LOGIN_ACTION';

const user = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
  case LOGIN_ACTION:
    return {
      ...state,
      player: {
        ...state.player,
        gravatarEmail: data.gravatarEmail,
        name: data.name,
        hashGravatar: data.hashGravatar,
      } };
  default: return state;
  }
};

export default user;
