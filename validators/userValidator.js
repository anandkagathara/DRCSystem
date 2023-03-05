const Joi = require("joi");

const registerUserValidator = (userData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    mobile_number: Joi.number().required(),
    isAdmin : Joi.boolean().optional()
  });

  const { error } = schema.validate(userData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

const loginuserValidator = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(userData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};


module.exports = {
  registerUserValidator,
  loginuserValidator,
};
