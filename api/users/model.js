const Joi = require('joi');

const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const schema = {
  user: Joi.object().keys({
    username: Joi.string().alphanum().min(5).max(15).required(),
    password: Joi.string().regex(passwordRegex).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  }),
  login: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
};

const user = {
  validator (object) {
    const {error} = Joi.validate(object.body, schema[object.schema]);
    return error;
  }
};

module.exports = user;
module.exports.schema = schema;
