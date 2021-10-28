import {
  OPPONENT_PLAYER_CHARACTER_SELECT,
  OPPONENT_PLAYER_POINT_INCREASE,
  RESET_OPPONENT_PLAYER_INFO,
} from "../constants.js";

export const opponentPlayerInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case OPPONENT_PLAYER_CHARACTER_SELECT:
      return {
        ...state,
        opponentPlayerCharacter: action.payload.opponentPlayerCharacter,
      };

    case OPPONENT_PLAYER_POINT_INCREASE:
      return {
        ...state,
        opponentPlayerPosition:
          state.opponentPlayerPosition +
          Math.floor(Math.random() * action.payload),
      };

    case RESET_OPPONENT_PLAYER_INFO:
      return {
        opponentPlayerCharacter: "hare",
        opponentPlayerPosition: 0,
        opponentPlayerName: "Opponent",
      };

    default:
      return state;
  }
};