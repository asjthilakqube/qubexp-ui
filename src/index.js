import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import configureStore, { history } from "./store";
import Root from "./components/Root";
import "./styles/index.scss";
import "react-day-picker/lib/style.css";

const store = configureStore();

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Root />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
};
renderApp();