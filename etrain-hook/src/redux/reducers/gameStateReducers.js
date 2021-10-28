import {
  RESET_GAME_STATE,
  START_TYPING_COUNTDOWN,
} from "../constants.js";

export const gameStateReducers = (state = {}, action) => {
  switch (action.type) {
    case START_TYPING_COUNTDOWN:
      return {
        ...state,
        typingCountdown: state.typingCountdown + 1,
      };

    case RESET_GAME_STATE:
      return {
        showKeyboard: false,
        gameStart: !state.gameStart,
        gameWon: false,
        opponentDifficultyLevel: 3,
        gameType: "",
        totalWordsTyped: 0,
        fluentWordsTyped: 0,
        weakKeyStrokes: [],
        typingCountdown: 0,
        charactersTyped: 0,
      };
    default:
      return state;
  }
};
