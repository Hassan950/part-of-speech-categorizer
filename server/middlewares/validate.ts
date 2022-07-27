import * as Joi from 'joi';
import * as httpStatus from 'http-status';
import { pick } from 'lodash';
import express from 'express';

type ValidationFn = (schema: Joi.SchemaLike) => express.RequestHandler;

export const validate: ValidationFn = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: {
        label: 'key',
      },
    })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next({ statusCode: httpStatus.BAD_REQUEST, message: errorMessage });
  }
  Object.assign(req, value);
  return next();
};
