export const LOGIN = 'LOGIN';
export const RESET_TIME = 'RESET_TIME';
export const SCORE = 'SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const CONFIG_GAME = 'CONFIG_GAME';

export const userAction = (name, email) => ({
  type: LOGIN,
  payload: { name, email },
});

export const resetTime = (itToReset) => ({
  type: RESET_TIME,
  payload: itToReset,
});

export const addToScoreAction = (payload) => ({
  type: SCORE,
  payload,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const configGame = (configs) => ({
  type: CONFIG_GAME,
  payload: configs,
});
