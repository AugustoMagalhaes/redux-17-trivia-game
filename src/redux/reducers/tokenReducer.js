export const TOKEN_ACTION = 'TOKEN_ACTION';

const token = (state = '', { type, data }) => {
  switch (type) {
  case TOKEN_ACTION:
    return data.token;
  default: return state;
  }
};

export default token;
