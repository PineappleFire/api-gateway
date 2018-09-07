const Joi = require('joi');

const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(5).max(15).required(),
  password: Joi.string().regex(passwordRegex).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required()
});

const user = {
  validate (object) {
    const {error} = Joi.validate(object, schema);
    return error;
  }
};

module.exports = user;
module.exports.schema = schema;
