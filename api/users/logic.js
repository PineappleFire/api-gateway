const bcrypt = require('bcrypt');
const {pick} = require('underscore');
const {generateAuthToken} = require('./../../lib/auth');
const {validator} = require('./model');
const {buildError} = require('./../../lib/utils');

const validate = (object, statusCode) => {
  const error = validator(pick(object, ['body', 'schema']));
  return error ? buildError(error, statusCode) : null;
};

const insertNewUser = async (userObject) => {
  const {body: user, schema, mongoDB} = userObject;

  const error = validate(userObject, 403);
  if (error) {
    return Promise.reject(error);
  }

  try {
    const passwordHash = await bcrypt.hash(user.password, 8);
    user.password = passwordHash;

    const userCollection = mongoDB.collection('users');
    const result = await userCollection.insertOne(user);

    return result.insertId;
  } catch (err) {
    return Promise.reject(buildError(err, 500));
  };
};

const login = async (loginObject) => {
  const {body: {username, password}, schema, mongoDB} = userObject;

  const error = validate(userObject, 403);
  if (error) {
    return Promise.reject(error);
  }

  try {
    const userCollection = mongoDB.collection('user');
    const results = await userCollection.find({username: username}).toArray();
    const user = results[0];

    if (user) {
      const authorize = await bcrypt.compare(password, user.password);
      if (authorize) {
        return await generateAuthToken(user._id);
      } else {
        return Promise.reject(buildError('Invalid credentials', 401));
      }
    } else {
      return Promise.reject(buildError('Invalid credentials', 401));
    }

  } catch (err) {
    return Promise.reject(buildError(err, 500));
  }
};

exports.insertNewUser = insertNewUser;
exports.login = login;
