import React from "react";
import { PropTypes } from "prop-types";
import RegisterForm from "./RegisterForm";
import { connect } from "react-redux";
import { register } from "../actions/auth";

class RegisterPage extends React.Component {
    // note, this submit function must return its content, if you wrap it with a code block ...
    // ... '{}' you must use the 'return' key word, else you can omit it.
  submit = data =>
    this.props
      .register(data)
      .then(() => this.props.history.push("/admin/login"));

  render() {
    return (
      <div>
        <h1>Admin Register</h1> <RegisterForm submit={this.submit} />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { register })(RegisterPage);
