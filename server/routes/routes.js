'use strict';

const express = require('express');
const auth = require('./../auth');
const plots = require('./plots');
const plants = require('./plants');
const users = require('./users');

const router = express.Router();

router.post('/login', (req, res) => {
  auth.login(req, res)
    .then((promise) => {
      res.set('token', promise.token);
      res.json(promise.data);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
  });
router.post('/signup', (req, res) => {
  auth.addUser(req, res)
    .then((promise) => {
      console.log('promise from /signup in routes: ', promise)
      res.set('token', promise.token);
      res.json(promise.data);
    })
    .catch((err) => {
      console.log('---| err in route /signup: ', err);
      res.status(400);
      res.send(err);
    });
  })
router.use('/plot', plots);
router.use('/plant', plants);
router.use('/user', users);


module.exports = router;
