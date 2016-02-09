import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import routeActions, { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LogInOut from './logInOut';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  appBar: {}
};

class NavBar extends Component {
  constructor (props) {
    super(props);
    this.navBarColor = this.navBarColor.bind(this);
  }

  navBarColor() {
    console.log('this.props.atHome in navBarColor is ', this.props.atHome);
    if (this.props.atHome) {
      console.log('styles.appBar.backgroundColor in if is ', styles.appBar.backgroundColor);
      styles.appBar.backgroundColor = 'rgba(0, 0, 0, 0)';
      styles.appBar.border = 'none';
      styles.appBar.borderWidth = '0px';
    } else {
      console.log('styles.appBar.backgroundColor in else is ', styles.appBar.backgroundColor);
      styles.appBar.backgroundColor = Colors.green900;
      styles.appBar.border = 'solid black';
      styles.appBar.borderWidth = '0px 0px 2px 0px';
    }
  }

  render() {

    this.navBarColor();

    console.log('styles.appBar.backgroundColor is ', styles.appBar.backgroundColor);
    console.log('atHome in NavBar is ', this.props.atHome);
    console.log('navBarColor is ', this.navBarColor());

    return (
      <AppBar
        className = 'nav-bar'
        style = {styles.appBar}
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
