import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
