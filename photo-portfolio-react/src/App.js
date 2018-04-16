import React from "react";
import { PropTypes } from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import DashboardPage from './components/DashboardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import RegisterPage from "./components/RegisterPage";

// we need to pass location to the routes because of react-redux's connect blockers involved
// when connect is used together with react-router
const App = ({ location }) => 
  <div className="ui container">
    <Route location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/admin" exact render={() => <Redirect to="/admin/dashboard" />} />
    <GuestRoute location={location} path="/admin/Login" exact component={LoginPage} />
    <GuestRoute location={location} path="/admin/register" exact component={RegisterPage} />
    <UserRoute location={location} path="/admin/dashboard" exact component={DashboardPage} />
  </div>;

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
