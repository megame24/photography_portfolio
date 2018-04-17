import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import ResetPasswordForm from "./forms/ResetPasswordForm";
import { resetPassword, verifyPassword } from "../actions/auth";

class ResetPasswordPage extends React.Component {
  verify = data => this.props.verifyPassword(data);

  // not enclosing your callback in an anonymous function can really hurt you :(
  submit = data =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/admin/login"));

  render() {
    return (
      <div>
        <h1>Reset Password</h1>
        <ResetPasswordForm verify={this.verify} submit={this.submit} />
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect(null, { resetPassword, verifyPassword })(
  ResetPasswordPage
);
