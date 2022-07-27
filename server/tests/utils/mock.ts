import express from 'express';

export default () => {
  const req = { params: {}, query: {}, body: {} };

  const res: any = {};
  res.status = jest.fn();
  res.json = jest.fn();

  const next = jest.fn();
  return { req, res, next };
};
