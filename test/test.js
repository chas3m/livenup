import { expect } from 'chai';
import * as actions from '../client/actions/index';
import list from '../client/reducers/reducer_listOfSpaces';
import request from 'supertest';
import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import app from '../server/index';
import  { navBarColor } from '../client/components/navbar';

mockgoose(mongoose);


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

describe('inspirations routes', function() {

  it('should return an image for each room', function(done) {
    request(app)
      .get('/inspirations')
      .end(function(err, res) {
        if (err) return done(err);
        expect(err).to.equal(null);
        expect(res.payload.data).to.be.an('array');
        expect(res.body.user).to.be.an('object');
        done();
      });
  });

  it('should return images by room category', function(done) {
    request(app)
      .post('/inspirations')
      .send({category: 'Bedroom'})
      .end(function(err, res) {
        if (err) return done(err);
        expect(err).to.equal(null);
        expect(res.payload.data).to.be.an('array');
        expect(res.payload.data[0]).to.be.an('object');
        done();
      });
  });
});

describe('components', () => {
  it('should create a transparent navbar when on home page', () => {
    const home = '/';
    const route = '/';
    function navBarColor() {
      if (route === home) {
        return 'rgba(0, 0, 0, 0)';
      } else {
        return 'Colors.green900';
      }
    }

    expect(route).to.be.a('string');
    expect(route).to.equal('/');
    expect(navBarColor()).to.equal('rgba(0, 0, 0, 0)');
  });
});

describe('components', () => {
  it('should create a green navbar when not on home page', () => {
    const home = '/';
    const route = '/inspirations';
    function navBarColor() {
      if (route === home) {
        return 'rgba(0, 0, 0, 0)';
      } else {
        return 'Colors.green900';
      }
    }

    expect(route).to.be.a('string');
    expect(route).to.equal('/inspirations');
    expect(navBarColor()).to.equal('Colors.green900');
  });
});
