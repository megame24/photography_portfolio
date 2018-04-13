import React from "react";
import { PropTypes } from "prop-types";
import { Form, Button } from "semantic-ui-react";
import ErrorText from "./ErrorText";

class LoginForm extends React.Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = ({ username, password }) => {
    const errors = {};
    // if I were dealing with E-mail, I'll need to use a lib called "validator"(ref Rem's first vid)
    if (!username) errors.username = "username can not be blank";
    if (!password) errors.password = "password can not be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    // '!!' converts string/undefined to bool
    return (
      <Form onSubmit={this.onSubmit}>
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
        <Form.Field error={!!errors.password}>
          <label>Password</label>
          <input
            value={data.password}
            type="password"
            name="password"
            placeholder="enter password"
            onChange={this.onChange}
          />
          {errors.password && <ErrorText error={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
