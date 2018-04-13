import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
