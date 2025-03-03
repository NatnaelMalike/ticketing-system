import Joi from "joi";

export const createTicketSchema = Joi.object({
  title: Joi.string().required().min(5).max(100).messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title cannot exceed 100 characters",
  }),
  description: Joi.string().required().min(10).max(500).messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters",
  }),
});

export const updateTicketSchema = Joi.object({
  status: Joi.string()
    .valid("Open", "In Progress", "Closed")
    .required()
    .messages({
      "string.empty": "Status is required",
      "any.only": 'Status must be one of "Open", "In Progress", or "Closed"',
    }),
});
