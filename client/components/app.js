import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar';
import SpaceCreator  from "../containers/spaceCreator";
import Footer from './footer';

export default class App extends Component {

//{this.props.children} will render component based on the route in client/routes.js

  render() {
    return (
      <div>
        <NavBar atHome={this.props.location.pathname === '/'} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
