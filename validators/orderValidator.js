const Joi = require('joi');

const createOrderValidator = (orderData) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    order_code: Joi.string().required(),
    order_date: Joi.date().required(),
    required_date: Joi.date().required(),
    shipped_date: Joi.date(),
    order_status: Joi.string().valid('Pending', 'Shipped', 'Delivered').required(),
  });

  const { error } = schema.validate(orderData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

module.exports = createOrderValidator;
