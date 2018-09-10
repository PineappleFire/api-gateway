const {pick} = require('underscore');
const {validator} = require('./model');
const {buildError} = require('./../../lib/utils');

const insertNewProduct = async productObject => {
  const {body: product, schema, mongoDB} = productObject;

  const error = validator(pick(productObject, ['body', 'schema']));
  if (error) {
    return Promise.reject(buildError(error, 403));
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
