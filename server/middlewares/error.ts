import * as httpStatus from 'http-status';
import express from 'express';

export const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || httpStatus[statusCode];

  res.locals.errorMessage = err.message;

  const response = {
    status: statusCode,
    message,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
    }),
  };

  res.status(statusCode).json(response);
};
