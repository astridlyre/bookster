import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Theme from "./theme.js";
import App from "./App";
import store from "./store.js";

ReactDOM.render(
  <Router>
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  </Router>,
  document.getElementById("root")
);
