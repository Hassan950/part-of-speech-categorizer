import { rankController } from '../../controllers';
import mock from '../utils/mock';
import { Request, Response } from 'express';

describe('RankController', () => {
  describe('getRank', () => {
    let req: any, res: any, next: any;
    beforeEach(() => {
      ({ req, res, next } = mock());
    });
    it('should return rank rounded to the nearest hundredth', async () => {
      req.body.score = 90;
      await rankController.getRank(req, res, next);
      expect(String(res.json.mock.calls[0][0].rank)).toBe('80');

      req.body.score = 60;
      await rankController.getRank(req, res, next);
      expect(String(res.json.mock.calls[1][0].rank)).toBe('56.67');

      req.body.score = 50;
      await rankController.getRank(req, res, next);
      expect(String(res.json.mock.calls[2][0].rank)).toBe('40');

      req.body.score = 30;
      await rankController.getRank(req, res, next);
      expect(String(res.json.mock.calls[3][0].rank)).toBe('26.67');
    });
  });
});
