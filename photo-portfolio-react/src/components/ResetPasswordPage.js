import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import ResetPasswordForm from "./forms/ResetPasswordForm";
import { resetPassword } from "../actions/auth";

class ResetPasswordPage extends React.Component {
  submit = data => this.props.resetPassword(data);

  render() {
    return (
      <div>
        <h1>Reset Password</h1>
        <ResetPasswordForm submit={this.submit} history={this.props.history} />
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

export default connect(null, { resetPassword })(ResetPasswordPage);
