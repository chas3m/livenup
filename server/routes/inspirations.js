'use strict';

const express = require('express');
const inspire = require('../../database/inspirations');
const router = express.Router();

//queries the database for inspirations by room category
router.route('/')
  .get((req, res) => {
    inspire.getRooms(function(data){
      res.send(data);
    })
  })
  .post((req, res) => {
    let _category = req.body.inspirations.category;
    inspire.getImages(_category, function(data){
      res.send(data);
    });
  })

module.exports = router;
