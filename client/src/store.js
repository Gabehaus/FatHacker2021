import rootReducer from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import tokenCheck from "./ReduxCustMiddleware/tokenCheck";

import { history } from "./history";

const middleware = [thunk, routerMiddleware(history)];
const enhancer = compose(applyMiddleware(...middleware));

const store = createStore(connectRouter(history)(rootReducer), enhancer);

export default store;
