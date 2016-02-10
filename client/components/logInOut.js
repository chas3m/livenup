import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import routeActions, { push } from 'react-router-redux';
import FlatButton from 'material-ui/lib/flat-button';
import LoginForm from '../containers/login';
import SignupForm from '../containers/signup';
import { logoutUser } from '../actions/auth_actions';

class LogInOut extends Component {
  render() {
    let element = <div></div>;

    //checks whether user is logged in and displays appropriate buttons (e.g., log in and sign up if not logged in)
    if(this.props.token === null) {
      element =
        <ul className="nav-right">
          <li className="nav-button"><LoginForm /></li>
          <li className="nav-button"><SignupForm /></li>
        </ul>
    }


  if(this.props.token) {
    element =
      <div>
        <FlatButton
          onTouchTap = { () => this.props.push('/mygreenspace') }
          label = "My Greenspace"
          className = "nav-button"
        />
        <FlatButton
          onTouchTap = { ()=> this.props.logoutUser() }
          label = "Log Out"
          className = "nav-button"
        />
      </div>
    }
  return element;
  }
}

function mapStateToProps(state) {
  return {
    token: state.isAuthorized.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInOut);
