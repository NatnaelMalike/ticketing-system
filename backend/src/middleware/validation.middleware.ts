import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi, { ObjectSchema } from "joi";

const validate =
  (schema: ObjectSchema): RequestHandler =>
  (req, res, next): void | Promise<void> => {
    const { error } = Joi.compile(schema).validate(req.body);
    if (error) {
        const errors = error.details.map((detail) => ({
            key: detail.context?.key,
            message: `${
              detail.type === "any.required"
                ? detail.context?.key + " is required"
                : detail.message.replace(/["']/g, "")
            }`,
          }));
          res.status(400).json({ ...errors[0] });
          return;
    }
    next();
  };

export default validate;
