import express, { Express, Request, Response } from 'express';

const router = express.Router();

router.route('/').get((req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

export default router;
