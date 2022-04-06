const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
    picture: '',
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
        picture: data.picture,
      } };
  default: return state;
  }
};

export default user;
