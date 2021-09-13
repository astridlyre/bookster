import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./theme.js";
import App from "./App";

ReactDOM.render(
  <Router>
    <Theme>
      <App />
    </Theme>
  </Router>,
  document.getElementById("root")
);
