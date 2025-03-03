import Joi from "joi";

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
      'string.empty': 'Username is required',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
    }),
    remember: Joi.boolean().default(false).messages({
      'boolean.base': 'Remember must be a boolean',
    }),
  });
  
  export { loginSchema };