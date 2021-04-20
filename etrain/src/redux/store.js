import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  currentPlayerInfo: {
    currentPlayerCharacter: "tortoise",
    currentPlayerPosition: 0,
    wordArray: [],
    wordIndex: 0,
    randomlyGeneratedWord: "start",
    currentPlayerName: "",
  },
  opponentPlayerInfo: {
    opponentPlayerCharacter: "hare",
    opponentPlayerPosition: 0,
    opponentPlayerName: "Opponent",
  },
  gameState: {
    showKeyboard: false,
    gameStart: false,
    gameWon: false,
    opponentDifficultyLevel: 3,
    gameType: "",
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
