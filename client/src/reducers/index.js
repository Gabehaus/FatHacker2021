import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fatLogReducer from "./fatLogReducer";
import registerReducer from "./registerReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  fatLog: fatLogReducer,
  register: registerReducer
});
