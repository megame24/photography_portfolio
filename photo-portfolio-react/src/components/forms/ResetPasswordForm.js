import React from "react";
import { PropTypes } from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import ErrorText from "../ErrorText";

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      username: "",
      answer: "",
      newPassword: "",
      verified: false
    },
    loading: false,
    newPassword1: "",
    errors: {}
  };

  onChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  onNewPassword1Change = event => {
    this.setState({ newPassword1: event.target.value });
  };

  callback = () => {
    this.setState({
      data: {
        ...this.state.data,
        username: this.props.username,
        verified: this.props.verified
      },
      loading: false,
      errors: {}
    });
  };

  verify = () => {
    const errors = this.validateUsername(this.state.data);
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .verify(this.state.data)
        .then(() => this.callback())
        .catch(error =>
          this.setState({ errors: error.response.data.errors, loading: false })
        );
    } else {
      this.setState({ errors });
    }
  };

  submit = () => {
    const errors = this.validate(this.state.data, this.state.newPassword1);
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(error =>
          this.setState({ errors: error.response.data.errors, loading: false })
        );
    } else {
      this.setState({ errors });
    }
  };

  validateUsername = ({ username }) => {
    const errors = {};
    if (!username) errors.username = "username is required";
    return errors;
  };

  validate = (data, newPassword1) => {
    const errors = {};
    if (!data.answer) errors.answer = "answer is required";
    if (!data.newPassword) errors.newPassword = "new password is required";
    if (!newPassword1 || data.newPassword !== newPassword1)
      errors.newPassword1 = "passwords must match";
    return errors;
  };

  render() {
    const { data, loading, errors, newPassword1 } = this.state;
    return !data.verified ? (
      <div>
        {errors.global && (
          <Message negative>
            <Message.Header>Access Denied</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form onSubmit={this.verify} loading={loading}>
          <Form.Field error={!!errors.username}>
            <label htmlFor="username">Username</label>
            <input
              value={data.username}
              type="text"
              id="username"
              name="username"
              placeholder="enter username"
              onChange={this.onChange}
            />
            {errors.username && <ErrorText error={errors.username} />}
          </Form.Field>
          <Button primary>Reset Password</Button>
        </Form>
      </div>
    ) : (
      <div>
        {errors.global && (
          <Message negative>
            <Message.Header>Access Denied</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form onSubmit={this.submit} loading={loading}>
          <Form.Field error={!!errors.answer}>
            <h5>{this.props.question}?</h5>
            <input
              value={data.answer}
              type="text"
              id="answer"
              name="answer"
              placeholder="enter answer to the question above"
              onChange={this.onChange}
            />
            {errors.answer && <ErrorText error={errors.answer} />}
          </Form.Field>
          <Form.Field error={!!errors.newPassword}>
            <label htmlFor="newPassword">New Password</label>
            <input
              value={data.newPassword}
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="enter new password"
              onChange={this.onChange}
            />
            {errors.newPassword && <ErrorText error={errors.newPassword} />}
          </Form.Field>
          <Form.Field error={!!errors.newPassword1}>
            <label htmlFor="newPassword1">Repeat Password</label>
            <input
              value={newPassword1}
              type="password"
              id="newPassword1"
              name="newPassword1"
              placeholder="repeat password"
              onChange={this.onNewPassword1Change}
            />
            {errors.newPassword1 && <ErrorText error={errors.newPassword1} />}
          </Form.Field>
          <Button primary>Reset Password</Button>
        </Form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  username: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  verify: PropTypes.func.isRequired,
  verified: PropTypes.bool.isRequired
};

function mapStateToProps({ resetPassword }) {
  return {
    username: resetPassword.username,
    question: resetPassword.question,
    verified: resetPassword.verified
  };
}

export default connect(mapStateToProps)(ResetPasswordForm);
