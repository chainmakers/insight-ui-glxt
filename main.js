const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

let app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json({ limit: '1mb' })); // support json encoded bodies
app.use(bodyParser.urlencoded({
  limit: '1mb',
  extended: true,
})); // support encoded bodies

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(compression({
  level: 9,
  threshold: 0,
}));

app.use('/', express.static(path.join(__dirname, 'public')));

let server;

server = require('http')
          .createServer(app)
          .listen(9992, 'localhost');
