import { mongoose } from 'mongoose';

const plantSchema = new mongoose.Schema( {
  name: {type: String},
  hardiness: {type: String},
  moistureUse: {type: String}
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = {
  find(name, callback) {
    Plant.find({name: name}, (err, result) => {
      if(err) throw err;
      callback(result);
    });
  },
  add(name, hardiness, moistureUse, callback) {
    Plant.save({name: name, hardiness: hardiness, moistureUse: moistureUse}, (err) => {
      if(err) throw err;
      callback({
        message: "Successfully added plant"
      });
    });
  },
  update(id, properties, callback) {
    Plant.findById(id, (err, result) => {
      if(err) throw err;
      if(!result) {
        callback({message: "Plant with " + id + " not found"});
      }
      result.name = properties[0] || result.name;
      result.hardiness = properties[1] || result.hardiness;
      result.moistureUse = properties[2] || result.moistureUse;

      result.save((err) => {
        if(err) throw err;
        callback({
          message: "Successfully updated the plant",
          data: result
        });
      });
    });
  },
  remove(id, callback) {
    Plant.findOneAndRemove({_id: id}, (err, result) => {
      if(err) throw err;
      callback({
        message: "Successfully deleted plant",
        data: result
      });
    });
  }
}
