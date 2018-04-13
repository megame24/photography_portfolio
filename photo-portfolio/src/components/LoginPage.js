import React from "react";
import { connect } from 'react-redux';
import LoginForm from "../components/LoginForm";

class LoginPage extends React.Component {

  submit = (data) => {
    console.log(data);
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
      <LoginForm submit={this.submit}/>
      </div>
    );
  }
}

export default LoginPage;
// export default connect(null, { login })(LoginPage);
