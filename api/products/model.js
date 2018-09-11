const Joi = require('joi');

const productTypes = [
  'icons'
];

const schema = {
  product: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().valid(productTypes).required(),
    data: Joi.string().required(),
    ownerId: Joi.string().required()
  }),
  category: Joi.string().valid(productTypes).required()
};

const product = {
  validator (object) {
    const {error} = Joi.validate(object.body, schema[object.schema]);
    return error;
  }
};

module.exports = product;
module.exports.schema = schema;
