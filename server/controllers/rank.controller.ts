import { promises as fs } from 'fs';
import { Request, Response } from 'express';
import { catchAsync } from '../utils';

export const getRank = catchAsync(async (req: Request, res: Response) => {
  const data: Data = JSON.parse(await fs.readFile('./server/db/data.json', 'utf8'));
  const scores = data.scoresList;
  const score = req.body.score;

  const belowScoreCount = scores.reduce((acc, curr) => (curr < score ? acc + 1 : acc), 0);
  const rank = Number(((belowScoreCount / scores.length) * 100).toFixed(2));

  res.json({ rank });
});
