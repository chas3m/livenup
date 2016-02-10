import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import IconButton from 'material-ui/lib/icon-button';
import { fetchInspirations, selectInspiration } from '../actions/inspiration_actions';
import routeActions, { push } from 'react-router-redux';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '80%',
    overflowY: 'auto',
    marginBottom: 24,
    cursor: 'pointer'
  },
};

class Inspirations extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount() {
    if(!this.props.selectedSpace) { return console.error('Selected Space is NULL') };
    this.props.fetchInspirations(this.props.selectedSpace);
  }
   inspirationMaker (inspiration) {
    return (
      <GridTile
          key={inspiration.image_url}
          actionPosition="left"
          titlePosition="bottom"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={ 1 }
          rows={ 1 }
          onClick={() => {
            this.props.selectInspiration(inspiration);
            this.props.push('/spacecreator');
          } }
        >
          <image style={
            {
              width: '100%'
            }
          }
          src={ inspiration.image_url } />
        </GridTile>
      )
  }
  render() {
    return (
    <div>
      <div className='sixteen column row'>
        <div className='two wide column'></div>
        <h2 className='twelve wide column, space-heading'>
          ...find your inspiration...
        </h2>
        <div className='two wide column'></div>
      </div>
      <div style={ styles.root }>
        <GridList
          cols={3}
          cellHeight={500}
          padding={10}
          style={styles.gridList}
        >
        { this.props.inspirations.map((i) => {
          return this.inspirationMaker(i);
        })
      }
        </ GridList>
      </div>
      </div>

    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators( { fetchInspirations, selectInspiration, push }, dispatch )
}

function mapStateToProps (state) {
  return {
      inspirations: state.inspirations || [],
      selectedSpace: state.selectedSpace || null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspirations)
