import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import DashboardPage from './components/DashboardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

// we need to pass location to the routes because of react-redux's connect blockers involved
// when connect is used together with react-router
const App = ({ location }) => 
  <div className="ui container">
    <Route location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/admin" exact render={props => <Redirect to="/admin/dashboard" />} />
    <GuestRoute location={location} path="/admin/Login" exact component={LoginPage} />
    <UserRoute location={location} path="/admin/dashboard" exact component={DashboardPage} />
  </div>;
export default App;
