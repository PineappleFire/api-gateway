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
    const productsCollection = mongoDB.collection('products');

    const result = await productsCollection.insertOne(product);

    return result.insertedId;
  } catch (err) {
    return Promise.reject(buildError(err, 500));
  }
};

const getProducts = async (query, category, mongoDB) => {
  const error = validator({ body: category, schema: 'category' });
  if (error) {
    return Promise.reject(buildError(error, 403));
  }

  try {
    const numPerPage = parseInt(query.numPerPage) || 10;
    const requestedPage = parseInt(query.page) || 1;

    const productsCollection = mongoDB.collection('products');
    const count = await productsCollection.countDocuments({category: category});
    const lastPage = Math.max(Math.ceil(count / numPerPage), 1);
    const temp = requestedPage < 1 ? 1 : requestedPage;
    const page = temp > lastPage ? lastPage : temp;
    const offset = (page - 1) * numPerPage;
    const results = await productsCollection
      .find({category: category})
      .project({ _id: 0 })
      .limit(numPerPage)
      .skip(offset)
      .toArray();

    return {
      products: results,
      page: page,
      totalPages: lastPage,
      pageSize: numPerPage,
      totalCount: count
    };

  } catch (err) {
    return Promise.reject(buildError(err, 500));
  };
};

exports.insertNewProduct = insertNewProduct;
exports.getProducts = getProducts;
