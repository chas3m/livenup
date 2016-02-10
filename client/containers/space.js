import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import LeftNav from 'material-ui/lib/left-nav';
import Colors from 'material-ui/lib/styles/colors';
import GridList from 'material-ui/lib/grid-list/grid-list';

import Login from './login';
import LogInOut from '../components/logInOut';
import Plant from '../components/plant';
import { updateUserSpace } from '../actions/creator_actions.js';

const iconStyles = {
  margin: '24px',
  float: 'right'
};

const buttonStyles = {
  float: 'right'
};

const whiteButtonStyles = {
  float: 'right',
  color: 'white'
};

class Space extends Component {
  constructor(props) {
    super(props);
    if(!this.props.fetchedSpace) {
      this.state = {
        expanded: false,
        editMode: true,
        image_url: this.props.selectedInspiration.image_url,
        space_name: this.props.selectedInspiration.category,
        category: this.props.selectedInspiration.category,
        light: 'medium',
        humidityLevel: 'medium',
        temperature: 'high',
        space_plants: [],
        inspiration_plants: this.props.selectedInspiration.plantsArray
      };
    }else {
      this.state = {
        expanded:false,
        editMode: false,
        id: this.props.fetchedSpace._id,
        image_url: this.props.fetchedSpace.space_image,
        space_name: this.props.fetchedSpace.space_name,
        category: this.props.fetchedSpace.category,
        light: this.props.fetchedSpace.light,
        humidity: this.props.fetchedSpace.humidity,
        temperature: this.props.fetchedSpace.temperature,
        space_plants: this.props.fetchedSpace.space_plants,
        inspiration_plants: this.props.fetchedSpace.inspiration_plants
      }

      this.renderPlants = this.renderPlants.bind(this);
      this.getHeaderButton = this.getHeaderButton.bind(this);
      this.displayEditMode = this.displayEditMode.bind(this);
      this.getSaveButton = this.getSaveButton.bind(this);
    }

  }

  renderPlants() {
    let counter = 100;
    const listItems = this.state.space_plants.map((plant) => {
      if(typeof plant === 'object') {
        plant.name = plant.name.charAt(0).toUpperCase() + plant.name.slice(1);
      }
      if(typeof plant === 'string') {

        plant = {name: plant.charAt(0).toUpperCase() + plant.slice(1), thumbnail: ''};
      }
      return  (<Plant key={counter++} plant={plant}/>);
    });
    return listItems;
  }


  displayEditMode() {
    console.log("this.props:", this.props);
    console.log("this.state", this.state);
    let counter = 0;
    return (this.state.inspiration_plants.map((plant) => {
      if(typeof plant === 'object') {
        plant.name = plant.name.charAt(0).toUpperCase() + plant.name.slice(1);
      }
      if(typeof plant === 'string') {

        plant = {name: plant.charAt(0).toUpperCase() + plant.slice(1), thumbnail: ''};
      }
      return (<ListItem key={counter++} leftAvatar={<Avatar src={plant.thumbnail} />} primaryText={plant.name} onTouchTap={() => {
        this.setState({space_plants: [plant, ...this.state.space_plants]});
      }}/>);
    }));
  }

  handleSave() {
    const space = {
      id: this.state.id,
      image_url: this.state.image_url,
      space_name: this.state.space_name,
      category: this.state.category,
      light: this.state.light,
      humidity: this.state.humidity,
      temperature: this.state.temperature,
      space_plants: this.state.space_plants,
      inspiration_plants: this.state.inspiration_plants
    };

    if(!this.props.selectedInspiration) {
      return this.props.updateUserSpace(space);
    }
    this.props.create(space);
  }

  //display edit or save button depending on current editMode state
  getSaveButton() {
    let saveBtn;
    if(!this.props.auth) {
      return (<div>
        <FlatButton style={buttonStyles} disabled={true} style={buttonStyles} primary={true} label="Save"  />
      </div>);
    }else {
      if(!this.props.selectedInspiration){
        saveBtn = <FlatButton style={{float: 'left'}} primary={true} label="Update" onTouchTap={() => {
            this.handleSave();
            this.setState({editMode: !this.state.editMode});
          }} />
        }else {
          saveBtn = <FlatButton style={{float: 'left'}} primary={true} label="Save" onTouchTap={() => {
              this.handleSave();
              this.setState({editMode: !this.state.editMode});
            }} />
          }
        }
        return saveBtn;
      }
      getHeaderButton() {
        return (
          <div style={{color: Colors.green50}}>
            <h4 style={{display: 'inline-block'}}>{this.state.space_name}</h4>
            <FlatButton style={whiteButtonStyles} label="Edit" onTouchTap={() => this.setState({editMode: !this.state.editMode})} />
          </div>

        );
      }

      render() {
        return (
          <div>
            <Card
              style={{border: '2px solid black', boxShadow: 'none'}}>
              <CardHeader
                style={{backgroundColor: Colors.green900, border: 'solid black', borderWidth: '0px 0px 2px 0px', color: 'white'}}
                children={this.getHeaderButton()}>
              </CardHeader>
              <CardText

                style={{margin: 'auto 0', display: 'flex'}}>
                <LeftNav
                  styles={{root : { backgroundColor: 'blue'}}}
                  openRight={true}
                  open={this.state.editMode}
                  openRight={true}
                  onRequestChange={() => this.setState({editMode: false})}>
                  <div style={{backgroundColor: Colors.green900, border: 'solid black', borderWidth: '0px 0px 2px 0px'}}>{this.props.auth ? this.getSaveButton() : <LogInOut /> }</div>
                  <TextField
                    floatingLabelText="Edit Space Name"
                    value={this.state.space_name}
                    onChange={(e) => {this.setState({space_name: e.target.value})}}/>
                  <List subheader="Add plants to your space">
                    {this.state.editMode ? this.displayEditMode(): null}
                  </List>
                </LeftNav>
                <Divider />
                <div
                  style={{flex: '1', width: '100%', height: '100%'}}>
                  <image
                    style={{width: '100%'}} src={this.state.image_url}/>
                </div>
                <div
                  style={{flex: '2', paddingLeft: '10px'}}>
                  <GridList
                    style={{width: '100%'}}
                    cols={3}
                    padding={10}
                    cellHeight={150}>
                    {this.renderPlants()}
                  </GridList>
                </div>
              </CardText>
            </Card>
            <div style={{marginBottom: '20px'}}></div>
          </div>);
        }
      }


      function mapDispatchToProps(dispatch) {
        return bindActionCreators({ updateUserSpace }, dispatch);
      }

      function mapStateToProps(state) {
        return {
          auth : state.isAuthorized.token || null
        };
      }


      export default connect(mapStateToProps, mapDispatchToProps)(Space);
