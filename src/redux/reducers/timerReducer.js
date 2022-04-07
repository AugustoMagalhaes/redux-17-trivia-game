const INITIAL_STATE = {
  timerActive: true,
  countdown: 30,
  show: false,
  timerID: 0,
};

export const TIMER_ACTION = 'TIMER_ACTION';
export const COUNT_ACTION = 'COUNT_ACTION';

const timer = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
  case TIMER_ACTION:
    return {
      ...state,
      ...data,
    };
  case COUNT_ACTION:
    return {
      ...state,
      countdown: data,
    };
  default: return state;
  }
};

export default timer;
