import { expect } from 'chai';
import * as actions from '../client/actions/index';
import list from '../client/reducers/reducer_listOfSpaces';

describe('actions', () => {
  it('should create an action to select a space', () => {
    const spaceName = 'Bedroom';
    const expectedAction = {
      type: actions.SELECT_SPACE,
      payload: spaceName
    };
    expect(actions.selectSpace(spaceName)).to.deep.equal(expectedAction);
  });
});

describe('reducers', () => {
  it('should have a list of spaces reducer that returns an array with a length of 9', () => {
    const listOfSpaces = list();
    expect(listOfSpaces).to.be.a('array');
    expect(listOfSpaces).to.have.length(9);
  });
});
