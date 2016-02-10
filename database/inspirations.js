'use strict'
const mongoose = require('mongoose');

const inspireRoomsSchema = new mongoose.Schema( {
  name: {type: String},
  light: {type: String},
  humidity: {type: String},
  temperature: {type: String}
});

const Rooms = mongoose.model('spaces', inspireRoomsSchema)

const inspireImagesSchema = new mongoose.Schema( {
  inspiration_name: {type: String},
  category: {type: String},
  image_url: {type: String},
  plantsArray: {type: Array}
});

const Images = mongoose.model('space_inspirations', inspireImagesSchema)

module.exports = {
  getRooms (callback) {
    Rooms.find({}, (err, result) => {
      if(err) console.error(err);
      callback(result);
    });
  },

  getImages (category, callback) {
    Images.find({category: category}, (err, result) => {
      if(err) console.error(err);
      callback(result);
    });
  }
};
