import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fatLogReducer from "./fatLogReducer";
import registerReducer from "./registerReducer";
import loadingReducer from "./loadingReducer";
import { connectRouter } from "connected-react-router";
import { history } from "../history";

const rootReducer = combineReducers({
  router: connectRouter(history),
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  fatLog: fatLogReducer,
  register: registerReducer,
  loading: loadingReducer
});
export default rootReducer;
