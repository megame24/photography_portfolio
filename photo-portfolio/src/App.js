import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

const App = () => 
  <div className="ui container">
    <Route path="/" exact component={HomePage} />
    <Route path="/Login" component={LoginPage} />
  </div>;
export default App;
