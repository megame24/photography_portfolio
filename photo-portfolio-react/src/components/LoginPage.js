import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import { login } from "../actions/auth";

class LoginPage extends React.Component {
  // don't forget to wrap your '.then' function call with an anonymous func
  submit = data => this.props.login(data).then(() => this.props.history.push("/"));

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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
