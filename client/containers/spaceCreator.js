import React, { Component } from "react";
import routeActions, { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSpace } from '../actions/creator_actions';

import Space from './space';

export default class SpaceCreator extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(spaceToCreate) {
    this.props.createSpace(spaceToCreate);
    this.props.push('/mygreenspace');
  }

  render() {
    return (
      <div>
        <div className='sixteen column row'>
          <div className='two wide column'></div>
          <h2 className='twelve wide column, space-heading'>
            ...bring it to life.
          </h2>
          <div className='two wide column'></div>
        </div>
        <div className='ui relaxed grid'>
          <div className='two wide column'></div>
          <div className='twelve wide column'>
            <Space create={this.handleCreate} selectedInspiration={this.props.selectedInspiration}/>
          </div>
          <div className='two wide column'></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ selectedInspiration } ) {
  return {
    selectedInspiration: selectedInspiration || null
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push, createSpace }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaceCreator)
