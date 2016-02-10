'use strict';

const express = require('express');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const testFunc = require('./sockets');


mongoose.connect('mongodb://chuck:1qaz2wsx3edc4rfv@ds051595.mongolab.com:51595/heroku_d6g9mbk4');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

app.use((req, res, next) => {
  res.header('Access-Controll-Allow-Origin', '*');
  res.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Controll-Expose-Headers', 'token');

  next();
});


app.use(express.static(__dirname + '/../client/'));
app.use('/', routes);

server.listen(PORT, () => console.log('listening on port ', PORT))

app.ioMiddleware = require('socket.io')(server);

//testing github commit
