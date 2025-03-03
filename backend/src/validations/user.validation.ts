import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string().required().min(5).max(30).messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 5 characters long',
      'string.max': 'Username cannot exceed 30 characters',
    }),
    password: Joi.string().required().min(6).messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Confirm password must match password",
      }),
    role: Joi.string().valid('user', 'admin').default('user').messages({
      'any.only': 'Role must be either "user" or "admin"',
    }),
  });

