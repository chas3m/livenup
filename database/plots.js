const plotSchema = new mongoose.Schema( {
  name: {type: String},
  length: {type: Number},
  width: {type: Number},
  user: {type: String}
});

const Plot = mongoose.model('Plot', plotSchema);

module.exports = {
  find(user, callback) {
    Plot.find({user: user}, (err, result) => {
      if(err) throw err;
      callback(result);
    });
  },
  add(user, name, length, width, callback) {
    Plot.save({user: user, name: name, length: length, width: width}, (err) => {
      if(err) throw err;
      callback({
        message: "Successfully added plot"
      });
    });
  },
  update(id, properties, callback) {
    Plot.findById(id, (err, result) => {
      if(err) throw err;
      if(!result) {
        callback({message: "Plot with " + id + " not found"});
      }
      result.name = properties[0] || result.name;
      result.length = properties[1] || result.length;
      result.width = properties[2] || result.width;
      result.user = properties[3] || result.user;

      result.save((err) => {
        if(err) throw err;
        callback({
          message: "Successfully updated the plot",
          data: result
        });
      });
    });
  },
  remove(id, callback) {
    Plot.findOneAndRemove({_id: id}, (err, result) => {
      if(err) throw err;
      callback({
        message: "Successfully deleted plot",
        data: result
      });
    });
  }
}
