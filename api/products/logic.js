const {pick} = require('underscore');
const {validator} = require('./model');
const {buildError} = require('./../../lib/utils');

const validate = (object, statusCode) => {
  const error = validator(pick(object, ['body', 'schema']));
  return error ? buildError(error, statusCode) : null;
};

const insertNewProduct = async productObject => {
  const {body: product, schema, mongoDB} = productObject;

  const error = validate(productObject, 403);
  if (error) {
    return Promise.reject(error);
  }

  try {
    const productCollection = mongoDB.collection('products');

    const result = await productCollection.insertOne(product);

    return result.insertedId;
  } catch (err) {
    return Promise.reject(buildError(err, 500));
  }
};

exports.insertNewProduct = insertNewProduct;
