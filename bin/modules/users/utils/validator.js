const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const wrapper = require('../../../helpers/utils/wrapper');

const isValidRegisterUser = async (payload) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().trim().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).required(),
  }).label('User');
  const result = Joi.validate(payload, userSchema);
  if (result.error) {
    let message = result.error.details[0].message;
    return wrapper.error('Bad Request', message, 400);
  }
  return wrapper.data(true);
};

const isValidUpdateUser = async (payload) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().trim().email({ minDomainAtoms: 2 }).required()
  }).label('User');
  const result = Joi.validate(payload, userSchema);
  if (result.error) {
    let message = result.error.details[0].message;
    return wrapper.error('Bad Request', message, 400);
  }
  return wrapper.data(true);
};

const isValidDeleteUser = async (payload) => {
  const userSchema = Joi.object({
    userId: Joi.string().required()
  }).label('User');
  const result = Joi.validate(payload, userSchema);
  if (result.error) {
    let message = result.error.details[0].message;
    return wrapper.error('Bad Request', message, 400);
  }
  return wrapper.data(true);
};


module.exports = {
  isValidRegisterUser,
  isValidUpdateUser,
  isValidDeleteUser
};
