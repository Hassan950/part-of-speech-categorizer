import { promises as fs } from 'fs';
import { Request, Response } from 'express';
import { catchAsync } from '../utils';

const WORDS_COUNT = 10;

export const getWords = catchAsync(async (req: Request, res: Response) => {
  const data: Data = JSON.parse(await fs.readFile('./server/db/data.json', 'utf8'));
  const words = data.wordList;
  const selectedWords: Word[] = [];
  ['adverb', 'noun', 'verb', 'adjective'].forEach((type) => {
    const filtered = words.filter((w) => w.pos === type);
    const index = Math.floor(Math.random() * filtered.length);
    selectedWords.push(filtered[index]);
  });

  const unselectedWords = words.filter((w) => !selectedWords.includes(w));
  [...Array(WORDS_COUNT - 4)].forEach(() => {
    const index = Math.floor(Math.random() * unselectedWords.length);
    selectedWords.push(unselectedWords[index]);
    unselectedWords.splice(index, 1);
  });

  res.json(selectedWords);
});
