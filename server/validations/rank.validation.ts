import * as Joi from 'joi';

export const getRank = {
  body: Joi.object().keys({
    score: Joi.number().min(0).required(),
  }),
};
