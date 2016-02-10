import React , { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/lib/paper';
import Space from './space';

import { fetchUserSpaces } from '../actions/spaces_actions';


class MyGreenSpaces extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.fetchUserSpaces();
  }

  render() {
    let counter = 0;
    return (
      <div>
      <div className='sixteen column row'>
        <div className='two wide column'></div>
        <h2 className='twelve wide column, space-heading'>
          Water your plants once a week.
        </h2>
        <div className='two wide column'></div>
      </div>
      <div className='ui relaxed grid'>
        <div className='two wide column'></div>
        <div className='twelve wide column'>
          <Paper style={{boxShadow: 'none'}}>

            {this.props.user_spaces.map((userspace, i) => {
              return <Space key={counter++} fetchedSpace={userspace}/>
            })}
          </Paper>
        </div>
        <div className='two wide column'></div>
      </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user_spaces: state.userSpaces
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserSpaces }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGreenSpaces);
