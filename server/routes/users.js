'use strict';

const express = require('express');
const auth  = require('./../auth');
const jwt = require('jwt-simple');
const secret = require('./../utilities');
const socket = require('./../sockets');
const router = express.Router();

//staged to connect to users hardware
router.route('/')
  .get((req, res) => {

    let _decodedEmail = 'genevieve@email.com';

    socket(req.app.ioMiddleware, _decodedEmail);

  })

module.exports = router;
