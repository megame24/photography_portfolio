import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import { login } from '../actions/auth';

class LoginPage extends React.Component {
  submit = data => {
    this.props.login(data);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
