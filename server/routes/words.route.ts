import express, { Express, Request, Response } from 'express';
import { wordsController } from '../controllers';

const router = express.Router();

router.route('/').get(wordsController.getWords);

export default router;
