import express, { Express, Request, Response } from 'express';
import { rankController } from '../controllers';
import { rankValidations } from '../validations';
import { validate } from '../middlewares';

const router = express.Router();

router.route('/').post(validate(rankValidations.getRank), rankController.getRank);

export default router;
