import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

// import of reducers from files
import { currentPlayerInfoReducer } from "../reducers/currentPlayerReducers";
import { opponentPlayerInfoReducer } from "../reducers/opponentPlayerReducers";
import { gameStateReducers } from "../reducers/gameStateReducers";

export default combineReducers({
  cart: cartReducer,
  currentPlayerInfo: currentPlayerInfoReducer, //file currentPlayerInfoReducer state{} = state.currentPlayerInfo
  opponentPlayerInfo: opponentPlayerInfoReducer,
  gameState: gameStateReducers,
});
