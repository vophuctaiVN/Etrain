import {
  CURRENT_PLAYER_POINT_INCREASE,
  GENERATE_NEW_WORD_ON_SUCCESS,
  CURRENT_PLAYER_CHARACTER_SELECT,
  RESET_CURRENT_PLAYER_INFO,
  SET_CURRENT_PLAYER_NAME,
  SET_WORDS_ARRAY,
} from "../constants.js";

export const currentPlayerInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PLAYER_CHARACTER_SELECT:
      return {
        ...state,
        currentPlayerCharacter: action.payload.currentPlayerCharacter,
      };

    case CURRENT_PLAYER_POINT_INCREASE:
      return {
        ...state,
        currentPlayerPosition: action.payload.currentPlayerPosition,
      };

    case GENERATE_NEW_WORD_ON_SUCCESS:
      return {
        ...state,
        wordIndex: action.payload.wordIndex,
        randomlyGeneratedWord: action.payload.randomlyGeneratedWord,
      };

    case SET_CURRENT_PLAYER_NAME:
      return {
        ...state,
        currentPlayerName: action.payload,
      };

    case RESET_CURRENT_PLAYER_INFO:
      return {
        ...state,
        currentPlayerName: "",
        currentPlayerCharacter: "tortoise",
        currentPlayerPosition: 0,
      };

    case SET_WORDS_ARRAY:
      return {
        ...state,
        wordArray: action.wordArray,
      };
    default:
      return state;
  }
};
