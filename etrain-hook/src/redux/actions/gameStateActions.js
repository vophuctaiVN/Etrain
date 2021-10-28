import {
  OPPONENT_PLAYER_POINT_INCREASE,
  RESET_CURRENT_PLAYER_INFO,
  RESET_OPPONENT_PLAYER_INFO,
  RESET_GAME_STATE,
  START_TYPING_COUNTDOWN,
  INCREMENT_CHARACTER_TYPED,
  SET_WORDS_ARRAY,
} from "../constants.js";

var opponentPointIncrease;
var currentPlayerTypingCountdown;

export const startOpponentRun = () => (dispatch, getState) => {
  const { gameState } = getState();
  const { opponentDifficultyLevel } = gameState;

  opponentPointIncrease = setInterval(() => {
    dispatch({
      type: OPPONENT_PLAYER_POINT_INCREASE,
      payload: opponentDifficultyLevel,
    });
  }, 1000);
};

export const endOpponentRun = () => () => {
  clearInterval(opponentPointIncrease);
};

export const resetFullGame = () => (dispatch) => {
  dispatch({
    type: RESET_CURRENT_PLAYER_INFO,
  });

  dispatch({
    type: RESET_OPPONENT_PLAYER_INFO,
  });

  dispatch({
    type: RESET_GAME_STATE,
  });
};

export const startTypingCountdown = () => (dispatch) => {
  currentPlayerTypingCountdown = setInterval(() => {
    dispatch({
      type: START_TYPING_COUNTDOWN,
    });
  }, 1000);
};

export const endTypingCountdown = () => () => {
  clearInterval(currentPlayerTypingCountdown);
};

export const incrementCharactersTyped = () => (dispatch) => {
  dispatch({
    type: INCREMENT_CHARACTER_TYPED,
  });
};

export const setFirstwordArray = (words) => (dispatch) => {
  dispatch({
    type: SET_WORDS_ARRAY,
    wordArray: words,
  });
}; // can set action here but reducer different
