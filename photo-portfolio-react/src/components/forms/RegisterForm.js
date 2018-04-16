import React from "react";
import { PropTypes } from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import ErrorText from "../ErrorText";

class RegisterForm extends React.Component {
  state = {
    data: {
      username: "",
      password: "",
      question: "",
      answer: "",
      secret: ""
    },
    loading: false,
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

  onSubmit = event => {
    event.preventDefault();
    const errors = this.validate(this.state.data);
    if (Object.keys(errors).length === 0) {
      this.setState({loading: true});
      this.props
        .submit(this.state.data)
        .catch(error => this.setState({ errors: error.response.data.errors, loading: false }));
    } else {
      this.setState({ errors });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.username) errors.username = "username is required";
    if (!data.password) errors.password = "password is required";
    if (!data.question) errors.question = "question is required";
    if (!data.answer) errors.answer = "answer is required";
    if (!data.secret) errors.secret = "secret is required";
    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;

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

          <Form.Field error={!!errors.question}>
            <label htmlFor="question">A question only you can answer</label>
            <input
              value={data.question}
              type="text"
              name="question"
              placeholder="enter a question only you can answer"
              onChange={this.onChange}
            />
            {errors.question && <ErrorText error={errors.question} />}
          </Form.Field>

          <Form.Field error={!!errors.answer}>
            <label htmlFor="answer">Answer to the question</label>
            <input
              value={data.answer}
              type="text"
              name="answer"
              placeholder="enter answer to the question above"
              onChange={this.onChange}
            />
            {errors.answer && <ErrorText error={errors.answer} />}
          </Form.Field>

          <Form.Field error={!!errors.secret}>
            <label htmlFor="secret">Admin secret</label>
            <input
              value={data.secret}
              type="password"
              name="secret"
              placeholder="enter admin secret"
              onChange={this.onChange}
            />
            {errors.secret && <ErrorText error={errors.secret} />}
          </Form.Field>
          <Button primary>Sign Up</Button>
        </Form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default RegisterForm;
