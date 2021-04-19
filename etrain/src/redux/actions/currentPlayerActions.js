import {
  CURRENT_PLAYER_POINT_INCREASE,
  GENERATE_NEW_WORD_ON_SUCCESS,
  CURRENT_PLAYER_CHARACTER_SELECT,
  SET_CURRENT_PLAYER_NAME,
} from "../constants.js";

export const selectCurrentPlayerCharacter = (character) => (dispatch) => {
  dispatch({
    type: CURRENT_PLAYER_CHARACTER_SELECT,
    payload: {
      currentPlayerCharacter: character,
    },
  });
};

export const addAPointToCurrentPlayer = (incrementPoints) => (
  dispatch,
  getState
) => {
  const { currentPlayerInfo } = getState();
  dispatch({
    type: CURRENT_PLAYER_POINT_INCREASE,
    payload: {
      currentPlayerPosition:
        currentPlayerInfo.currentPlayerPosition + incrementPoints,
    },
  });
};

export const generateNewWordOnSuccess = (newWord) => (dispatch) => {    
  dispatch({
    type: GENERATE_NEW_WORD_ON_SUCCESS,
    payload: newWord,
  });
};

export const setCurrentPlayerName = (name) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PLAYER_NAME,
    payload: name,
  });
};