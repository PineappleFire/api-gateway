require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mountRoutes = require('./api');

const app = express();

const port = process.env.PORT || 8080;

// General setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mountRoutes(app);

// App started
app.listen(port, () => {
  console.log("== Server running on port:", port);
});
