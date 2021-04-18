import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import randomWords from "random-words";

const initialState = {
  currentPlayerInfo: {
    currentPlayerCharacter: "tortoise",
    currentPlayerPosition: 0,
    randomlyGeneratedWord: /* randomWords() */ "army",
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
    totalWordsTyped: 0,
    fluentWordsTyped: 0,
    weakKeyStrokes: [],
    typingCountdown: 0,
    charactersTyped: 0,
    roomName: null,
    mySocketId: "",
    opponentSocketId: "",
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
