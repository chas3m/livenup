'use strict';

const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema( {
  space_name: {type: String},
  space_useremail: {type: String},
  space_image: {type: String},
  category: {type: String},
  light: {type: String},
  humidity: {type: String},
  tempurature: {type: String},
  space_plants: {type: Array},
  inspiration_plants: {type: Array},
});

const Space = mongoose.model('user_spaces', spaceSchema);

module.exports = {
  find (user, callback) {
    Space.find({space_useremail: user}, (err, result) => {
      if(err) console.error(err);
      callback(result);
    });
  },

  add (properties, callback) {
    let space = new Space({
      space_name: properties[0],
      space_useremail: properties[1],
      space_image: properties[2],
      category: properties[3],
      light: properties[4],
      humidity: properties[5],
      temperature: properties[6],
      space_plants: properties[7],
      inspiration_plants: properties[8]
    });

    space.save((err, result) => {
      if(err) throw err;
      callback({
        message: "Successfully added space",
        data: result
      });
    });
  },

  update (id, properties, callback) {
    Space.findById(id, (err, result) => {
      if(err) console.error(err);
      if(!result) {
        callback({message: "Space with " + id + " not found"});
      }
      result.space_name = properties[0] || result.space_name;
      result.space_useremail = properties[1] || result.space_useremail;
      result.space_image = properties[2] || result.space_image;
      result.category = properties[3] || result.category;
      result.light = properties[4] || result.light;
      result.humidity = properties[5] || result.humidity;
      result.temperature = properties[6] || result.temperature;
      result.space_plants = properties[7] || result.space_plants;
      result.inspiration_plants = properties[8] || result.inspiration_plants;

      result.save((err) => {
        if(err) console.error(err);
        callback({
          message: "Successfully updated the space",
          data: result
        });
      });
    });
  },

  remove (id, email, callback) {
    Space.findOneAndRemove({_id: id}, (err) => {
      if(err) console.error(err);
    });
    this.find(email, function(result){
      callback({
        message: "Successfully deleted space",
        data: result
      });
    })
  }
};
