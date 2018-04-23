import React from "react";
import { PropTypes } from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import RegisterPage from "./components/RegisterPage";
import ResetPasswordPage from "./components/ResetPasswordPage";

// we need to pass location to the routes because of react-redux's connect blockers involved
// when connect is used together with react-router
const App = ({ location }) => (
  <div className="ui container">
    <Switch>
      <Route location={location} path="/" exact component={HomePage} />
      <Route
        location={location}
        path="/admin"
        exact
        render={() => <Redirect to="/admin/dashboard" />}
      />
      <GuestRoute
        location={location}
        path="/admin/Login"
        exact
        component={LoginPage}
      />
      <GuestRoute
        location={location}
        path="/admin/register"
        exact
        component={RegisterPage}
      />
      <GuestRoute
        location={location}
        path="/admin/reset-password"
        exact
        component={ResetPasswordPage}
      />
      <UserRoute
        location={location}
        path="/admin/dashboard"
        exact
        component={DashboardPage}
      />
      <Route location={location} path="*" exact component={HomePage} />
    </Switch>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
