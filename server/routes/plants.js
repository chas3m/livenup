'use strict';

const express = require('express');
const auth = require('./../auth');
const plant = require('../../database/plants')
const router = express.Router();

//queries the database for plant information sent from inspirations
router.route('/', auth.checkUser)
  .get((req, res) => {
    let _plants = req.query.plant;

    plant.find(_plants, function(data){
      res.send(data);
    })
  });


module.exports = router;
