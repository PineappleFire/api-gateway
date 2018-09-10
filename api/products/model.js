const Joi = require('joi');

const schema = {
  product: Joi.object().keys({
    name: Joi.string().required(),
    data: Joi.string().required()
  })
};

const product = {
  validator (object) {
    const {error} = Joi.validate(object.body, schema[object.schema]);
    return error;
  }
};

module.exports = product;
module.exports.schema = schema;
