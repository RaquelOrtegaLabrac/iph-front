import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./features/components/app";
import "./features/sass/index.scss";
ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App></App>
      </Provider>
    </Router>
  </React.StrictMode>
);
