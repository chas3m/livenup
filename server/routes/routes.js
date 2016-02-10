'use strict';

const express = require('express');
const auth = require('./../auth');
const spaces = require('./spaces');
const plants = require('./plants');
const users = require('./users');
const inspire = require('./inspirations')

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
      res.set('token', promise.token);
      res.json(promise.data);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
  })

router.use('/space', spaces);
router.use('/plant', plants);
router.use('/user', users);
router.use('/inspirations', inspire);

module.exports = router;
