import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import routeActions, { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LogInOut from './logInOut';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  root: {
    backgroundColor: Colors.green900
  }
};

class NavBar extends Component {
  constructor (props) {
    super(props);
    this.navBarColor = this.navBarColor.bind(this);
  }

  navBarColor() {
    console.log('this.props.atHome in navBarColor is ', this.props.atHome);
    if (this.props.atHome) {
      console.log('styles.root.backgroundColor in if is ', styles.root.backgroundColor);
      styles.root.backgroundColor = 'rgba(0, 0, 0, 0)';
    } else {
      console.log('styles.root.backgroundColor in else is ', styles.root.backgroundColor);
      styles.root.backgroundColor = Colors.green900;
    }
  }

  render() {

    this.navBarColor();

    console.log('styles.root.backgroundColor is ', styles.root.backgroundColor);
    console.log('atHome in NavBar is ', this.props.atHome);
    console.log('navBarColor is ', this.navBarColor());

    return (
      <AppBar
        className = 'nav-bar'
        style = {styles.root}
        showMenuIconButton = { false }
        title ={<span style={{cursor: 'pointer'}}>LivenUp</span>}
        onTitleTouchTap = { () => this.props.push('/') }
        iconElementRight = { <LogInOut /> }
      />
    );
  }
}

injectTapEventPlugin();

function mapDispatchToProps(dispatch){
  return bindActionCreators({ push }, dispatch);
}

export default connect(null, mapDispatchToProps)(NavBar);
