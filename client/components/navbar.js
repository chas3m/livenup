import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import routeActions, { Link } from 'react-router-redux';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth_actions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { bindActionCreators } from 'redux';

class NavBar extends Component {
  showLogInOut () {
    if(!this.props.token){
      return(
        <div>

        </div>
      )
    }
    else {
      return (
        <div>
          <FlatButton
            containerElement={<Link to='/myspaces' />}
            label = "My Spaces"
          />
          <FlatButton
            onTouchTap = { ()=>{ this.props.logoutUser()} }
            label = "Log Out"
          />
        </div>
      )
    }
  }

  constructor (props) {
    super(props);
    console.log('+++| 89 | props in NavBar: ', props);
  }

  render() {
    const logInOut = this.showLogInOut()
    return (
      <AppBar
        class = 'nav-bar'
        showMenuIconButton = { false }
        title = { <span> LivenUp </span> }
        containerElement = { <Link to='/' /> }
        iconElementRight = { logInOut }
      />
    )
  }
}

injectTapEventPlugin();

function mapDispatchToProps(dispatch){
  return bindActionCreators({ logoutUser, Link }, dispatch)
}

export default connect(null, mapDispatchToProps)(NavBar);
