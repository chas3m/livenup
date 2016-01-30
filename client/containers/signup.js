import React, { Component } from 'react';
import { PageHeader, Input, ButtonInput } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth_actions';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {name: '', email: '', password: ''};

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onFormSubmit(event) {
    console.log(event);
    event.preventDefault();
    this.props.signupUser(this.state.name, this.state.email, this.state.password);
    this.setState({ name: '', email: '', password: '' });
  }

  render() {

    return (
      <div>
        <PageHeader>Sign Up</PageHeader>
        <form onSubmit={this.onFormSubmit}>
          <Input
            type='text'
            label='Name'
            placeholder='Enter your name'
            value={this.state.name}
            onChange={this.onNameChange} />
          <Input
            type='email'
            label='Email Address'
            placeholder='Enter your email address'
            value={this.state.email}
            onChange={this.onEmailChange} />
          <Input
            type='password'
            label='Password'
            placeholder='Enter your password'
            value={this.state.password}
            onChange={this.onPasswordChange} />
          <ButtonInput type='submit' bsStyle='primary' value="Submit" />
        </form>
      </div>
    );
  }
}

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signupUser }, dispatch);
  }

  export default connect(null, mapDispatchToProps)(SignupForm);
