import { expect } from 'chai';
import * as actions from '../client/actions/index';
import request from 'supertest';
import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import app from '../server/index';

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
