import {
  CURRENT_PLAYER_POINT_INCREASE,
  GENERATE_NEW_WORD_ON_SUCCESS,
} from "../constants.js";

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

export const generateNewWordOnSuccess = (index) => (dispatch, getState) => {
  const { currentPlayerInfo } = getState();
  dispatch({
    type: GENERATE_NEW_WORD_ON_SUCCESS,
    payload: {
      wordIndex: index,
      randomlyGeneratedWord: currentPlayerInfo.wordArray[index],
    },
  });
};
