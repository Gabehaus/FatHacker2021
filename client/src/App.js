import React, { Component } from "react";
import Components from "./components/Components";
import { Provider } from "react-redux";

import { loadUser } from "./actions/authActions";
import { getHealthData } from "./actions/healthDataActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cyborg/bootstrap.css";
import "./App.css";
import store from "./store";

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
