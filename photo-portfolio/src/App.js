import React from "react";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/Login" component={LoginPage} />
    </div>
  );
};

export default App;
