import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import store from "./redux/store";
import App from "./App";
// CSS
import "react-confirm-alert/src/react-confirm-alert.css";
// SCSS
import "./assets/scss/main.scss";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
