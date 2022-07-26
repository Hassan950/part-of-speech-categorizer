import express, { Express, Request, Response } from 'express';
import rankRoutes from './rank.route';
import wordsRoutes from './words.route';

const router = express.Router();

router.use('/rank', rankRoutes);
router.use('/words', wordsRoutes);

export default router;
