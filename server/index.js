const getEvents = require('./modules/calendar.js');
const express = require('express');
const path = require('path');
const app = express();
const api = express();

const port = 8888;
const apiPort = 9999;

app.use('/', express.static(path.join(__dirname, '../client/build')));

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.get('/calendar', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getEvents().then(events => res.send(JSON.stringify(events)))
});

app.listen(port);
api.listen(apiPort);