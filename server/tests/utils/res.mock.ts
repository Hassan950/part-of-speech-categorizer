import express from 'express';

export default () => {
  const res: any = {};
  res.status = jest.fn();
  res.json = jest.fn();
  return res as express.Response;
};
