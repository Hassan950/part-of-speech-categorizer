import { wordsController } from '../../controllers';
import resMock from '../utils/res.mock';
import { Request, Response } from 'express';

describe('WordsController', () => {
  describe('getWords', () => {
    let req: any, res: any;
    beforeEach(() => {
      req = { params: {}, query: {}, body: {} };
      res = resMock();
    });
    it('should return an array of words of size 10 with at least one adverb, noun, verb, adjective', async () => {
      await wordsController.getWords(req, res);
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].length).toBe(10);
      ['adverb', 'noun', 'verb', 'adjective'].forEach((type) => {
        expect(
          res.json.mock.calls[0][0].filter((w: Word) => w.pos === type).length
        ).toBeGreaterThan(0);
      });
    });
  });
});
