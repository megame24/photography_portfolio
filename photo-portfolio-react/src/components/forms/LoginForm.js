import React from "react";
import { PropTypes } from "prop-types";
import { Link } from 'react-router-dom';
import { Form, Button, Message } from "semantic-ui-react";
import ErrorText from "../ErrorText";

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
      this.setState({loading: true});
      this.props
        .submit(this.state.data)
        .catch(error => this.setState({ errors: error.response.data.errors, loading: false }));
    }
  };

  validate = ({ username, password }) => {
    const errors = {};
    // if I were dealing with E-mail, I'll need to use a lib called "validator"(ref Rem's first vid)
    if (!username) errors.username = "username is required";
    if (!password) errors.password = "password is required";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    // '!!' converts string/undefined to bool
    return (
      <div>
        {errors.global && (
          <Message negative>
            <Message.Header>Access Denied</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}

        <Form onSubmit={this.onSubmit} loading={loading}>
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
            <label htmlFor="password">Password</label>
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
        <br />
        <Link to="/admin/register"><Button className="ui green button">New Admin</Button></Link>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
