import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fatLogReducer from "./fatLogReducer";
import registerReducer from "./registerReducer";
import loadingReducer from "./loadingReducer";
import healthDataReducer from "./healthDataReducer";
import { connectRouter } from "connected-react-router";
import { history } from "../history";

const rootReducer = combineReducers({
  router: connectRouter(history),
  error: errorReducer,
  auth: authReducer,
  fatLog: fatLogReducer,
  register: registerReducer,
  loading: loadingReducer,
  healthData: healthDataReducer
});
export default rootReducer;
