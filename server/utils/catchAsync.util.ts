import express from 'express';

type CatchAsyncFn = (fn: express.RequestHandler) => express.RequestHandler;

export const catchAsync: CatchAsyncFn = (fn: Function) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
