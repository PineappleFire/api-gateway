require('dotenv').config();
const {MongoClient} = require('mongodb');
const app = require('./app');

const port = process.env.PORT || 8080;

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDBName = process.env.MONGO_DB;

console.error("url: ", mongoURL);
MongoClient.connect(mongoURL, (err, client) => {
  if (err) {
    throw err;
  }
  app.locals.mongoDB = client.db(mongoDBName);

  // Start app
  app.listen(port, () => {
    console.log("== Server running on port:", port);
  });
});
