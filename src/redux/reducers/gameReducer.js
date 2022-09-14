import { CONFIG_GAME, RESET_TIME } from '../actions';

const INITIAL_STATE = {
  resetTime: false,
  category: '',
  difficult: '',
  type: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_TIME:
    return {
      ...state,
      resetTime: action.payload,
    };
  case CONFIG_GAME:
    return {
      ...state,
      category: action.payload.category,
      difficult: action.payload.difficult,
      type: action.payload.type,
    };
  default: return state;
  }
};

export default gameReducer;
