import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth_actions';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {email: '', password: '', open: false};

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  //calls action creator in actions/auth_actions.js
  onFormSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
    this.setState({ email: '', password: '' });
    this.handleClose();
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap= {this.handleClose} />,
      <FlatButton
        type="submit"
        label="Submit"
        primary={true}
        onTouchTap={this.onFormSubmit} />
    ];

    return (
      <div>
      <FlatButton className='nav-button' label="Log In" onTouchTap={this.handleOpen} />
        <Dialog
          title="Log In"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
            <form onSubmit={this.onFormSubmit}>
              <TextField
                type='email'
                hintText='Enter your email address'
                floatingLabelText='Email Address'
                value={this.state.email}
                onChange={this.onEmailChange} />
              <br/>
              <br/>
              <TextField
                type='password'
                hintText='Enter your password'
                floatingLabelText='Password'
                value={this.state.password}
                onChange={this.onPasswordChange} />
              <br/>
            </form>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginForm);
