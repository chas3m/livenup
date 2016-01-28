import { express } from 'express';
import { auth } from './../auth';
import { plot } from '../../database/plots';

const router = express.Router();

router.route('/', auth.checkUser)
  .get((req, res) => {
    console.log('ln 9: in route/plots GET');
    const user = req.body.user;

    plot.find(user, function(data){
      res.send(data);
    });
  })
  .post((req, res) => {
    console.log('ln 17: in route/plots POST');
    const plot = req.body.plot.name;
    const length = req.body.plot.length;
    const width = req.body.plot.width;
    const plants = req.body.plot.plants;
    const user = req.body.user.email;

    plot.add(name, length, width, plants, user, function(data){
      res.send(data);
    });
  })
  .put((req, res) => {
    console.log('ln 28: in route/plots PUT');
    const plot = req.body.plot.name;
    const length = req.body.plot.length;
    const width = req.body.plot.width;
    const plants = req.body.plot.plants;
    const user = req.body.user;

    plot.update(id, [plot, length, width, plants, user], function(data) {
      res.send(data);
    });
  })
  .delete((req, res) => {
    console.log('ln 39: in route/plots DELETE');
    const id = req.body.plot._id;

    plot.remove(id, function(data) {
      res.send(data);
    });
  });

router.route('/plant', auth.checkUser)
  .get((req, res) => {
    const plant = req.body.plant;
    //calls database function to return info on plant;
    console.log('in route /plots/plants GET');
  })
  .post((req, res) => {
    const plant = req.body.plant;
    //calls a database function to save a plant
    console.log('in route /plots/plants POST');
  })
  .put((req, res) => {
    const plant = req.body.plant;
    //calls a database function to edit a plant
    console.log('in route /plots/plants PUT');
  })
  .delete((req, res) => {
    console.log('in route /plots/plants DELETE');

    const id = req.body.plot._id;
    plot.remove(id, function(data) {
      res.send(data);
    });
  });

module.exports = router;
