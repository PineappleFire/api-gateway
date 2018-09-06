require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Resource not found default endpoint
app.use('*', (req, res, next) => {
  res.status(404).json({
    error: `Requested resource ${req.originalUrl} does not exist.`
  });
});

// App started
app.listen(port, () => {
  console.log("== Server running on port:", port);
});
