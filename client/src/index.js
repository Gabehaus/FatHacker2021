import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { history } from "./history";

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        {" "}
        {/* formerly <React.StrictMode>, changed to deal with random error in console  */}
        <App />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
