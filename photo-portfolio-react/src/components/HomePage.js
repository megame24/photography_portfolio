import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/auth';

/* your logout logic shouldn't go here, take it to an action. because logout will return an empty user state */
const HomePage = ({isAuthenticated, logout}) => 
  <div>
    <h1>Welcome</h1>
    {isAuthenticated ? <button onClick={logout}>Logout</button>: <Link to="/admin/login">Login</Link>}
  </div>;


HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps({ user }) {
  return {
    isAuthenticated: !!user.token
  };
}
export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
