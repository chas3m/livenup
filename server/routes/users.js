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
    //console.log('req.app.ioMiddleware in users: ', req.app.ioMiddleware);
    // let _token = req.headers.token;
    // let _decodedEmail = jwt.decode(_token, secret.salt).email;
    let _decodedEmail = 'genevieve@email.com';

    socket(req.app.ioMiddleware, _decodedEmail);

  })

module.exports = router;
