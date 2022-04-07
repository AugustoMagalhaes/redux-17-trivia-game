const INITIAL_STATE = {
  timerActive: true,
  show: false,
  resetTimer: false,
  timerID: 0,
};

export const TIMER_ACTION = 'TIMER_ACTION';

const timer = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
  case TIMER_ACTION:
    return {
      ...state,
      ...data,
    };
  default: return state;
  }
};

export default timer;
