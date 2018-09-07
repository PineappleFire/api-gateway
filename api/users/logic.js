const bcrypt = require('bcrypt');
const {validate} = require('./model');
const {buildError} = require('./../../lib/utils');

module.exports = {
  async insertNewUser (user, mongoDB) {

    const error = validate(user);
    if (error) {
      throw buildError(error, 403);
    }

    try {
      const passwordHash = await bcrypt.hash(user.password, 8);
      user.password = passwordHash;

      const userCollection = mongoDB.collection('users');
      const result = await userCollection.insertOne(user);

      return result.insertId;
    } catch (err) {
      return err;
    };
  }
}
