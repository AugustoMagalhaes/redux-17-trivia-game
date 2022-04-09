const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  hashGravatar: '',
};

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const SCORE_ACTION = 'SCORE_ACTION';

const player = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
  case LOGIN_ACTION:
    return {
      ...state,
      gravatarEmail: data.gravatarEmail,
      name: data.name,
      hashGravatar: data.hashGravatar,
    };
  case SCORE_ACTION:
    return {
      ...state,
      score: data.score,
      assertions: data.assertions,
    };
  default:
    return state;
  }
};

export default player;
