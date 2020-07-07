import React, { Component } from "react";
import Components from "./components/Components";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cyborg/bootstrap.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div
          className="App container-fluid"
          style={{ padding: "0px", margin: "0px", width: "100%" }}
        >
          <Components />
        </div>
      </Provider>
    );
  }
}

export default App;
