import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import { selectSpace } from '../actions/index';
import routeActions, { push } from 'react-router-redux';

//overrides material-ui default styling for grid title to make it centered in image
const styles = {
  imagetile: {
    'position': 'relative',
    'zIndex': -1
  },
  gridtitle: {
    'textAlign': 'center',
    'fontSize': '25px',
    'fontWeight': 'bold',
    'position': 'absolute',
    'top': '200%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'zIndex': 1
  }
};

class SpaceList extends Component {
  constructor(props) {
    super(props);
  }

  //renders the nine images below the jumbotron in the main view
  renderList() {
    return this.props.listOfSpaces.map(space => {
      return (
          <GridTile
            key={space.title}
            titleBackground='false'
            titlePosition='top'
            title={<span style={styles.gridtitle}>{space.title}</span>}
            className='grid-tile'
            onClick={() => this.props.selectSpace(space.title)}>
            <img style={ styles.imagetile } src={space.img} />
          </GridTile>
      );
    });
  }

  render() {
    return (
      <div>
        <div className='sixteen column row'>
          <div className='two wide column'></div>
          <h2 className='twelve wide column, space-heading'>
            Choose your space...
          </h2>
          <div className='two wide column'></div>
        </div>
        <div className='ui relaxed grid'>
          <div className='two wide column'></div>
          <div className='twelve wide column'>
            <GridList cols={3} cellHeight={200} className='grid-list' onClick={() => this.props.push('/inspirations')}>
                {this.renderList()}
            </GridList>
          </div>
          <div className='two wide column'></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listOfSpaces: state.listOfSpaces,
    selectedSpace: state.selectedSpace
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { selectSpace, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
