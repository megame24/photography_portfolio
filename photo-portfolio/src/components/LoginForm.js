import React from "react";
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
      data: { ...this.state.data, [event.target.name]: [event.target.value] }
    });
  };

  onSubmit = event => {
      event.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors: errors });
  };

  validate = ({username, password}) => {
    const errors = {};
    //if I were dealing with E-mail, I'll need to use a lib called "validator"(ref Rem's first vid)
    if (!username) errors.username = "username can not be blank";
    if (!password) errors.password = "password can not be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <label>Username</label>
        <input
          value={data.username}
          type="text"
          name="username"
          placeholder="enter username"
          onChange={this.onChange}
        />
        {errors.username && <ErrorText error={errors.username} />}

        <label>Password</label>
        <input
          value={data.password}
          type="password"
          name="password"
          placeholder="enter password"
          onChange={this.onChange}
        />
        {errors.password && <ErrorText error={errors.password} />}

        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
