const express = require('express');
const bodyParser = require('body-parser');
const mountRoutes = require('./api');

const app = express();

// General setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mountRoutes(app);

module.exports = app;
