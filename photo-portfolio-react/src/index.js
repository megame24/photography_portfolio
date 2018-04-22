import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import decode from "jwt-decode";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./reducers/rootReducer";
import { loggedIn } from "./actions/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.photoPortfolioJWT) {
  const payload = decode(localStorage.photoPortfolioJWT);
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime < payload.exp) {
    const user = {
      username: payload.username,
      verified: payload.verified,
      token: localStorage.getItem("photoPortfolioJWT")
    };

    store.dispatch(loggedIn(user));
  }
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
